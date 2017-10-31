import { Injectable } from '@angular/core';
import { Task } from '../model/models';
import { Http } from '@angular/http';
import { ExtractData, HandleError } from './service-helper';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
	private taskUrl = 'api/tasks';

	constructor(private http: Http) { }

	get() {
		let tasks = [
			{ id: 1, text: 'Lunes', start_date: '2017-11-28 06:15',  duration: 15, progress: 0.6, prueba: 'test' },
			{ id: 2, text: 'Lunes', start_date: '2017-11-28 07:20',  duration: 30, progress: 0.4 },
			{ id: 3, text: 'Lunes', start_date: '2017-11-28 06:35',  duration: 50, progress: 0.6 },
			{ id: 4, text: 'Lunes', start_date: '2017-11-28 08:25',  duration: 10, progress: 0.4 },
			{ id: 5, text: 'Martes', start_date: '2017-11-28 09:15',  duration: 20, progress: 0.6 },
			{ id: 6, text: 'Martes', start_date: '2017-11-28 16:10',  duration: 600, progress: 0.4 },
			{ id: 7, text: 'Martes', start_date: '2017-11-28 18:20',  duration: 300, progress: 0.6 },
			{ id: 8, text: 'Martes', start_date: '2017-11-28 20:30', duration: 600, progress: 0.4 },
		];
		return tasks;
		/*return this.http.get(this.taskUrl)
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);*/
	}

	insert(task: Task) {
		return this.http.post(this.taskUrl, JSON.stringify(task))
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}


	update(task: Task): Promise<void> {
		return this.http
			.put(`${this.taskUrl}/${task.id}`, JSON.stringify(task))
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}

	remove(id: number): Promise<void> {
		return this.http.delete(`${this.taskUrl}/${id}`)
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}
}