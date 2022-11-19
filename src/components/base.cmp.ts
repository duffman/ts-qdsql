/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-09 14:47
 */

import uuid          from "uuid";
import { IQdCmp }    from "../qdsql";
import { QdSqlType } from "../qdsql,type";

export class BaseCmp implements IQdCmp {
	public CmpId = uuid.v4();
	public type  = QdSqlType._BASE_CMP_;

	public compile(...args: any[]): string {
		return "";
	}
}
