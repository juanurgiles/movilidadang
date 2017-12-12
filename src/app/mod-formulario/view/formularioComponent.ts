import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { LinkService } from '../service/link.service';
import { TaskService } from '../service/task.service';
import { OverlayPanel } from 'primeng/components/overlaypanel/overlaypanel';

@Component({
    templateUrl: './formularioComponent.html',
    styleUrls: ['./formularioComponent.css']
})
export class TramitesComponent implements OnInit {
    movilidad: Movilidad;
    origenes: SelectItem[];
    lmedios:any;
    medios: SelectItem[];
    viajacomo: SelectItem[];
    estacionaen: SelectItem[];
    buspreferido: SelectItem[];
    vehiculopreferido: SelectItem[];
    piepreferido: SelectItem[];
    bicicletapreferido: SelectItem[];
    motocicletapreferido: SelectItem[];
    timeinicio = new Date(2005, 1, 4, 5, 0);
    timefin = new Date(2005, 1, 4, 23, 60);
    datasource: any;
    motivospie: any[];
    movivosbicicleta: any[];
    princalternativapie: any[];
    sdesplazamientos: any[];
    ddesplazamientos: any[];
    desplazamientodrag: any;
    desplazamientosel: Desplazamiento;
    indexDesplazamientosel;
    val: number;
<<<<<<< HEAD
    minutos: number = 5;
=======
    minutos = 5;
    index;
>>>>>>> 32c894821419a7a43b0c140620d16e4a39daa1aa
    @ViewChild('gantt_here') ganttContainer: ElementRef;

