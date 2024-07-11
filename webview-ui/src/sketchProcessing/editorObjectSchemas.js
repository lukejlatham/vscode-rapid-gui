"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementSchema = exports.RootSchema = void 0;
var zod_1 = require("zod");
var ElementSchema = zod_1.z.lazy(function () {
    return zod_1.z.object({
        type: zod_1.z.enum(["Container", "Columns", "Column", "Rows", "Row", "Label", "Button"]),
        children: zod_1.z
            .record(zod_1.z.string(), zod_1.z.lazy(function () { return ElementSchema; }))
            .optional(),
        content: zod_1.z.string().optional(),
    });
});
exports.ElementSchema = ElementSchema;
var RootSchema = zod_1.z.object({
    type: zod_1.z.literal("Container"),
    children: zod_1.z.record(zod_1.z.string(), ElementSchema),
});
exports.RootSchema = RootSchema;
