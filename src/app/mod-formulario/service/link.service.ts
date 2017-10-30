import {Injectable} from "@angular/core";
import {Link} from "../model/models";
import {Http} from "@angular/http";
import {ExtractData, HandleError} from "./service-helper";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LinkService {
	private linkUrl = "api/links";

	constructor(private http: Http) {}

	get() {
		let links = [
			{id: 1, source: 1, target: 2, type: "0"}
		];
		return links;
	}

	insert(link: Link): Promise<Link> {
		return this.http.post(this.linkUrl, JSON.stringify(link))
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}

	update(link: Link): Promise<void> {
		return this.http.put(`${this.linkUrl}/${link.id}`, JSON.stringify(link))
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}

	remove(id: number): Promise<void> {
		return this.http.delete(`${this.linkUrl}/${id}`)
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}
}
