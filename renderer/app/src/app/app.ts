import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileForm } from './component/profile/profile-form/profile-form';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ProfileForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('app');
}
