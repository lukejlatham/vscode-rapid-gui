"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var instructor_1 = require("@instructor-ai/instructor");
var openai_1 = require("openai");
var dotenv = require("dotenv");
var editorObjectSchemas_1 = require("./editorObjectSchemas");
// Load environment variables from .env file
dotenv.config();
if (!process.env.AZURE_OPENAI_API_KEY) {
    throw new Error("AZURE_OPENAI_API_KEY is not set");
}
if (!process.env.AZURE_OPENAI_API_ENDPOINT) {
    throw new Error("AZURE_OPENAI_API_ENDPOINT is not set");
}
if (!process.env.GPT4O_DEPLOYMENT_NAME) {
    throw new Error("GPT4O_DEPLOYMENT_NAME is not set");
}
var AZURE_OPENAI_API_ENDPOINT = process.env.AZURE_OPENAI_API_ENDPOINT;
var AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
var GPT4O_DEPLOYMENT_NAME = process.env.GPT4O_DEPLOYMENT_NAME;
console.log("AZURE_OPENAI_API_ENDPOINT:", AZURE_OPENAI_API_ENDPOINT);
console.log("AZURE_OPENAI_API_KEY:", AZURE_OPENAI_API_KEY);
console.log("GPT4O_DEPLOYMENT_NAME:", GPT4O_DEPLOYMENT_NAME);
console.log("Full URL:", "".concat(AZURE_OPENAI_API_ENDPOINT, "/openai/deployments/").concat(GPT4O_DEPLOYMENT_NAME, "/chat/completions?api-version=2024-02-01"));
// Create a function to set up the Azure OpenAI client and extract layout information
function extractLayout(userDescription) {
    return __awaiter(this, void 0, void 0, function () {
        var client, instructor, layout, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new openai_1.AzureOpenAI({
                        apiVersion: "2024-06-01",
                        baseURL: "".concat(AZURE_OPENAI_API_ENDPOINT, "/openai/deployments/").concat(GPT4O_DEPLOYMENT_NAME),
                        apiKey: AZURE_OPENAI_API_KEY,
                    });
                    instructor = (0, instructor_1.default)({
                        client: client,
                        mode: "TOOLS",
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, instructor.chat.completions.create({
                            model: GPT4O_DEPLOYMENT_NAME,
                            messages: [
                                {
                                    role: "system",
                                    content: "You are a layout generator. Your task is to create a JSON object representing a layout based on the user's description. Use the following element types: Container, Columns, Column, Rows, Row, Label, and Button. Each element should have a 'type' property and a 'children' property (except for Label and Button). The 'children' property should be an object where keys are unique identifiers and values are child elements.",
                                },
                                { role: "user", content: userDescription },
                            ],
                            response_model: {
                                schema: editorObjectSchemas_1.HierarchySchema,
                                name: "Layout",
                            },
                            max_retries: 1,
                        })];
                case 2:
                    layout = _a.sent();
                    return [2 /*return*/, layout];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error extracting layout:", error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Example usage
var userDescription = "Create a layout for a simple settings page.";
extractLayout(userDescription)
    .then(function (layout) { return console.log("Extracted layout:", JSON.stringify(layout, null, 2)); })
    .catch(function (error) { return console.error("Error extracting layout:", error); });
