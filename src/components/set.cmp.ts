/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-10 20:18
 */

import { formatSql }    from "../extutils/sqlstring";
import { KeyValueList } from "../qdsql";
import { IQdCmp }       from "../qdsql";
import { QdSqlType }    from "../qdsql,type";

export class SetCmp implements IQdCmp {
	public type = QdSqlType.Set;

	constructor(public value: KeyValueList, tableName?: string) { }

	public compile(...args: any[]): string {
		return formatSql("(?)", this.value);
	}
}
