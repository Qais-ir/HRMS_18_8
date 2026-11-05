import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Employee } from '../../interfaces/employee.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationDialogComponent } from '../../shared-components/confirmation-dialog/confirmation-dialog.component';
@Component({
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, ConfirmationDialogComponent],
  providers: [DatePipe],
  selector: 'app-employees',
  styleUrl: './employees.component.css',
  templateUrl: './employees.component.html',
})
export class EmployeesComponent {

  constructor(private _datePipe: DatePipe) {

  }

  // document.getElementById('closeModal')
  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  showConfirmDialog: boolean = false;
  employeeIdToBeDeleted : number | null = null;

  deleteDialogTitle: string = "Employee Delete Confirmation";
  deleteDialogBody: string = "Are you sure you want to delete this employee?";

  employeesTableColumns: string[] = [
    "Name",
    "Position",
    "BirthDate",
    "Status",
    "Email",
    "Salary",
    "Department",
    "Manager"
  ];

  paginationConfig = { itemsPerPage: 5, currentPage: 1};

  employees: Employee[] = [
    {
      id: 1, firstName: "Emp", lastName: "1", birthDate: new Date(1995, 0, 1), email: 'Emp1@gmail.com',
      salary: 1000, startDate: new Date(), isActive: false, positionId: 3, positionName: "Manager", departmentId: 1
      , departmentName: "IT", userId: 1, phoneNumber: "+9624564845", managerId: null, managerName: null
    },
    {
      id: 2, firstName: "Emp", lastName: "2", birthDate: new Date(1995, 1, 1), startDate: new Date(),
      email: 'Emp2@gmail.com', salary: 1500, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 2,
      managerId: null, managerName: null
    },
    {
      id: 3, firstName: "Emp", lastName: "3", birthDate: new Date(1998, 5, 2), startDate: new Date(),
      email: 'Emp3@gmail.com', salary: 1800, isActive: true, phoneNumber: "+9625458852",
      positionId: 1, positionName: 'Developer', departmentId: 1, departmentName: 'IT', userId: 3,
      managerId: null, managerName: null
    },
    {
      id: 4, firstName: "Emp", lastName: "4", birthDate: new Date(1995, 1, 2), startDate: new Date(),
      email: 'Emp4@gmail.com', salary: 1200, isActive: false, phoneNumber: "+9625458852",
      positionId: 1, positionName: 'Developer', departmentId: 1, departmentName: 'IT', userId: 4,
      managerId: 3, managerName: "Emp 3"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
    ,
    {
      id: 5, firstName: "Emp", lastName: "5", birthDate: new Date(2001, 11, 25), startDate: new Date(),
      email: 'Emp5@gmail.com', salary: 800, isActive: true, phoneNumber: "+9625458852",
      positionId: 2, positionName: 'HR', departmentId: 2, departmentName: 'HR', userId: 5,
      managerId: 2, managerName: "Emp 2"
    }
  ];

  departments = [
    { id: null, name: 'Select Department' },
    { id: 1, name: 'IT' },
    { id: 2, name: 'HR' },
  ];

  positions = [
    { id: null, name: 'Select Position' },
    { id: 1, name: 'Developer' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'Manager' },
  ];

  managers = [
    { id: null, name: 'Select Manager' },
    { id: 1, name: 'Emp 1' },
    { id: 2, name: 'Emp 2' },
  ];

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    birthDate: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    salary: new FormControl(null),
    phoneNumber: new FormControl(null, [Validators.required]),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null),
    departmentId: new FormControl(null),
    positionId: new FormControl(null),
    managerId: new FormControl(null),
    isActive: new FormControl(false, [Validators.required]),
  });

  saveEmployee() {
    if (!this.employeeForm.value.id) { // Add
      let emp: Employee = {
        id: (this.employees[this.employees.length - 1]?.id ?? 0) + 1,
        firstName: this.employeeForm.value.firstName,
        lastName: this.employeeForm.value.lastName,
        email: this.employeeForm.value.email,
        birthDate: this.employeeForm.value.birthDate,
        salary: this.employeeForm.value.salary,
        phoneNumber: this.employeeForm.value.phoneNumber,
        startDate: this.employeeForm.value.startDate,
        endDate: this.employeeForm.value.endDate,
        departmentId: this.employeeForm.value.departmentId,
        departmentName: this.departments.find(x => x.id == this.employeeForm.value.departmentId)?.name,
        managerId: this.employeeForm.value.managerId,
        managerName: this.managers.find(x => x.id == this.employeeForm.value.managerId)?.name,
        positionId: this.employeeForm.value.positionId,
        positionName: this.positions.find(x => x.id == this.employeeForm.value.positionId)?.name,
        isActive: this.employeeForm.value.isActive

      };

      this.employees.push(emp);
      this.closeModal?.nativeElement.click();
      this.resetForm();
    }
    else { // Update

      let index = this.employees.findIndex(x => x.id == this.employeeForm.value.id);

      this.employees[index].firstName = this.employeeForm.value.firstName;
      this.employees[index].lastName = this.employeeForm.value.lastName;
      this.employees[index].email = this.employeeForm.value.email;
      this.employees[index].birthDate = this.employeeForm.value.birthDate;
      this.employees[index].salary = this.employeeForm.value.salary;
      this.employees[index].phoneNumber = this.employeeForm.value.phoneNumber;
      this.employees[index].startDate = this.employeeForm.value.startDate;
      this.employees[index].endDate = this.employeeForm.value.endDate;
      this.employees[index].departmentId = this.employeeForm.value.departmentId;
      this.employees[index].departmentName = this.departments.find(x => x.id == this.employeeForm.value.departmentId)?.name;
      this.employees[index].managerId = this.employeeForm.value.managerId;
      this.employees[index].managerName = this.managers.find(x => x.id == this.employeeForm.value.managerId)?.name;
      this.employees[index].positionId = this.employeeForm.value.positionId;
      this.employees[index].positionName = this.positions.find(x => x.id == this.employeeForm.value.positionId)?.name;
      this.employees[index].isActive = this.employeeForm.value.isActive;

      this.closeModal?.nativeElement.click();
      this.resetForm();

    }

  }


  resetForm() {
    this.employeeForm.reset({
      isActive: false
    });
  }

  loadEmployeeForm(id: number) {
    let employee = this.employees.find(x => x.id == id);

    if (employee) {

      this.employeeForm.patchValue({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        birthDate: this._datePipe.transform(employee.birthDate, 'yyyy-MM-dd'), // yyyy-MM-dd
        salary: employee.salary,
        isActive: employee.isActive,
        startDate: this._datePipe.transform(employee.startDate, 'yyyy-MM-dd'),
        endDate: this._datePipe.transform(employee.endDate, 'yyyy-MM-dd'),
        positionId: employee.positionId,
        departmentId: employee.departmentId,
        managerId: employee.managerId,
        phoneNumber: employee.phoneNumber
      })
    }

  }


  removeEmployee(id:number|null){

    //this.employees = this.employees.filter(x => x.id != id);

    if(!id){
      return;
    }

    let index = this.employees.findIndex(x => x.id == id);
    this.employees.splice(index, 1);
  }

  changePage(pageNumber : number){
    this.paginationConfig.currentPage = pageNumber;
  }


  displayConfirmDialog(empId : number){
    this.employeeIdToBeDeleted = empId;
    this.showConfirmDialog = true;
  }

  confirmEmployeeDelete(isConfirmed: boolean){

    if(isConfirmed){
      this.removeEmployee(this.employeeIdToBeDeleted);
    }
  this.employeeIdToBeDeleted = null;
  this.showConfirmDialog = false;

  }
}
