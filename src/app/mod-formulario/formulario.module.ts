import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonModule, CheckboxModule, MessagesModule, InputTextModule, DataTableModule,
  DialogModule, PanelModule, DropdownModule, RadioButtonModule, CalendarModule, SpinnerModule, GrowlModule,
  PickListModule, FileUploadModule, FieldsetModule, ConfirmDialogModule, ConfirmationService, ToggleButtonModule,
  TabViewModule
} from 'primeng/primeng';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';

import { TramitesComponent } from './view/formularioComponent';

const routes: Routes = [
  {
    path: '',
    component: TramitesComponent
  }
];

@NgModule({
  imports: [
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsPrimeNGUIModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    MessagesModule,
    InputTextModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    CalendarModule,
    SpinnerModule,
    GrowlModule,
    PickListModule,
    FileUploadModule,
    FieldsetModule,
    PanelModule,
    ToggleButtonModule,
    ConfirmDialogModule,
    TabViewModule
  ],
  declarations: [
    TramitesComponent,
  ],
  providers: [
    ConfirmationService,
  ],
  exports: [

  ]
})
export class FormularioModule { }
