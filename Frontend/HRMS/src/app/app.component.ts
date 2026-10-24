import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor, NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Decorator
@Component({
  imports: [RouterOutlet, NgIf, NgFor, NgClass, NgStyle, FormsModule],
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
    {id: 1, name: 'stu1', mark: 49},
    {id: 2, name: 'stu2', mark: 88},
    {id: 3, name: 'stu3', mark: 56},
    {id: 4, name: 'stu4', mark: 32},
    {id: 5, name: 'stu5', mark: 98},
    {id: 6, name: 'stu6', mark: 66},
  ];


  images = [
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=2210&quality=70",
    "https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg",
    "https://images.pexels.com/photos/26151151/pexels-photo-26151151/free-photo-of-night-sky-filled-with-stars-reflecting-in-the-lake.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  ];
  currentIndex = 0; // Global Variable

  name="emp1";

  next(){
    let temp = 0; // Local Variable
    temp++;

    this.currentIndex++;
  }

  previous(){
    this.currentIndex--;
  }



  temp(x : number, y : boolean) : string{
    //let x : string = "ss";
   return "";
  }
}
