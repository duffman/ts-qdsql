const ID_GLOBAL_REGEXP    = /`/g;
const QUAL_GLOBAL_REGEXP  = /\./g;
const CHARS_GLOBAL_REGEXP = /[\0\b\t\n\r\x1a\"\'\\]/g; // eslint-disable-line no-control-regex
const CHARS_ESCAPE_MAP    = {
	'\0'  : '\\0',
	'\b'  : '\\b',
	'\t'  : '\\t',
	'\n'  : '\\n',
	'\r'  : '\\r',
	'\x1a': '\\Z',
	'"'   : '\\"',
	'\''  : '\\\'',
	'\\'  : '\\\\'
}

export interface ISubSqlString {
	toSqlString: () => string;
}

/*
export function escapeId(value: any, forbidQualified?: boolean): string {

}

 export function escape(value: any, stringifyObjects?: boolean, timeZone?: string): string {

 }

export function format(sql: string, args?: object | any[], stringifyObjects?: boolean, timeZone?: string): string {

}

export function raw(sql: string):ISubSqlString { toSqlString: () => string } {

}
*/


export const sqlIdent = (val: any, forbidQualified?: boolean): string => {
	if (Array.isArray(val)) {
		let sql = '';

		for (let i = 0; i < val.length; i++) {
			sql += ( i === 0 ? '' : ', ' ) + sqlIdent(val[ i ], forbidQualified);
		}

		return sql;
	}
	else if (forbidQualified) {
		return '`' + String(val).replace(ID_GLOBAL_REGEXP, '``') + '`';
	}
	else {
		return '`' + String(val).replace(ID_GLOBAL_REGEXP, '``').replace(QUAL_GLOBAL_REGEXP, '`.`') + '`';
	}
}

export const sqlValue = (val: any, stringifyObjects?: boolean, timeZone?: string): string => {
	if (!val) {
		return 'NULL';
	}

	switch (typeof val) {
		case 'boolean':
			return ( val ) ? 'true' : 'false';
		case 'number':
			return val + '';
		case 'object':
			if (val.toString() === '[object Date]') {
				return dateToString(val, timeZone || 'local');
			}
			else if (Array.isArray(val)) {
				return arrayToList(val, timeZone);
			}
			else if (Buffer.isBuffer(val)) {
				return bufferToString(val);
			}
			else if (typeof val.toSqlString === 'function') {
				return String(val.toSqlString());
			}
			else if (stringifyObjects) {
				return escapeString(val.toString());
			}
			else {
				return objectToValues(val, timeZone);
			}
		default:
			return escapeString(val);
	}
}

export const arrayToList = (array: any[], timeZone?: string): string => {
	let sql = '';

	for (let i = 0; i < array.length; i++) {
		let val = array[ i ];

		if (Array.isArray(val)) {
			sql += ( i === 0 ? '' : ', ' ) + '(' + arrayToList(val, timeZone) + ')';
		}
		else {
			sql += ( i === 0 ? '' : ', ' ) + sqlValue(val, true, timeZone);
		}
	}

	return sql;
}

export const formatSql = (sql: string, args?: object | any[], stringifyObjects?: boolean, timeZone?: string): string => {
	if (!args) {
		return sql;
	}

	let argsArray: any[] = !Array.isArray(args)
						? [args]
						: args;


	let chunkIndex        = 0;
	let placeholdersRegex = /\?+/g;
	let result            = '';
	let valuesIndex       = 0;
	let match;

	while (valuesIndex < argsArray.length && ( match = placeholdersRegex.exec(sql) )) {
		let len = match[ 0 ].length;

		if (len > 2) {
			continue;
		}

		let value = len === 2
					? sqlIdent(args[ valuesIndex ])
					: sqlValue(args[ valuesIndex ], stringifyObjects, timeZone);

		result += sql.slice(chunkIndex, match.index) + value;
		chunkIndex = placeholdersRegex.lastIndex;
		valuesIndex++;
	}

	if (chunkIndex === 0) {
		// Nothing was replaced
		return sql;
	}

	if (chunkIndex < sql.length) {
		return result + sql.slice(chunkIndex);
	}

	return result;
}

export const dateToString = (date, timeZone?: string): string => {
	let dt = new Date(date);

	if (isNaN(dt.getTime())) {
		return 'NULL';
	}

	let year;
	let month;
	let day;
	let hour;
	let minute;
	let second;
	let millisecond;

	if (timeZone === 'local') {
		year        = dt.getFullYear();
		month       = dt.getMonth() + 1;
		day         = dt.getDate();
		hour        = dt.getHours();
		minute      = dt.getMinutes();
		second      = dt.getSeconds();
		millisecond = dt.getMilliseconds();
	}
	else {
		let tz = convertTimezone(timeZone);

		if (tz !== 0) {
			dt.setTime(dt.getTime() + ( tz * 60000 ));
		}

		year        = dt.getUTCFullYear();
		month       = dt.getUTCMonth() + 1;
		day         = dt.getUTCDate();
		hour        = dt.getUTCHours();
		minute      = dt.getUTCMinutes();
		second      = dt.getUTCSeconds();
		millisecond = dt.getUTCMilliseconds();
	}

	// YYYY-MM-DD HH:mm:ss.mmm
	let str = zeroPad(year, 4) + '-' + zeroPad(month, 2) + '-' + zeroPad(day, 2) + ' ' +
			  zeroPad(hour, 2) + ':' + zeroPad(minute, 2) + ':' + zeroPad(second, 2) + '.' +
			  zeroPad(millisecond, 3);

	return escapeString(str);
}

const bufferToString = (buffer) => {
	return 'X' + escapeString(buffer.toString('hex'));
}

const objectToValues = (object: any, timeZone?: string): string => {
	let sql = '';

	for (let key in object) {
		let val = object[ key ];

		if (typeof val === 'function') {
			continue;
		}

		sql += ( sql.length === 0 ? '' : ', ' ) + sqlIdent(key) + ' = ' + sqlValue(val, true, timeZone);
	}

	return sql;
}

export const raw = (sql: string): ISubSqlString => {
	return {
		toSqlString: function toSqlString() {
			return sql;
		}
	}
}

export const escapeString = (val: string): string => {
	let chunkIndex = CHARS_GLOBAL_REGEXP.lastIndex = 0;
	let escapedVal = '';
	let match;

	while (( match = CHARS_GLOBAL_REGEXP.exec(val) )) {
		escapedVal += val.slice(chunkIndex, match.index) + CHARS_ESCAPE_MAP[ match[ 0 ] ];
		chunkIndex = CHARS_GLOBAL_REGEXP.lastIndex;
	}

	if (chunkIndex === 0) {
		// Nothing was escaped
		return "'" + val + "'";
	}

	if (chunkIndex < val.length) {
		return `'${escapedVal}${val.slice(chunkIndex)}'`;
	}

	return "'" + escapedVal + "'";
}

export const zeroPad = (number, length) => {
	number = number.toString();
	while (number.length < length) {
		number = '0' + number;
	}

	return number;
}

export const convertTimezone = (tz: string): number => {
	let result = 0;

	if (tz !== 'Z') {
		let m = tz.match(/([\+\-\s])(\d\d):?(\d\d)?/);

		if (m) {
			result = ( m[ 1 ] === '-' ? -1 : 1 ) * ( parseInt(m[ 2 ], 10) + ( ( m[ 3 ] ? parseInt(m[ 3 ], 10) : 0 ) / 60 ) ) * 60;
		}
	}

	return 0;
}