    constructor(private fb: FormBuilder, private aroute: ActivatedRoute, private router: Router,
        private confirmationService: ConfirmationService, private storage: SessionStorageService,
        private formService: DynamicFormService, private datePipe: DatePipe,
        private taskService: TaskService, private linkService: LinkService
    ) {
        console.log('test');
        this.movilidad = {} as Movilidad;
        this.movilidad.desplazamientos1 = [];
        this.medios = [];
        this.viajacomo = [];
        this.estacionaen = [];
        this.motivospie = [];

        this.motivospie.push({ nombre: 'Menor tiempo de viaje' });
        this.motivospie.push({ nombre: 'Razones Ambientales y/o salud' });
        this.motivospie.push({ nombre: 'Ahorrar dinero' });
        this.motivospie.push({ nombre: 'No debo preocuparme por un lugar para estacionar' });
        this.motivospie.push({ nombre: 'Seguridad' });
        this.motivospie.push({ nombre: 'Buena infraestructura para caminar en mi ruta' });
        this.motivospie.push({ nombre: 'Desconocimiento sobre el servicio de transporte público o servicio público deficiente' });
        this.motivospie.push({ nombre: 'No tengo otra alternativa' });
        this.motivospie.push({ nombre: 'Confort: oportunidad para socializar, disfrutar el paisaje, etc.' });
        this.motivospie.push({ nombre: 'Otra razón' });

        this.princalternativapie = [];
        this.princalternativapie.push({ nombre: 'Compartir vehículo privado' });
        this.princalternativapie.push({ nombre: 'Motocicleta' });
        this.princalternativapie.push({ nombre: 'Bus' });
        this.princalternativapie.push({ nombre: 'Bicicleta' });
        this.princalternativapie.push({ nombre: 'Taxi' });
        this.movivosbicicleta = [];
        this.movivosbicicleta.push({ nombre: 'Menor tiempo de viaje' });
        this.movivosbicicleta.push({ nombre: 'Razones Ambientales y/ o salud' });
        this.movivosbicicleta.push({
            nombre: 'Ahorrar dinero'
        });
        this.movivosbicicleta.push({
            nombre: 'No debo preocuparme por un lugar para estacionar'
        });
        this.movivosbicicleta.push({
            nombre: 'Seguridad'
        });
        this.movivosbicicleta.push({
            nombre: 'No tengo otra alternativa'
        });
        this.movivosbicicleta.push({
            nombre: 'Desconocimiento sobre el servicio de transporte público o servicio público deficiente'
        });

        this.movivosbicicleta.push({
            nombre: 'Otra razón. '
        });

        this.movivosbicicleta.push({
            nombre: 'Confort'
        });

        this.motivospie.push({ nombre: 'Vehículo privado' });
        this.motivospie.push({ nombre: 'Otro medio de transporte.' });
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
        this.ddesplazamientos = [];
        this.sdesplazamientos = [];
        this.sdesplazamientos.push({ label: 'A pie', value: 'A pie', img: 'walk.png' });
        this.sdesplazamientos.push({ label: 'Vehículo privado', value: 'Vehículo privado', img: 'vehiculo.png' });
        this.sdesplazamientos.push({ label: 'Bus', value: 'Bus', img: 'bus.png' });
        this.sdesplazamientos.push({ label: 'Taxi', value: 'Taxi', img: 'taxy.png' });
        this.sdesplazamientos.push({ label: 'Bicicleta', value: 'Bicicleta', img: 'bicycle.png' });
        this.sdesplazamientos.push({ label: 'Motocicleta', value: 'Motocicleta', img: 'motorcycle.png' });
        this.sdesplazamientos.push({ label: 'Otro', value: 'Otro', img: 'question.png' });
        this.sdesplazamientos.push({ label: 'Seleccione un medio de transporte', value: null });

        this.lmedios = [ 'A pie', 'Vehículo privado', 'Bus', 'Taxi', 'Bicicleta', 'Motocicleta'];

        this.lmedios.push({ label: 'A pie', value: 'A pie' });
        this.lmedios.push({ label: 'Vehículo privado', value: 'Vehículo privado' });
        this.lmedios.push({ label: 'Bus', value: 'Bus' });
        this.lmedios.push({ label: 'Taxi', value: 'Taxi' });
        this.lmedios.push({ label: 'Bicicleta', value: 'Bicicleta' });
        this.lmedios.push({ label: 'Motocicleta', value: 'Motocicleta' });
        
        this.medios.push({ label: 'Otro', value: 'Otro' });


        this.viajacomo.push({ label: 'Pasajero', value: 'Pasajero' });
        this.viajacomo.push({ label: 'Conductor', value: 'Conductor' });

        this.estacionaen.push({ label: 'Parqueaderos de la Universidad', value: 'Parqueaderos de la Universidad' });
        this.estacionaen.push({ label: 'Alrededores de la Universidad', value: 'Alrededores de la Universidad' });


        // Inicializando sección 4
        this.buspreferido = [];
        this.vehiculopreferido = [];
        this.piepreferido = [];
        this.bicicletapreferido = [];
        this.motocicletapreferido = [];
        this.buspreferido.push({ label: 'No existe una opción de transporte público hacia la Universidad de Cuenca desde su residencia o desde el lugar de origen  de su desplazamiento', value: '1' });
        this.buspreferido.push({ label: 'No conoce el funcionamiento del servicio de transporte público', value: '2' });
        this.buspreferido.push({ label: 'Requiere demasiado tiempo para completar el viaje', value: '3' });
        this.buspreferido.push({ label: 'Debe realizar cambios de líneas de buses', value: '4' });
        this.buspreferido.push({ label: 'Inseguridad: alta velocidad, irrespeto señales de tránsito, robos, etc.', value: '5' });
        this.buspreferido.push({ label: 'Demasiado costoso', value: '6' });
        this.buspreferido.push({ label: 'Bajo confort: demasiados pasajeros por unidad, dificultad de encontrar un asiento, demasiado ruido, etc.', value: '7' });
        this.buspreferido.push({ label: 'Otra razón. Especifique por favor', value: '8' });

        this.vehiculopreferido.push({ label: 'No existe suficiente oferta de espacios de parqueo en la Universidad de Cuenca', value: '1' });
        this.vehiculopreferido.push({ label: 'Los parqueaderos de la Universidad de Cuenca son inseguros', value: '2' });
        this.vehiculopreferido.push({ label: 'Alto costo de parqueo en la Universidad de Cuenca', value: '3' });
        this.vehiculopreferido.push({ label: 'La oferta de parqueo en los alrededores de la Universidad es deficiente y/o costosa', value: '4' });
        this.vehiculopreferido.push({ label: 'Adquirir un vehículo es costoso', value: '5' });
        this.vehiculopreferido.push({ label: 'Inseguridad: alta velocidad, irrespeto señales de tránsito, robos, etc.', value: '6' });
        this.vehiculopreferido.push({ label: 'Por razones ambientales y/o salud', value: '7' });
        this.vehiculopreferido.push({ label: 'Otra razón. Especifique por favor', value: '8' });

        this.piepreferido.push({ label: 'La infraestructura de la ciudad no es la adecuada para caminar en su ruta: ausencia de aceras, falta de señalización, etc.', value: '1' });
        this.piepreferido.push({ label: 'Distancia muy grande entre los orígenes de mis viajes y la Universidad de Cuenca', value: '2' });
        this.piepreferido.push({ label: 'Falta de servicios en la Universidad para esta actividad: duchas, vestidores, bebederos, etc.', value: '3' });
        this.piepreferido.push({ label: 'Por razones ambientales y/o salud', value: '4' });
        this.piepreferido.push({ label: 'Inseguridad: senderos compartidos con medios motorizados, irrespeto señales de tránsito, robos, etc.', value: '5' });
        this.piepreferido.push({ label: 'Confort: mal clima, falta de vestuario adecuado, etc.', value: '6' });
        this.piepreferido.push({ label: 'Otra razón. Especifique por favor', value: '7' });

        this.bicicletapreferido.push({ label: 'La infraestructura de la ciudad no es la adecuada para bicicletas en su ruta: ausencia de senderos, falta de señalización, etc.', value: '1' });
        this.bicicletapreferido.push({ label: 'Distancia muy grande entre los orígenes de mis viajes y la Universidad de Cuenca', value: '2' });
        this.bicicletapreferido.push({ label: 'Falta de servicios en la Universidad para esta actividad: aparcaderos, duchas, vestidores, bebederos, etc.', value: '3' });
        this.bicicletapreferido.push({ label: 'Confort: mal clima, falta de vestuario adecuado, etc.', value: '4' });
        this.bicicletapreferido.push({ label: 'Inseguridad: senderos compartidos con medios motorizados, irrespeto señales de tránsito, robos, etc.', value: '5' });
        this.bicicletapreferido.push({ label: 'Otra razón. Especifique por favor', value: '6' });

        this.motocicletapreferido.push({ label: 'No existe suficiente oferta de espacios de parqueo en la Universidad de Cuenca', value: '1' });
        this.motocicletapreferido.push({ label: 'Los parqueaderos de la Universidad de Cuenca son inseguros', value: '2' });
        this.motocicletapreferido.push({ label: 'Alto costo de parqueo en la Universidad de Cuenca', value: '3' });
        this.motocicletapreferido.push({ label: 'La oferta de parqueo en los alrededores de la Universidad es deficiente y/o costosa', value: '4' });
        this.motocicletapreferido.push({ label: 'Adquirir una motocicleta es costoso', value: '5' });
        this.motocicletapreferido.push({ label: 'Inseguridad: alta velocidad, irrespeto señales de tránsito, robos, etc.', value: '6' });
        this.motocicletapreferido.push({ label: 'Por razones ambientales y/o salud', value: '7' });
        this.motocicletapreferido.push({ label: 'Otra razón. Especifique por favor', value: '7' });




    }
    formModel: DynamicFormControlModel[] = MY_FORM_MODEL;
    formGroup: FormGroup;
    selectCar(event, car: any, overlaypanel: OverlayPanel) {
        // this.selectedCar = car;
        overlaypanel.toggle(event);
    }
    cambio() {
        console.log(this.minutos);
<<<<<<< HEAD
        //this.movilidad.desplazamientos1[this.indexDesplazamientosel].fin = 
=======
        // this.movilidad.desplazamientos1[this.indexDesplazamientosel].fin =
>>>>>>> 32c894821419a7a43b0c140620d16e4a39daa1aa
        // this.movilidad.desplazamientos1[this.indexDesplazamientosel].inicio;

        this.movilidad.desplazamientos1[this.indexDesplazamientosel].fin = new Date(
            this.movilidad.desplazamientos1[this.indexDesplazamientosel].inicio.getTime() + this.minutos * 60000);

    }
    iniciarGannt() {


        gantt.config.xml_date = '%Y-%m-%d %H:%i';

        // gantt.config.readonly = true;
        gantt.config.start_date = new Date(2017, 11, 22, 5);
        gantt.config.start_date = new Date(2017, 11, 22, 23);
        gantt.config.grid_width = 0;
        gantt.config.date_grid = '%H:%i';
        gantt.config.scale_unit = 'hour';
        gantt.config.duration_unit = 'minute';
        gantt.config.date_scale = '%H:%i';
        // gantt.config.readonly = true;
        gantt.config.details_on_create = true;
        gantt.config.grid_resize = true;

        gantt.config.autofit = false;
        gantt.config.step = 1;
        // gantt.init('gantt_here');

        gantt.templates.rightside_text = function (start, end, task) {
            return '<img src=\'assets / images / bus.png\' width=\'15\'>ID: #' + task.prueba;
        };

        gantt.templates.leftside_text = function (start, end, task) {
            return task.prueba1 + ' days';
        };
        // 	gantt.parse(demo_tasks);

        // gantt.config.start_date = new Date(2017, 11, 28,5);
        // 	gantt.config.end_date = new Date(2017, 11, 28,23);
        if (this.ganttContainer) {
            gantt.init(this.ganttContainer.nativeElement);

            gantt.attachEvent('onAfterTaskAdd', (id, item) => {
                this.taskService.insert(this.serializeTask(item, true))
                    .then((response) => {
                        if (response.id !== id) {
                            gantt.changeTaskId(id, response.id);
                        }
                    });
            });

            gantt.attachEvent('onAfterTaskUpdate', (id, item) => {
                this.taskService.update(this.serializeTask(item));
            });

            gantt.attachEvent('onAfterTaskDelete', (id) => {
                this.taskService.remove(id);
            });

            gantt.attachEvent('onAfterLinkAdd', (id, item) => {
                this.linkService.insert(this.serializeLink(item, true))
                    .then((response) => {
                        if (response.id !== id) {
                            gantt.changeLinkId(id, response.id);
                        }
                    });
            });

            gantt.attachEvent('onAfterLinkUpdate', (id, item) => {
                this.linkService.update(this.serializeLink(item));
            });

            gantt.attachEvent('onAfterLinkDelete', (id) => {
                this.linkService.remove(id);
            });

            Promise.all([this.taskService.get(), this.linkService.get()])
                .then(([data, links]) => {
                    // gantt.parse({ data, links });
                });
        }
    }

