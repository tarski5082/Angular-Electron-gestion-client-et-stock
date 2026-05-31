import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref,RouterLinkActive,RouterLink } from '@angular/router';
import { Navcomponent } from './component/shared/navcomponent/navcomponent';

@Component({
  selector: 'app-root',
  imports: [Navcomponent,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('app');
}
