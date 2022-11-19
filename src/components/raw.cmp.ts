/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-10 19:42
 */

import { sqlValue }  from "../extutils/sqlstring";
import { IQdCmp }    from "../qdsql";
import { QdSqlType } from "../qdsql,type";
import { escVal }    from "../qdsql.utils";

export class RawCmp implements IQdCmp {
	public type = QdSqlType.Raw;

	constructor(public expr: string,
				public escape: boolean = true) {
	}

	public compile(...args): string {
		return this.escape
			   ? sqlValue(this.expr)
			   : this.expr;
	}
}
