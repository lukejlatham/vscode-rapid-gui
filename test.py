import requests

# Test the Root Endpoint
response = requests.get('http://127.0.0.1:8000/')
print(response.json())  # Should print the welcome message

# Test the Generate Endpoint with POST method
data = {
    "prompt": "generate an example xaml file",
    "max_length": 50,
    "temperature": 0.7,
    "do_sample": False
}
response = requests.post('http://127.0.0.1:8000/generate', json=data)
print(response.json())  # Should print the generated text
