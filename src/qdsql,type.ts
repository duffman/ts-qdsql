/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2018-05-08 00:38
 */

import { QdSql } from "./qdsql";

export enum QdDialect {
	MySQL      = "MySQL",
	PostgreSQL = "PostgreSQL",
	SQLite     = "SQLlite",
	MSSQL      = "MSSQL",
	//TODO :: _IMPLEMENT_ :: ** Cassandra = "cassandra"
}

export type QdDbOpType = keyof typeof QdSqlType;

export enum QdSqlType {
	_BASE_CMP_      = "_BASE_CMP_",
	Raw             = "RAW",
	Unset           = "__",
	Alter           = "ALTER",
	SubQuery        = "",
	Create          = "CREATE",
	Table           = "TABLE",
	Explain         = "EXPLAIN",
	Insert          = "INSERT",
	Update          = "UPDATE",
	MySqlReplace    = "",
	Select          = "SELECT",
	SelectRaw       = "_SELECT_RAW_",
	SelectAvg       = "SELECT AVG(?)",
	SelectMin       = "SELECT MIN(?)",
	SelectMax       = "",
	SelectCount     = "",

	// # Join # //
	Join            = "JOIN",
	InnerJoin       = "INNER JOIN", // # EQUAL TO # Join
	LeftJoin        = "LEFT JOIN",
	RightJoin       = "RIGHT JOIN",
	CrossJoin       = "CROSS JOIN",
	FullJoin        = "FULL JOIN",
	LeftOuterJoin   = "LEFT OUTER JOIN", // # EQUAL TO # LeftJoin
	RightOuterJoin  = "RIGHT OUTER JOIN",// # EQUAL TO # RightOuterJoin,
	FullOuterJoin   = "FULL OUTER JOIN", // # EQUAL TO # FullOuterJoin,

	Union           = "UNION",
	UnionAll        = "UNION ALL",

	With            = "",
	Where           = "",
	WhereRaw        = "",
	WhereIn         = "",
	WhereNotIn      = "",
	Or              = "",
	OrWhere         = "",
	OrWhereIn       = "",
	OrWhereNotIn    = "",
	WhereBetween    = "",

	// # Group # //
	GroupStart      = "",
	OrGroupStart    = "",
	NotGroupStart   = "",
	OrNotGroupStart = "",
	GroupEnd        = "",

	// # XX - Like # //
	Like            = "",
	OrLike          = "",
	OrNotLike       = "",

	// XX - Having
	Having          = "",
	OrHaving        = "",

	// And
	And             = "AND",
	In              = "IN",
	As              = "AS",
	Distinct        = "DISTINCT",
	From            = "FROM",
	Set             = "SET",
	Drop            = "DROP",
	Delete          = "",
	Truncate        = "",
	EmptyTable      = "",
	Limit           = "LIMIT",
	OrderBy         = "ORDER BY"
}

/**
 * SQL Basic Commands
 */
export const QdSqlCmd = [
	QdSqlType.Create,
	QdSqlType.Insert,
	QdSqlType.Update,
	QdSqlType.Drop,
	QdSqlType.Delete
];

/**
 * SQL Table Join
 */
export const JoinTypes = [
	QdSqlType.Join,
	QdSqlType.InnerJoin,
	QdSqlType.LeftJoin,
	QdSqlType.RightJoin,
	QdSqlType.CrossJoin,
	QdSqlType.FullJoin,
	QdSqlType.LeftOuterJoin,
	QdSqlType.RightOuterJoin,
	QdSqlType.FullOuterJoin
]

export const isJoinType = (type: QdSqlType): boolean => {
	return type in JoinTypes;
}

/**
 *  SQL Grouping
 */
export const QdSqlGroup = [
	QdSqlType.GroupStart,
	QdSqlType.OrGroupStart,
	QdSqlType.NotGroupStart,
	QdSqlType.OrNotGroupStart,
	QdSqlType.GroupEnd,
]
