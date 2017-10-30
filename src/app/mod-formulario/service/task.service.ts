import {Injectable} from "@angular/core";
import {Task} from "../model/models";
import {Http} from "@angular/http";
import {ExtractData, HandleError} from "./service-helper";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
	private taskUrl = "api/tasks";

	constructor(private http: Http) {}

	get(){
		let	tasks = [
			{id: 1, text: "Task #1", start_date: "2017-11-28 06:00", duration: 3, progress: 0.6},
			{id: 2, text: "Task #2", start_date: "2017-11-28 07:00", duration: 3, progress: 0.4}
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