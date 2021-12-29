"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var generateArr = function (min, max, startingValue) {
    if (min > max)
        throw new Error('min cannot be greater then max');
    if (startingValue > max || startingValue < min)
        throw new Error('starting value not in array boundaries');
    return __spreadArray([], Array(Math.floor((max - min) / 1) + 1), true).map(function (_, i) { return min + i * 1; });
};
exports.default = generateArr;
