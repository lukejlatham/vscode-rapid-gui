export function extractContent(rawAzureResponse: any): string {
  const content = rawAzureResponse.choices.map((choice: any) => choice.message.content).join("\n");
  return content;
}
