import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule, MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireModule} from '@angular/fire';

import 'hammerjs';
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'} // Default route
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatTableModule,
        MatTooltipModule,
        RouterModule.forRoot(routes),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
