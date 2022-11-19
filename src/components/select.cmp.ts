/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-09 02:06
 */

import { QdKeyVal }    from "../qdsql";
import { queryFLat }   from "../qdsql.utils";
import { splitKeyVal } from "../qdsql.utils";
import { IQdCmp }      from "../qdsql";
import { QdSqlType }   from "../qdsql,type";
import { SqlOutput }   from "../urils/sql-output";

export type sdf = {
	adf: any
}

export class SelectCmp implements IQdCmp {
	type = QdSqlType.Select;
	distinct?: boolean;
	columns?: string[];
	aliasMap = new Map<string, string>();

	constructor(private value?: any, private tableName?: QdKeyVal) {
	}

	public alias(...args: any): void {
		let keyValRes = splitKeyVal(args, true);
		let colNames  = keyValRes[ 0 ]
		let colValues = keyValRes[ 1 ];
	}

	public compile(...args: any[]): string {
		const result = new SqlOutput();

		result.add(QdSqlType.Select);

		if (this.tableName) {
			result.add(this.tableName.toString())
		}

		/*
		if (!Array.isArray(data)) {
		}
		else {
			this.parts.push(queryFLat(data));
		}

		if (tableName) {
			this.from(queryFLat(data));
		}
		*/

		return "";
	}
}
