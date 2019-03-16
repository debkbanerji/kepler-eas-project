import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";

declare let particlesJS: any;
declare let d3: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    isDarkTheme: boolean = false;
    showParticles: boolean = false;

    constructor(public dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        const component = this;
        component.route.queryParams.subscribe(params => {
            component.isDarkTheme = (params['dark-mode'] == 'true');
        });
        this.initializePlot();
    }

    onDarkModeChange() {
        this.router.navigate(['/'], {queryParams: {'dark-mode': this.isDarkTheme}});
    }

    toggleParticles() {
        // Used to get around Angular not finding property pJSDom on type of window
        const tempWindow: any = window;
        if (this.showParticles) {
            tempWindow.pJSDom = [];
            particlesJS.load('particles-js-target', 'assets/json/particles-js-config.json', function () {
            });
        } else {
            tempWindow.pJSDom[0].pJS.fn.vendors.destroypJS()
        }
    }

    initializePlot() {
        const margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // setup x
        const xValue = function (d) {
                return d.Calories;
            }, // data -> value
            xScale = d3.scaleLinear().range([0, width]), // value -> display
            xMap = function (d) {
                return xScale(xValue(d));
            }, // data -> display
            xAxis = d3.axisBottom()
                .scale(xScale);
        // setup y
        const yValue = function (d) {
                return d["Orbital Period"];
            }, // data -> value
            yScale = d3.scaleLinear().range([height, 0]), // value -> display
            yMap = function (d) {
                return yScale(yValue(d));
            }, // data -> display
            yAxis = d3.axisLeft()
                .scale(yScale);

        // setup fill color
        const cValue = function (d) {
                return d.Manufacturer;
            },
            color = d3.scaleOrdinal(d3.schemeCategory10);

        // add the graph canvas to the body of the webpage
        const svg = d3.select("#d3-target").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("Radius of Orbit");

        // y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Orbital Period");

        // draw legend
        const legend = svg.selectAll(".legend")
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            });

        // draw legend colored rectangles
        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        // draw legend text
        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) {
                return d;
            })
    }

}
