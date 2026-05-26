import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref,RouterLinkActive,RouterLink } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref,RouterLinkActive,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('app');
}
