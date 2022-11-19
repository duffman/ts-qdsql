/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2018-05-08 19:05
 */

import { QdAlterWhat }    from "./components/alter.cmp";
import { InsertCmp }      from "./components/insert.cmp";
import { JoinCmp }        from "./components/join.cmp";
import { RawCmp }    from "./components/raw.cmp";
import { SelectCmp } from "./components/select.cmp";
import { SetCmp }    from "./components/set.cmp";
import { sqlValue }       from "./extutils/sqlstring";
import { formatSql }      from "./extutils/sqlstring";
import { queryFLat }      from "./qdsql.utils";
import { QdSqlType } from "./qdsql,type";
import { SqlOutput } from "./urils/sql-output";

export interface IOperation {
	type: QdSqlType;
}

export type QdAny = Array<QdSimple> | QdSimple;
export type QdSimple = null | string | boolean | number | bigint;
export type AnyArray = QdAny[];
export type StrArrayOrVal = string[] | string;

export interface IKeyValRec {
	[ key: string ]: QdSimple;
}

export type tableNameVal = { [ key: string ]: QdSimple };

export type QdKeyVal = IKeyValRec | string;
export type KeyValueList = { [ key: string ]: QdSimple };

export type TableDataObj = { colNames: KeyValueList, colValues: KeyValueList };

export enum IntoType {
	Insert,
	MySqlReplace
}

export interface IQdCmp {
	type: QdSqlType;

	/**
	 * Generate component SQL
	 * @param args
	 * @returns {string}
	 */
	compile(...args: any[]): string;
}

export abstract class BaseQdSql {
	readonly parts  = new Array<string>();
	readonly cmpArr = new Array<IQdCmp>()

	constructor() {
	}

	addCmp(value: IQdCmp): number {
		return this.cmpArr.push(value);
	}

	clear(): void {
		this.parts.length = 0;
	}
}

export type insertData = IKeyValRec

export class QdSql extends BaseQdSql implements IOperation {
	type: QdSqlType;
	currCmp?: IQdCmp;

	constructor() {
		super();
	}

	alter(type: QdAlterWhat, name: string): QdSql {
		return this;
	}

	insert(data: tableNameVal, tableName?: string): QdSql {
		this.addCmp(new InsertCmp(data, tableName));
		return this;
	}

	set(value: KeyValueList, tableName?: string): QdSql {
		this.addCmp(new SetCmp(value, tableName))
		return this;
	}

	private joinTables(joinType: QdSqlType, table: QdKeyVal, onExpr: KeyValueList): QdSql {
		this.addCmp(new JoinCmp(joinType, table, onExpr));
		return this;
	}

	join(table: QdKeyVal, onExpr: KeyValueList): QdSql {
		return this.joinTables(QdSqlType.InnerJoin, table, onExpr);
	}

	raw(exp: string, escape: boolean = true): QdSql {
		this.addCmp(new RawCmp(exp, escape));
		return this;
	}

	/**
	 * Format a manually entered string, replacing
	 * question ?-marks with values from array
	 * @param {string} exp
	 * @param values
	 * @returns {QdSql}
	 */
	public rawFormat(exp: string, ...values: any[]): QdSql {
		this.parts.push(formatSql(exp, values))
		return this;
	}

	public select(data?: StrArrayOrVal, tableName?: string): QdSql {
		this.currCmp = new SelectCmp(data, tableName);

		this.addCmp(this.currCmp);

		return this;
	}

	public from(tableName?: QdKeyVal): QdSql {
		this.addCmp(new FromCmp(tableName));
		return this;
	}

	public where(value: KeyValueList): QdSql {
		this.parts.push("WHERE");

		return this;
	}

	public whereRaw(value: any, escape: boolean = true): QdSql {
		this.parts.push("FROM");

		return this;
	}

	public toSql(): string {
		let sql = new SqlOutput();
		console.log("Components ::", this.cmpArr);

		for (let cmp of this.cmpArr) {

			try {
				sql.push(
					cmp.compile()
				);
			}
			catch (e) {
				console.log("Compile failed for component:", cmp);
				break;
			}
		}

		return sql.compile();
	}
}

let sql = new QdSql();


/*
	case TestType.insert:
		sql.insert(
			{
				id  : 1,
				name: "roffe",
				sant: false
			});

*/

	sql.select("name",
			   "sant"
			).from(
			{ "bracke": "rufusDenTredje" }
		);
sql.toSql();

/*.join(
 "Kalle", //{ "ralf": "osten"},
 {
 "roffe.id": "kalle.id"
 }*/
//).raw('Ruffe "kalle kul"'


/*
 const doRetard = true;
 if (!doRetard) process.exit(10);

 let sql = new QdSql();

 process.exit(10);

 console.log("POkok");

 let arr1 = [
 {
 "kalle": "kula",
 "bula" : "KNYRRE"
 }
 ];

 let arr2 = [ "kalle", "kula", "bula" ];

 console.log(
 sql.insert(
 {
 id  : 1,
 name: "roffe",
 sant: false
 },
 "users"
 )
 );

 console.log();
 console.log();

 console.log(
 sql.insert(
 {
 id  : 1,
 name: "roffe",
 sant: false
 },
 "users"
 )
 );
 */
