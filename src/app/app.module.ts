import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './components/common/header/header.component';
import { OverviewTableComponent } from './components/tables/overview-table/overview-table.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTabsModule} from "@angular/material/tabs";
import { DappTableComponent } from './components/tables/dapp-table/dapp-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { DefiTemplateComponent } from './components/form-templates/defi-template/defi-template.component';

import {RouterModule, Routes} from "@angular/router";
import { StartAuditFormComponent } from './components/form-templates/start-audit-form/start-audit-form.component';
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { FooterComponent } from './components/common/footer/footer.component';
import { MethodologyComponent } from './components/common/methodology/methodology.component';
import { ProjectViewComponent } from './components/project/project-view/project-view.component';
import { HttpClientModule } from '@angular/common/http';
import { AuditorTableComponent } from './components/tables/auditor-table/auditor-table.component';
import { ReportViewComponent } from './components/report/report-view/report-view.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const routes: Routes = [
  {path: 'overview', component: OverviewTableComponent},
  {path: '', component: OverviewTableComponent},
  {path: 'methodology', component: MethodologyComponent},
  {path: 'defi-template', component: DefiTemplateComponent},
  {path: 'start-audit', component: StartAuditFormComponent},
  {path: 'projects/:id', component: ProjectViewComponent},
  {path: 'report/:id', component: ReportViewComponent},
  {path: 'auditors', component: AuditorTableComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverviewTableComponent,
    DappTableComponent,
    DefiTemplateComponent,
    StartAuditFormComponent,
    FooterComponent,
    MethodologyComponent,
    ProjectViewComponent,
    AuditorTableComponent,
    ReportViewComponent,
  ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        HttpClientModule,
        MatToolbarModule,
        FormsModule,
        MatAutocompleteModule,
        MatSnackBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
