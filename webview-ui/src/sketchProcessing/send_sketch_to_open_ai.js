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
var axios_1 = require("axios");
var dotenv = require("dotenv");
var path = require("path");
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
var AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
var AZURE_OPENAI_API_ENDPOINT = process.env.AZURE_OPENAI_API_ENDPOINT;
var AZURE_OPENAI_API_MODEL = process.env.GPT4O_DEPLOYMENT_NAME;
console.log("AZURE_OPENAI_API_KEY:", AZURE_OPENAI_API_KEY);
console.log("AZURE_OPENAI_API_ENDPOINT:", AZURE_OPENAI_API_ENDPOINT);
console.log("AZURE_OPENAI_API_MODEL:", AZURE_OPENAI_API_MODEL);
if (!AZURE_OPENAI_API_KEY || !AZURE_OPENAI_API_ENDPOINT || !AZURE_OPENAI_API_MODEL) {
    console.error('One or more environment variables are missing. Please check your .env file.');
    process.exit(1);
}
function callOpenAI(text) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("".concat(AZURE_OPENAI_API_ENDPOINT, "/openai/deployments/").concat(AZURE_OPENAI_API_MODEL, "/chat/completions?api-version=2024-02-01"), {
                            messages: text,
                            temperature: 0.0
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'api-key': AZURE_OPENAI_API_KEY
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data.choices[0].message.content];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error in callOpenAI:', error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Send a test message and log the result
function sendTestMessage() {
    return __awaiter(this, void 0, void 0, function () {
        var testMessages, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testMessages = [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: "Tell me a joke." }
                    ];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, callOpenAI(testMessages)];
                case 2:
                    result = _a.sent();
                    console.log("Response from OpenAI:", result);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error calling OpenAI:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Run the test
sendTestMessage();
// function encodeImage(imagePath: string) {
//     const image = fs.readFileSync(imagePath);
//     return Buffer.from(image).toString('base64');
// }
// const IMAGE_PATH = path.join(__dirname, './data/Car.jpg');
// const base64Image = encodeImage(IMAGE_PATH);
// async function callOpenAIJSON(text: any) {
//     const response = await axios.post(
//         `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${AZURE_OPENAI_API_MODEL}/chat/completions?api-version=2024-02-01`,
//         {
//             model: AZURE_OPENAI_API_MODEL,
//             response_format: { type: 'json_object' },
//             messages: text,
//             temperature: 0.0
//         },
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'api-key': AZURE_OPENAI_API_KEY
//             }
//         }
//     );
//     return response.data.choices[0].message.content;
// }
// async function getDVLAData(registrationPlate: string) {
//     const url = "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles";
//     const payload = { registrationNumber: registrationPlate };
//     const response = await axios.post(url, payload, {
//         headers: {
//             'x-api-key': DVLA_API_KEY,
//             'Content-Type': 'application/json'
//         }
//     });
//     return response.data;
// }
// (async () => {
//     const messages = [
//         { role: "system", content: "You are a helpful assistant that explains the car in the image to the user. Output a JSON object." },
//         {
//             role: "user", content: [
//                 { type: "text", text: "What is the make, model, colour, registration, body_type, features" },
//                 { type: "image_url", image_url: { url: `data:image/png;base64,${base64Image}` } }
//             ]
//         }
//     ];
//     const resultCar = await callOpenAIJSON(messages);
//     const resultCarJson = JSON.parse(resultCar);
//     const registrationPlate = resultCarJson.registration;
//     const dvlaData = await getDVLAData(registrationPlate);
//     const descriptionMessages = [
//         { role: "system", content: "You are a helpful assistant that provides a comprehensive natural language description of a car. Read all the information, merge it together, and then provide a clear description to the user." },
//         { role: "user", content: `${resultCar} ${JSON.stringify(dvlaData)}` }
//     ];
//     const description = await callOpenAI(descriptionMessages);
//     console.log(description);
//     const advertMessages = [
//         { role: "system", content: "You are a helpful assistant that writes the job advert for a car showroom. Read all the information, merge it together, and then provide a few paragraphs of descriptive sales text to be included for the car advert. Don't mention the car's registration plate." },
//         { role: "user", content: `${resultCar} ${JSON.stringify(dvlaData)}` }
//     ];
//     const advertDescription = await callOpenAI(advertMessages);
//     console.log(advertDescription);
// })();
