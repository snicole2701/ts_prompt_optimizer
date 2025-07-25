import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskFormComponent } from './task-form/task-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskFormComponent],
  templateUrl: './app.html',
})


export class App {
  protected readonly title = signal('promptpilot');
}
