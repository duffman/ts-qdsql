"use strict";
/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-07 23:41
 */
exports.__esModule = true;
exports.splitKeyVal = exports.queryFLat = exports.isSimpleValue = void 0;
var sqlstring_1 = require("sqlstring");
var isSimpleValue = function (value) {
    return typeof value in ["string", "boolean", "number", "bigint"];
};
exports.isSimpleValue = isSimpleValue;
/**
 * Escape and join an array
 * @param {any[]} data
 * @param {boolean} inBrackets
 * @returns {string}
 */
var queryFLat = function (data, inBrackets) {
    if (inBrackets === void 0) { inBrackets = true; }
    var result = sqlstring_1["default"].format(Array.isArray(data) ? data.join(", ") : data);
    return (inBrackets) ? "(".concat(result, ")") : result;
};
exports.queryFLat = queryFLat;
/**
 * Split array containing {key: "value"} pairs
 * into 2 arrays, one for keys and one for values
 * @param value
 * @param flatten
 */
var splitKeyVal = function (value, flatten) {
    var colNames = new Array();
    var colValues = new Array();
    for (var key in value) {
        if (value.hasOwnProperty(key)) {
            colNames.push(sqlstring_1["default"].escape(key));
            colValues.push(sqlstring_1["default"].escape(value[key]));
        }
    }
    return [colNames, colValues];
};
exports.splitKeyVal = splitKeyVal;
