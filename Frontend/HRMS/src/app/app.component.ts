import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// Decorator
@Component({
  // components, directives, pipes, module
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class App {

  constructor(private router : Router){

  }

  showNavBar(){
    return this.router.url !== '/login';
  }
}
