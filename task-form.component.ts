import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.scss'],
  imports: [FormsModule, CommonModule]
})
export class TaskFormComponent {
  taskPurpose = '';
  sourceLanguage = '';
  outputLanguage = '';
  goalDescription = '';
  pastedCode = '';
  currentChunkIndex = 0;
  generatedPromptChunks: { label: string; body: string }[] = [];

  selectedFiles: { file: File; fromLine?: number; toLine?: number }[] = [];

  handleFileSelection(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files).map(file => ({ file }));
      const fileMap = new Map<string, { file: File }>();
      [...this.selectedFiles, ...newFiles].forEach(f => {
        fileMap.set(f.file.name, f);
      });
      this.selectedFiles = Array.from(fileMap.values());
      input.value = '';
    }
  }

  removeFile(fileName: string): void {
    this.selectedFiles = this.selectedFiles.filter(f => f.file.name !== fileName);
  }

  generatePrompt(): void {
    const chunkSize = 3000;
    const filePromises = this.selectedFiles.map(f => this.readFile(f));

    Promise.all(filePromises).then(fileContents => {
      const aiInstruction = `
💡 Instruction:
Please review the following structured context. Do not respond until all parts are provided.
Once complete, generate code suggestions, and annotate:
- What each suggestion achieves
- Where it must be inserted (which file + section)
Provide a complete and ready-to-use solution in the first response. Avoid partial snippets or placeholders—include full working code that directly achieves the described goal without requiring further revisions. Your response should be thorough, well-organized, and structured for immediate implementation.
`;

      const headerLines = [
        `📝 Task Purpose: ${this.taskPurpose}`,
        this.sourceLanguage ? `💻 Source Language: ${this.sourceLanguage}` : '',
        `🎯 Goal: ${this.goalDescription || 'No additional details provided.'}`,
        this.outputLanguage ? `🚀 Desired Output Language: ${this.outputLanguage}` : '',
        '',
        'Please structure suggestions accordingly.'
      ].filter(Boolean);

      const header = headerLines.join('\n');
      let rawPrompt = `${aiInstruction}\n\n${header}\n\n`;

      fileContents.forEach(({ name, content }) => {
        rawPrompt += `--- ${name} ---\n${content}\n\n`;
      });

      if (this.pastedCode.trim()) {
        rawPrompt += `--- Pasted Code ---\n${this.pastedCode.trim()}\n\n`;
      }

      const slicedChunks = this.slicePrompt(rawPrompt, chunkSize);
      this.generatedPromptChunks = slicedChunks;
      this.currentChunkIndex = 0;
      console.log('✅ Structured prompt parts:', slicedChunks);
    });
  }

  private readFile(item: { file: File; fromLine?: number; toLine?: number }): Promise<{ name: string; content: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        const lines = content.split('\n');
        const sliced = item.fromLine && item.toLine
          ? lines.slice(item.fromLine - 1, item.toLine).join('\n')
          : content;
        resolve({ name: item.file.name, content: sliced });
      };
      reader.onerror = () => {
        console.error(`❌ Failed to read file: ${item.file.name}`);
        reject(item.file.name);
      };
      reader.readAsText(item.file);
    });
  }

  private slicePrompt(raw: string, maxSize: number): { label: string; body: string }[] {
    const chunks: { label: string; body: string }[] = [];
    const lines = raw.split('\n');
    let part = 1;
    let current = '';

    for (const line of lines) {
      if ((current + line + '\n').length > maxSize) {
        chunks.push({
          label: `🧩 Structured Prompt Part ${part}`,
          body: current.trim() + `\n\nThis is part ${part}. More pieces are coming. Please wait until all parts are received.`
        });
        current = '';
        part++;
      }
      current += line + '\n';
    }

    if (current.trim()) {
      chunks.push({
        label: `🧩 Structured Prompt Part ${part}`,
        body: current.trim() + `\n\n✅ This is the final part. You may now provide code suggestions, placement notes, and explanation of what each change will accomplish. I expect the first response to contain ready-to-use code. Please don’t provide incremental steps or partial examples before the final solution.`
      });
    }

    return chunks;
  }

  copyPrompt(text: string): void {
    navigator.clipboard.writeText(text)
      .then(() => console.log('✅ Prompt copied to clipboard'))
      .catch(err => console.error('❌ Copy failed', err));
  }

  goToNextChunk(): void {
    if (this.currentChunkIndex < this.generatedPromptChunks.length - 1) {
      this.currentChunkIndex++;
    }
  }

  resetForm(): void {
    this.taskPurpose = '';
    this.sourceLanguage = '';
    this.outputLanguage = '';
    this.goalDescription = '';
    this.pastedCode = '';
    this.selectedFiles = [];
    this.generatedPromptChunks = [];
    this.currentChunkIndex = 0;
  }
}