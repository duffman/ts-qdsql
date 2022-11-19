/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2018-05-07 23:41
 */

import { sqlValue }   from "./extutils/sqlstring";
import { formatSql }  from "./extutils/sqlstring";
import { QdSimple }   from "./qdsql";
import { QdTableMap } from "./urils/qdtable.map";

export const isSimpleValue = (value: any): boolean => {
	return typeof value in [ "string", "boolean", "number", "bigint" ];
}

/**
 * Escape and join an array
 * @param {any[]} data
 * @param {boolean} inBrackets
 * @returns {string}
 */
export const queryFLat = (data: any, inBrackets = true): string => {
	let result = formatSql(Array.isArray(data) ? data.join(", ") : data);
	return ( inBrackets ) ? `(${ result })` : result;
}

/**
 * Split array containing {key: "value"} pairs
 * into 2 arrays, one for keys and one for values
 * @param value
 * @param flatten
 */
export const splitKeyVal = (value: any, flatten?: boolean): [ string[], string[] ] => {
	let colNames  = new Array<string>();
	let colValues = new Array<string>();

	for (let key in value) {
		if (value.hasOwnProperty(key)) {
			colNames.push(key);
			colValues.push(value[ key ]);
		}
	}

	return [ colNames, colValues ];
}

/**
 * Simple function that takes a string argument
 * and offers to do a safe SQL escape
 * @param {string} value
 * @param {boolean} sqlEscape
 */
export const escVal = (value?: any, sqlEscape: boolean = true) => {
	return sqlEscape ? sqlValue(value) : value;
}

/**
 * Wrapper function for the
 * @param data
 * @returns {Map<string, T>}
 */
export const keyValToMap = <T = keyof QdSimple>(data: any): Map<string, T> => {
	try {
		return  new QdTableMap<T>(data);
	}
	catch (e) {
		console.error("toMap :: error ::", e);
	}
}
