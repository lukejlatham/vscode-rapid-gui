# Sketch Processing

This folder contains the core functionality for processing sketches and converting them into UI layouts.

## Key Components

### processSketchLayout.ts
- Main entry point for sketch processing
- Uses Azure OpenAI to generate a UI description from a sketch
- Converts the generated layout to a full node tree

### editorObjectSchemas.ts
- Defines Zod schemas for UI elements and layout structure
- Provides prompts and examples for AI-generated layouts

### layoutCraftTreeConverter.ts
- Converts simplified node structures to full node trees
- Adds default properties for various UI elements

## Current Flow

1. `_setWebviewMessageListener` in `MainWebviewPanel.ts` recieves `processSketchLayout` message with base64 encoded image
2. `processSketch` function in `processSketchLayout.ts` is called
3. The sketch is sent via instructor (https://js.useinstructor.com) variant of Azure OpenAI API to generate a JSON UI layout
   -  https://platform.openai.com/docs/guides/vision?lang=curl 
   -  Instructor uses in-built openai tools to generate based on schemas in `editorObjectSchemas.ts`
   -  It validates results against these schemas and retries if incorrect
   -  It also gives meta cost in tokens in reponse (around 1000-2000 is normal for now, if it gets 10x higher you have likely sent image as text)
4. The validated layout is converted to a full node tree using `layoutCraftTreeConverter.ts`
5. The resulting full description is returned as a JSON string and `sketchProcessed` message posted to webview

## TODOS

1. Get UI description from image first before attempting to generate full layout - describe in terms of columns and rows for now
   - Might not require instructor at this stage
   - https://www.promptingguide.ai/techniques/react
2. Direct generation from description
3. Move prompts to seperate file from schemas (maybe incorporate into relevant processing files)
4. Correct node tree processing (currently looks right but doesn't load)
5. Connect produced tree to editor 
   - probably creating file in current folder and immediately loading editor with it 
   - look at `saveButton` and `loadButton`
6. Add styling manipulation as seperate step - might require editor updates?
7. Apply fluent ui rules to intial description: https://en.wikipedia.org/wiki/Fluent_Design_System
8. Update components to say what its doing at each stage (e.g. generating design, refining design, generating layout etc)
9. Process uploaded image before sending to avoid sending large files

