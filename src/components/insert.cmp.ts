/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-09 02:01
 */

import { formatSql }   from "../extutils/sqlstring";
import { queryFLat }   from "../qdsql.utils";
import { splitKeyVal } from "../qdsql.utils";
import { IQdCmp }      from "../qdsql";
import { QdSqlType }   from "../qdsql,type";

export class InsertCmp implements IQdCmp {
	type = QdSqlType.Insert;

	constructor(
		public data: any,
		public tableName?: string
	) {
	}

	compile(...args: any): string {
		let keyValRes = splitKeyVal(this.data, true);
		let colNames  = keyValRes[ 0 ]
		let colValues = keyValRes[ 1 ];

		return formatSql("INSERT INTO (?) VALUES (?)", [colNames, colValues]);
    }
}
