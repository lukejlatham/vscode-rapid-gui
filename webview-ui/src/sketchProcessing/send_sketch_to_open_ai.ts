import axios from 'axios';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
const AZURE_OPENAI_API_ENDPOINT = process.env.AZURE_OPENAI_API_ENDPOINT;
const AZURE_OPENAI_API_MODEL = process.env.GPT4O_DEPLOYMENT_NAME;

console.log("AZURE_OPENAI_API_KEY:", AZURE_OPENAI_API_KEY);
console.log("AZURE_OPENAI_API_ENDPOINT:", AZURE_OPENAI_API_ENDPOINT);
console.log("AZURE_OPENAI_API_MODEL:", AZURE_OPENAI_API_MODEL);

if (!AZURE_OPENAI_API_KEY || !AZURE_OPENAI_API_ENDPOINT || !AZURE_OPENAI_API_MODEL) {
    console.error('One or more environment variables are missing. Please check your .env file.');
    process.exit(1);
}

async function callOpenAI(text:any) {
    try {
        const response = await axios.post(
            `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${AZURE_OPENAI_API_MODEL}/chat/completions?api-version=2024-02-01`,
            {
                messages: text,
                temperature: 0.0
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': AZURE_OPENAI_API_KEY
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error in callOpenAI:', error);
        throw error;
    }
}

// Send a test message and log the result
async function sendTestMessage() {
    const testMessages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Tell me a joke." }
    ];

    try {
        const result = await callOpenAI(testMessages);
        console.log("Response from OpenAI:", result);
    } catch (error) {
        console.error("Error calling OpenAI:", error);
    }
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
