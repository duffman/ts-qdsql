/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-10 19:59
 */

import { escVal } from "../qdsql.utils";

export class SqlOutput extends Array<string> {
	public add(value: any) {
		this.push(
			escVal(value)
		)
	}

	public compile(sep: string = " "): string {
		return this.join(sep);
	}
}
