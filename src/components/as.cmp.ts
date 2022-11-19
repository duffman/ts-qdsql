/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-10 19:42
 */

import { IQdCmp }    from "../qdsql";
import { QdSqlType } from "../qdsql,type";

export class AsCmp implements IQdCmp {
	public type = QdSqlType.As;

	constructor(public what: string, public aliasWhat: string) {
	}

	public compile(...args): string {
		return `${this.what} AS ${this.aliasWhat}}`;
	}
}
