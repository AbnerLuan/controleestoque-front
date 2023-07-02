import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl:'app.component.html',
  styles: []
})
export class AppComponent {
  title = 'Controle de Estoque';
  showHeader: boolean;

  constructor(private router: Router) {
    this.showHeader = true;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.match(/^\/fiado(\/|$)/);
      }
    });
  }
}
