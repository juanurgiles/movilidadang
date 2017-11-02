import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonModule, CheckboxModule, MessagesModule, InputTextModule, DataTableModule,
  DialogModule, PanelModule, DropdownModule, RadioButtonModule, CalendarModule, SpinnerModule, GrowlModule,
  PickListModule, FileUploadModule, FieldsetModule, ConfirmDialogModule, ConfirmationService, ToggleButtonModule,
  TabViewModule, InputSwitchModule, ListboxModule
} from 'primeng/primeng';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';

import { TramitesComponent } from './view/formularioComponent';
import { GanttComponent } from "../gantt.component";
import { LinkService } from "./service/link.service";
import { TaskService } from "./service/task.service";

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
    TabViewModule,
    InputSwitchModule,
    ListboxModule

  ],
  declarations: [
    TramitesComponent,
    GanttComponent
  ],
  providers: [
    ConfirmationService,
    DatePipe
  ],
  exports: [

  ]
})
export class FormularioModule { }
