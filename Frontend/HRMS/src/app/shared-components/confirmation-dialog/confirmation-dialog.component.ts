import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-confirmation-dialog',
  styleUrl: './confirmation-dialog.component.css',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {

  @Input() title:string = "";
  @Input() body:string = "";

  @Output() confirm = new EventEmitter<boolean>();

  confirmDelete(isConfirmed:boolean){
    this.confirm.emit(isConfirmed);
  }
}