    dragStart(event, car: any) {
        this.desplazamientodrag = car;
    }

    drop(event) {
        //console.log(event);
        if (this.desplazamientodrag) {
            // let draggedCarIndex = this.findIndex(this.desplazamientodrag);
            let desp: Desplazamiento;
<<<<<<< HEAD
            this.minutos = 5;
            desp = JSON.parse(JSON.stringify(this.desplazamientodrag));
            console.log(desp);
            //console.log(this.movilidad.desplazamientos1.length);
            // console.log(this.sdesplazamientos.indexOf(this.desplazamientodrag));
            if (this.movilidad.desplazamientos1.length == 0) {
                desp.inicio = new Date(2005, 1, 4, 5, 0);

                desp.fin = new Date(desp.inicio.getTime() + this.minutos * 60000);
                desp.origen = "Residencia";
            } else {
                //  console.log("si");
                desp.inicio = this.movilidad.desplazamientos1[this.movilidad.desplazamientos1.length - 1].fin;
                //  console.log(desp.inicio);
                desp.fin = new Date(desp.inicio.getTime() + this.minutos * 60000);
=======

            desp = JSON.parse(JSON.stringify(this.desplazamientodrag));
            console.log(this.movilidad.desplazamientos1.length);
            if (this.movilidad.desplazamientos1.length === 0) {
                desp.inicio = new Date(2005, 1, 4, 5, 0);
                desp.fin = new Date(desp.inicio.getTime() + this.minutos * 60000);
                desp.origen = 'Residencia';
            } else {
                console.log('si');
                desp.inicio = this.movilidad.desplazamientos1[this.movilidad.desplazamientos1.length - 1].fin;
>>>>>>> 32c894821419a7a43b0c140620d16e4a39daa1aa
                desp.origen = this.movilidad.desplazamientos1[this.movilidad.desplazamientos1.length - 1].destino;
            }

            this.movilidad.desplazamientos1 = [...this.movilidad.desplazamientos1, desp];
            this.desplazamientosel = desp;
            this.indexDesplazamientosel = this.movilidad.desplazamientos1.indexOf(desp);
<<<<<<< HEAD
            //console.log(this.indexDesplazamientosel);
            //console.log(this.movilidad.desplazamientos1);
            //this.availableCars = this.availableCars.filter((val, i) => i != draggedCarIndex);
=======
            console.log(this.indexDesplazamientosel);
            console.log(this.movilidad.desplazamientos1);
            // this.availableCars = this.availableCars.filter((val, i) => i != draggedCarIndex);
>>>>>>> 32c894821419a7a43b0c140620d16e4a39daa1aa
            // this.draggedCar = null;
        }
    }
    seleccionar(index) {
        this.desplazamientosel = this.movilidad.desplazamientos1[index];
        this.indexDesplazamientosel = index;
    }
    dragEnd(event) {
        console.log(event);
        this.desplazamientodrag = null;
    }

    findIndex(car: any) {
        let index = -1;
        for (let i = 0; i < this.sdesplazamientos.length; i++) {
            if (car.vin === this.sdesplazamientos[i].vin) {
                index = i;
                break;
            }
        }
        return index;
    }

    public cargar(data: any, links?: any) {
        gantt.parse({ data, links });
    }
    public serializeTask(data: any, insert: boolean = false): Task {
        return this.serializeItem(data, insert) as Task;
    }

    public serializeLink(data: any, insert: boolean = false): Link {
        return this.serializeItem(data, insert) as Link;
    }

    public serializeItem(data: any, insert: boolean): any {
        const result = {};

        for (const i in data) {
            if (i.charAt(0) === '$' || i.charAt(0) === '_') { continue; }
            if (insert && i === 'id') { continue; }
            if (data[i] instanceof Date) {
                result[i] = gantt.templates.xml_format(data[i]);
            } else {
                result[i] = data[i];
            }
        }

        return result;
    }
    nuevo() {
        const desplazamiento = {} as Desplazamiento;
        desplazamiento.movimiento = this.movilidad.desplazamientos1.length + 1;
        // desplazamiento.origen= '';
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
        const links = [
            // { id: 1, source: 1, target: 2, type: '0' }
        ];
        // this.ganttContainer.cargar(tasks, links);
        // this.ganttContainer.
        this.iniciarGannt();
        /*
        for (let index = 1; index <= 3; index++) {
            const desplazamiento = {} as Desplazamiento;
            desplazamiento.movimiento = index;
            desplazamiento.id = index;

            desplazamiento.inicio = new Date(2005, 1, 4, 5, 0);
            desplazamiento.fin = new Date(2005, 1, 4, 5, 5);
            desplazamiento.start_date = this.datePipe.transform(new Date(2005, 1, 4, 5, 0), 'yyyy-MM-dd hh:mm');
            //            desplazamiento.medio;
            // desplazamiento.origen= '';
            desplazamiento.duration = 5;
            this.movilidad.desplazamientos1 = [... this.movilidad.desplazamientos1, desplazamiento];
            let ts: Task = {} as Task;
            ts.id = index * 1;
            ts.duration = 1;
            ts.start_date = desplazamiento.start_date;
            console.log(ts);
            // this.cargar(this.serializeTask({ id: 1, text: 'Lunes', start_date: '2017-11-28 06:15',
            duration: 15, progress: 0.6, prueba: 'test' }),[]);
        }*/
        // this.cargar(tasks, links);
    }


    onTabChange(event) {
        if (event.index * 1 === 1) {
            this.index = true;
        } else {
            this.index = false;
        }
        console.log(this.index);
    }
}
