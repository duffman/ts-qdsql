/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-09 03:44
 */

import { QdAny }        from "../qdsql";
import { KeyValueList } from "../qdsql";
import { IQdCmp }    from "../qdsql";
import { QdSqlType } from "../qdsql,type";

export class WhereCmp implements IQdCmp {
	type = QdSqlType.Where;
	values?: KeyValueList;
	key?: string;
	value?: QdAny;

	public compile(...args: any[]): string {
		return "";
	}
}

