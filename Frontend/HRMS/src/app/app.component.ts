import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
// Decorator
@Component({
  imports: [RouterOutlet, NgIf, NgFor],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class App {

  title = "Welcome to Angular From TypeScript";
  number = 256.5164;
  bool = true;
  arr = ["one",'two'];

  stu = {name: 'stu1', mark: 89};

  students = [
    {name: 'stu1', mark: 49},
    {name: 'stu2', mark: 88},
    {name: 'stu3', mark: 56},
    {name: 'stu4', mark: 32},
    {name: 'stu5', mark: 98},
    {name: 'stu6', mark: 66},
  ];


  temp(x : number, y : boolean) : string{
    //let x : string = "ss";
   return "";
  }
}
