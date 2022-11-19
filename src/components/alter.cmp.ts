/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2018-05-08 18:43
 */

import { IQdCmp }    from "../qdsql";
import { QdSqlType } from "../qdsql,type";

export enum QdAlterWhat {
	Table,
	View,
	Database,
	Function	,
	RenameTable,
	RenameView,
	RenameDatabase,
	RenameFunction
}

export class AlterCmp implements IQdCmp {
	public type = QdSqlType.Alter;

	name: string;
	constructor(public what: QdAlterWhat) {
	}

	public compile(...args: any[]): string {
		return "";
	}
}
