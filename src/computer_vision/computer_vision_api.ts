import * as fs from 'fs';
import * as path from 'path';
import * as axios from 'axios';
import * as FormData from 'form-data';
import * as dotenv from 'dotenv';

dotenv.config();

// Ensure your .env file contains the correct URL
const endpoint = process.env.AZURE_COMPUTER_VISION_URL ?? '';
if (!endpoint) {
    console.error('Error: AZURE_COMPUTER_VISION_URL is not set in the environment variables.');
    process.exit(1);
}

// Ensure your .env file contains the correct API key
const apiKey = process.env.AZURE_COMPUTER_VISION_API_KEY ?? '';
if (!apiKey) {
    console.error('Error: AZURE_COMPUTER_VISION_API_KEY is not set in the environment variables.');
    process.exit(1);
}

// Define the paths to the input image and output file
const inputImagePath = path.resolve(__dirname, '../../src/computer_vision/test_image_1.png');
const outputFilePath = path.resolve(__dirname, '../../src/computer_vision/analysisResult.json');

// Function to analyze the image
async function analyzeImage() {
    try {
        // Check if the input image file exists
        if (!fs.existsSync(inputImagePath)) {
            throw new Error(`Input image file not found: ${inputImagePath}`);
        }

        // Read the image file
        const imageData = fs.createReadStream(inputImagePath);

        // Create a FormData object and append the image file
        const formData = new FormData();
        formData.append('file', imageData);

        // Update headers to include form boundary
        const formHeaders = formData.getHeaders();
        const combinedHeaders = {
            ...formHeaders,
            'Ocp-Apim-Subscription-Key': apiKey
        };

        // Make the API request
        const response = await axios.default.post(endpoint, formData, {
            headers: combinedHeaders
        });

        // Write the response to a file
        fs.writeFileSync(outputFilePath, JSON.stringify(response.data, null, 2));
        console.log('Analysis result saved to:', outputFilePath);
    } catch (error) {
        if (axios.default.isAxiosError(error)) {
            console.error('Error analyzing image:', error.message);
        } else {
            console.error('Error analyzing image:', error);
        }
    }
}

// Call the function
analyzeImage();
