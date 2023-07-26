import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pwa-poc';
  links = [
    {
      title: 'home',
      path: 'home'
    },
    {
      title: 'clients',
      path: 'clients'
    },
    {
      title: 'services',
      path: 'services'
    },
    {
      title: 'contracts',
      path: 'contracts'
    }
  ]

  constructor(private route: Router) {}

  get isNotAuth() {
    return this.route.url !== '/auth';
  }
}
