/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-09 04:38
 */
import { sqlValue } from "../extutils/sqlstring";
import { escVal }   from "../qdsql.utils";

export class QdTableMap<T> extends Map<string, T> {
	constructor(
		data: any,
		private readonly tableName?: string
	) {
		super();
		(data);
	}

	get(key: string, escape: boolean = true): T {
		return escVal(super.get(key), escape);
	}
}
