# Prompt Optimizer
Prompt Optimizer is a desktop application built with Angular and Electron, designed to help developers and prompt engineers create high-quality prompts for AI systems. The tool ensures clarity, structure, and completeness—eliminating vague requests and improving AI output by guiding users through a context-rich prompt creation workflow.

## Features
- Form-based interface for capturing task goals, languages, and purpose
- File upload and code snippet support for structured context
- Dynamic chunking system for long prompts with clipboard-ready output
- Preview and navigation for multi-part prompt flows
- Offline-capable and cross-platform via Electron
- Built using Angular 20 with standalone components

## Supported Task Types
Prompt Optimizer helps structure prompts for:
- Code refactoring or optimization
- Function or feature generation
- Language translation (e.g. Python → JavaScript)
- Documentation and annotation of code
- Fixing bugs or implementing edge cases
- Generating ready-to-use code based on partial context

## Supported Source and Output Languages
Users can select from the following languages to guide the AI’s input context and expected output format:
- JavaScript
- TypeScript
- Python
- Java
- C#
- C++
- Ruby
- HTML
- PHP

## Prompt Generation Flow
- Set Task Context
Fill out fields such as task purpose, source language, output language, and goal description.
- Provide Code Inputs
Upload files or paste code snippets directly. The tool allows you to specify line ranges for partial files.
- Generate Prompt
Once code and metadata are provided, click “Generate Prompt.” The app creates a structured prompt with headings, context, and clear instructions.
- View & Edit Prompt Chunks
If the prompt exceeds size limits, it’s divided into labeled chunks:
- Each chunk includes a message that tells the AI to wait for all parts
- The final chunk triggers full response generation
- Copy and Paste to AI
Use the copy button to transfer each chunk into your preferred AI assistant (e.g. ChatGPT, Copilot, Claude). Make sure to paste all parts before asking for output.

## Tech Stack
Frontend: Angular 20
Desktop Shell: Electron 37
Build Tool: electron-builder
Styling: SCSS
OS: Windows 11

## Getting Started
- Install dependencies:
npm install
- Build Angular frontend:
ng build --base-href ./
Output should go to: dist/prompt-optimizer/browser
- Run in development mode:
npm run electron:start
- Create production build:
npm run electron:build
Find your installer in /dist_electron/ or your configured output path.

## Folder Structure
- src/: Angular source files
- dist/: Compiled Angular build
- main.js: Electron entry point
- package.json: Scripts and metadata
- angular.json: Angular CLI config

## Why Use This Tool
Vague prompts often result in poor AI feedback. Prompt Optimizer solves this by:
- Structuring inputs
- Providing file context
- Annotating intent and goals
- Delivering everything in an AI-friendly format

## To Do
- Migrate to Tauri for improved performance
- Add splash screen and error fallback
- Enable saving prompt sets to local storage
- Consider auto-update feature
