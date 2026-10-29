import { Component, signal } from '@angular/core';
import { EmployeesComponent } from './components/employees/employees.component';
// Decorator
@Component({
  // components, directives, pipes, module
  imports: [EmployeesComponent],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class App {

}
