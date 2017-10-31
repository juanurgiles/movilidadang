import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskService } from './mod-formulario/service/task.service';
import { LinkService } from './mod-formulario/service/link.service';
import { Task, Link } from './mod-formulario/model/models';

import 'dhtmlx-gantt';
import { } from '@types/dhtmlxgantt';

@Component({
	selector: 'gantt',
	styles: [
		`
		:host{
			display: block;
			height: 600px;
			position: relative;
			width: 100%;
		}
	`],
	providers: [TaskService, LinkService],
	template: '<div #gantt_here style="width: 100%; height: 100%;"></div>',
})
export class GanttComponent implements OnInit {
	@ViewChild('gantt_here') ganttContainer: ElementRef;

	constructor(private taskService: TaskService, private linkService: LinkService) { }

	ngOnInit() {

		gantt.config.xml_date = '%Y-%m-%d %H:%i';

		// gantt.config.readonly = true;
		gantt.config.start_date = new Date(2017, 11, 22, 5);
		gantt.config.start_date = new Date(2017, 11, 22, 23);
		gantt.config.grid_width = 0;
		gantt.config.date_grid = '%H:%i';
		gantt.config.scale_unit = 'hour';
		gantt.config.duration_unit = 'minute';
		gantt.config.date_scale = '%H:%i';
		gantt.config.readonly = true;
		gantt.config.details_on_create = true;
		gantt.config.autofit = false;
		gantt.config.step = 1;
		//gantt.init("gantt_here");

		gantt.templates.rightside_text = function (start, end, task) {
			return "<img src='assets/images/bus.png' width='15'>ID: #" + task.prueba;
		};

		gantt.templates.leftside_text = function (start, end, task) {
			return task.prueba1 + " days";
		};
		//	gantt.parse(demo_tasks);

		//gantt.config.start_date = new Date(2017, 11, 28,5);
		//	gantt.config.end_date = new Date(2017, 11, 28,23);
		gantt.init(this.ganttContainer.nativeElement);

		gantt.attachEvent('onAfterTaskAdd', (id, item) => {
			this.taskService.insert(this.serializeTask(item, true))
				.then((response) => {
					if (response.id != id) {
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
					if (response.id != id) {
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
				gantt.parse({ data, links });
			});
	}

	public serializeTask(data: any, insert: boolean = false): Task {
		return this.serializeItem(data, insert) as Task;
	}

	public serializeLink(data: any, insert: boolean = false): Link {
		return this.serializeItem(data, insert) as Link;
	}

	public serializeItem(data: any, insert: boolean): any {
		var result = {};

		for (let i in data) {
			if (i.charAt(0) == '$' || i.charAt(0) == '_') continue;
			if (insert && i == 'id') continue;
			if (data[i] instanceof Date) {
				result[i] = gantt.templates.xml_format(data[i]);
			}
			else {
				result[i] = data[i];
			}
		}

		return result;
	}
}
