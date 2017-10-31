import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, MenuItem, Message, ConfirmationService, PanelModule } from 'primeng/primeng';
import { SessionStorageService } from 'ngx-webstorage';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Movilidad, Desplazamiento, Link, Task } from '../model/models';

declare var jQuery: any;
declare var $: any;
import { MY_FORM_MODEL } from '../model/formulario.model';
import { DynamicFormControlModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { GanttComponent } from '../../gantt.component';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: './formularioComponent.html'
})
export class TramitesComponent implements OnInit {
    movilidad: Movilidad;
    origenes: SelectItem[];
    medios: SelectItem[];
    viajacomo: SelectItem[];
    estacionaen: SelectItem[];
    timeinicio = new Date(2005, 1, 4, 5, 0);
    timefin = new Date(2005, 1, 4, 23, 60);
    datasource: any;
    @ViewChild('gantt') ganttContainer: GanttComponent;

    constructor(private fb: FormBuilder, private aroute: ActivatedRoute, private router: Router,
        private confirmationService: ConfirmationService, private storage: SessionStorageService,
        private formService: DynamicFormService, private datePipe: DatePipe) {
        console.log('test');
        this.movilidad = {} as Movilidad;
        this.movilidad.desplazamientos1 = [];
        this.medios = [];
        this.viajacomo = [];
        this.estacionaen = [];
        for (let index = 1; index <= 3; index++) {
            const desplazamiento = {} as Desplazamiento;
            desplazamiento.movimiento = index;
            desplazamiento.id = index;

            desplazamiento.inicio = new Date(2005, 1, 4, 5, 0);
            desplazamiento.fin = new Date(2005, 1, 4, 5, 5);
            desplazamiento.start_date = this.datePipe.transform(new Date(2005, 1, 4, 5, 0), 'dd-MM-yy');
            //            desplazamiento.medio;
            // desplazamiento.origen= "";
            desplazamiento.duration = 5;
            this.movilidad.desplazamientos1 = [... this.movilidad.desplazamientos1, desplazamiento];

        }
        console.log(this.movilidad.desplazamientos1);
        this.origenes = [];

        this.origenes.push({ label: 'Selecciona un origen', value: null });
        this.origenes.push({ label: 'Residencia', value: 'Residencia' });
        this.origenes.push({ label: 'Campus Central', value: 'Campus Central' });
        this.origenes.push({ label: 'Campus Yanuncay', value: 'Campus Yanuncay' });
        this.origenes.push({ label: 'Campus Paraiso', value: 'Campus Paraiso' });
        this.origenes.push({ label: 'Campus Centro Historico', value: 'Campus Centro Historico' });
        this.origenes.push({ label: 'Campus Balsay', value: 'Campus Balsay' });
        this.origenes.push({ label: 'Parada de bus', value: 'Parada de bus' });
        this.origenes.push({ label: 'Otro', value: 'Otro' });

        this.medios.push({ label: 'Seleccione un medio de transporte', value: null });

        this.medios.push({ label: 'A pie', value: 'A pie' });
        this.medios.push({ label: 'Vehículo privado', value: 'Vehículo privado' });
        this.medios.push({ label: 'Bus', value: 'Bus' });
        this.medios.push({ label: 'Taxi', value: 'Taxi' });
        this.medios.push({ label: 'Bicicleta', value: 'Bicicleta' });
        this.medios.push({ label: 'Motocicleta', value: 'Motocicleta' });
        this.medios.push({ label: 'Otro', value: 'Otro' });


        this.viajacomo.push({ label: 'Pasajero', value: 'Pasajero' });
        this.viajacomo.push({ label: 'Conductor', value: 'Conductor' });

        this.estacionaen.push({ label: 'Parqueaderos de la Universidad', value: 'Parqueaderos de la Universidad' });
        this.estacionaen.push({ label: 'Alrededores de la Universidad', value: 'Alrededores de la Universidad' });


    }
    formModel: DynamicFormControlModel[] = MY_FORM_MODEL;
    formGroup: FormGroup;
    nuevo() {
        const desplazamiento = {} as Desplazamiento;
        desplazamiento.movimiento = this.movilidad.desplazamientos1.length + 1;
        // desplazamiento.origen= "";
        this.movilidad.desplazamientos1 = [... this.movilidad.desplazamientos1, desplazamiento];
    }
    prueba() {
        console.log(this.movilidad.desplazamientos1);
    }
    ngOnInit() {
        this.formGroup = this.formService.createFormGroup(this.formModel);
        const tasks = [
            { id: 1, text: 'Lunes', start_date: '2017-11-28 06:15', duration: 15, progress: 0.6, prueba: 'test' },
            { id: 2, text: 'Lunes', start_date: '2017-11-28 07:20', duration: 30, progress: 0.4 },
            { id: 3, text: 'Lunes', start_date: '2017-11-28 06:35', duration: 50, progress: 0.6 },
            { id: 4, text: 'Lunes', start_date: '2017-11-28 08:25', duration: 10, progress: 0.4 },
            { id: 5, text: 'Martes', start_date: '2017-11-28 09:15', duration: 20, progress: 0.6 },
            { id: 6, text: 'Martes', start_date: '2017-11-28 16:10', duration: 600, progress: 0.4 },
            { id: 7, text: 'Martes', start_date: '2017-11-28 18:20', duration: 300, progress: 0.6 },
            { id: 8, text: 'Martes', start_date: '2017-11-28 20:30', duration: 600, progress: 0.4 },
        ];
        let links = [
			//{ id: 1, source: 1, target: 2, type: "0" }
		];
        //this.ganttContainer.cargar(tasks, links);
        //this.ganttContainer.
    }



}
