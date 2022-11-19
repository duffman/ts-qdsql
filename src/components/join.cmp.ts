/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2018-05-08
 */

import { formatSql }            from "../extutils/sqlstring";
import { sqlIdent }             from "../extutils/sqlstring";
import { QdKeyVal }             from "../qdsql";
import { KeyValueList }         from "../qdsql";
import { IQdCmp }               from "../qdsql";
import { QdSqlType }            from "../qdsql,type";
import { QdSqlType as sqlType } from "../qdsql,type";
import { SqlOutput }            from "../urils/sql-output";
import { Str }                  from "../urils/str";
import { AsCmp }                from "./as.cmp";

export class JoinCmp implements IQdCmp {
	public type = QdSqlType.Join;

	constructor(
		public joinType: QdSqlType,
		public table: QdKeyVal,
		public on?: KeyValueList,
		public joinWith?: string
	) {
	}

	compile(): string {
		const result = new SqlOutput();
		result.push(this.joinType);

		if (Str.isStr(this.table)) {
			result.push(sqlIdent(this.table))
		} else {
			const [key, value] = Object.entries(this.table)[0];
			result.push(
				new AsCmp(key, value as string).compile()
			)
		}

		result.add(formatSql("ON ?", this.on));

		return result.compile();
	}
}

