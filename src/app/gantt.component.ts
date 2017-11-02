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
			width: 1500px;
		}
	`],
	providers: [TaskService, LinkService],
	template: '<div #gantt_here style="width: 1500px; height: 100%;"></div>',
})
export class GanttComponent implements OnInit {
	@ViewChild('gantt_here') ganttContainer: ElementRef;

	constructor(private taskService: TaskService, private linkService: LinkService) { }

	ngOnInit() {
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
