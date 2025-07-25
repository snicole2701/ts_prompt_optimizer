# Prompt Optimizer
Prompt Optimizer is a desktop productivity tool designed for refining and managing AI prompts. Built with Angular and wrapped in Electron, it runs natively across platforms and offers a fast, offline experience. The project aims to streamline prompt engineering workflows with a user-friendly interface and efficient packaging.

## Features
- Live editing and preview of prompts
- Runs offline with Angular frontend
- Packaged using Electron for cross-platform support
- Future plans include migrating to Tauri for better performance

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

## Known Issues
- Schema errors may occur if Angular CLI is installed globally but not locally
- Dev mode (electron:start) needs ng serve
- Blank screens often relate to incorrect build paths

## To Do
- Migrate to Tauri for improved performance
- Add splash screen and error fallback
- Enable saving prompt sets to local storage
- Consider auto-update feature
