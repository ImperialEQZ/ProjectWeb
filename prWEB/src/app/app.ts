import { Component, signal } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';


@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Digital Market');

  constructor(public router: Router) {}

  // показывать ли показывать хедер/футер
  isAuthPage(): boolean {
    return this.router.url === '/auth';
  }
}
