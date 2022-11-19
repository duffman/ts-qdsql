/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-18 11:28
 */

import { AsCmp }    from "../../components/as.cmp";
import { sqlIdent } from "../../extutils/sqlstring";

export{}
declare global {
	interface QdKeyVal {
		compile(): string;
	}
/*
	class QdKeyVal implements QdKeyVal {
		public compile(): string;
	}

 */
}
/*
if (!QdKeyVal.prototype.compile()) {
	Object.prototype.compile = function(): string {
		if (typeof this === "string") {
			return sqlIdent(this);
		} else {
			const [key, value] = Object.entries(this.table)[0];
			return new AsCmp(key, value as string).compile()
		}
	}
}

 */
