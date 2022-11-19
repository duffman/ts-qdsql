import { AsCmp }    from "../components/as.cmp";
import { sqlIdent } from "../extutils/sqlstring";
import { QdKeyVal } from "../qdsql";
import { Str }      from "../urils/str";

/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-18 14:09
 */

export const QdKeyValToStr = (value: QdKeyVal): string => {
	if (Str.isStr(value)) {
		return sqlIdent(value)
	} else {
		const [key, val] = Object.entries(value)[0];
		return new AsCmp(key, value as string).compile();
	}
}
