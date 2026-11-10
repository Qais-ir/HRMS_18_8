import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Employee } from '../../interfaces/employee.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationDialogComponent } from '../../shared-components/confirmation-dialog/confirmation-dialog.component';
import { EmployeesService } from '../../services/employees.service';
import { List } from '../../interfaces/list.interface';
import { DepartmentsService } from '../../services/departments.service';
import { LookupsService } from '../../services/lookups.service';
import { LookupsMajorCodes } from '../../enums/enums';
@Component({
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, ConfirmationDialogComponent],
  providers: [DatePipe],
  selector: 'app-employees',
  styleUrl: './employees.component.css',
  templateUrl: './employees.component.html',
})
export class EmployeesComponent {

  constructor(private _datePipe: DatePipe,
    private _cdr: ChangeDetectorRef,
    private _employeesService: EmployeesService,
    private _departmentsService: DepartmentsService,
    private _lookupsService: LookupsService
  ) {

  }

  // document.getElementById('closeModal')
  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  showConfirmDialog: boolean = false;
  employeeIdToBeDeleted: number | null = null;

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

  paginationConfig = { itemsPerPage: 5, currentPage: 1 };

  employees: Employee[] = [];

  departments: List[] = [];

  positions: List[] = [];

  managers: List[] = [];

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

  loadSaveDialog(employeeId?: number) {
    this.resetForm();
    this.loadManagersList(employeeId);
    this.loadDepartmentsList();
    this.loadPositionsList();
  }

  loadPositionsList() {

    this.positions = [
      { id: null, name: "Select Postion" }
    ];

    this._lookupsService.getByMajorCode(LookupsMajorCodes.EmployeePositions).subscribe({
      next: (res: any) => {
        if (res?.length > 0) {
          res.forEach((x: any) => {
            let poistion: List = { id: x.id, name: x.name };
            this.positions.push(poistion);
          });

          this._cdr.markForCheck();

        }
      },
      error: err => { // Failed
        alert(err.error?.message ?? err.error ?? err.message ?? "Unexpected Http Error");
      }
    })
  }

  loadDepartmentsList() {

    this.departments = [
      { id: null, name: "Select Department" }
    ];

    this._departmentsService.getDepartmentsList().subscribe({
      next: (res: any) => {
        if (res?.length > 0) {
          res.forEach((x: any) => {
            let department: List = { id: x.id, name: x.name };
            this.departments.push(department);
          });

          this._cdr.markForCheck();

        }
      },
      error: err => { // Failed
        alert(err.error?.message ?? err.error ?? err.message ?? "Unexpected Http Error");
      }
    })
  }

  loadManagersList(employeeId?: number) {

    this.managers = [
      { id: null, name: "Select Manager" }
    ];

    this._employeesService.getManagers(employeeId).subscribe({
      next: (res: any) => {
        if (res?.length > 0) {
          res.forEach((x: any) => {
            let manager: List = { id: x.id, name: x.name };
            this.managers.push(manager);
          });

          this._cdr.markForCheck();

        }
      },
      error: err => { // Failed
        alert(err.error?.message ?? err.error ?? err.message ?? "Unexpected Http Error");
      }
    })
  }

  loadEmployees() {

    this.employees = [];

    this._employeesService.getByCriteria().subscribe(
      {
        next: (res: any) => { // Successful
          if (res?.length > 0) {

            res.forEach((x: any) => {

              let employee: Employee = {
                id: x.id,
                firstName: x.firstName,
                lastName: x.lastName,
                phoneNumber: x.phoneNumber,
                birthDate: x.birthDate,
                isActive: x.isActive,
                startDate: x.startDate,
                endDate: x.endDate,
                positionId: x.positionId,
                positionName: x.positionName,
                departmentId: x.departmentId,
                departmentName: x.departmentName,
                managerId: x.managerId,
                managerName: x.managerName,
                userId: x.userId,
                email: x.email,
                salary: x.salary
              };

              this.employees.push(employee);
            })

            this._cdr.markForCheck();
          }
        },
        error: err => { // Failed
          alert(err.error?.message ?? err.error ?? err.message ?? "Unexpected Http Error");
        }
      }
    );
  }

  saveEmployee() {

    let emp: Employee = {
      id: this.employeeForm.value.id ?? 0,
      firstName: this.employeeForm.value.firstName,
      lastName: this.employeeForm.value.lastName,
      email: this.employeeForm.value.email,
      birthDate: this.employeeForm.value.birthDate,
      salary: this.employeeForm.value.salary,
      phoneNumber: this.employeeForm.value.phoneNumber,
      startDate: this.employeeForm.value.startDate,
      endDate: this.employeeForm.value.endDate,
      departmentId: this.employeeForm.value.departmentId,
      managerId: this.employeeForm.value.managerId,
      positionId: this.employeeForm.value.positionId,
      isActive: this.employeeForm.value.isActive
    };

    if (!this.employeeForm.value.id) { // Add
      this._employeesService.create(emp).subscribe(
        {
          next: (res: any) => { // Successful

            this.loadEmployees();
            this.closeModal?.nativeElement.click();
            this.resetForm();
          },
          error: err => { // Failed
            alert(err.error?.message ?? err.error ?? err.message ?? "Unexpected Http Error");
          }
        }
      );

    }
    else { // Update
      this._employeesService.update(emp).subscribe(
        {
          next: (res: any) => { // Successful

            this.loadEmployees();
            this.closeModal?.nativeElement.click();
            this.resetForm();
          },
          error: err => { // Failed
            alert(err.error?.message ?? err.error ?? err.message ?? "Unexpected Http Error");
          }
        }
      );
    }

  }


  resetForm() {
    this.employeeForm.reset({
      isActive: false
    });
  }

  loadEmployeeForm(id: number) {
    this.loadSaveDialog(id);

    this._employeesService.getById(id).subscribe({
      next: (employee: any) => {

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
      ,
      error: err => { // Failed
        alert(err.error?.message ?? err.error ?? err.message ?? "Unexpected Http Error");
      }
    })


  }


  removeEmployee(id: number | null) {

    //this.employees = this.employees.filter(x => x.id != id);

    if (!id) {
      return;
    }

    let index = this.employees.findIndex(x => x.id == id);
    this.employees.splice(index, 1);
  }

  changePage(pageNumber: number) {
    this.paginationConfig.currentPage = pageNumber;
  }


  displayConfirmDialog(empId: number) {
    this.employeeIdToBeDeleted = empId;
    this.showConfirmDialog = true;
  }

  confirmEmployeeDelete(isConfirmed: boolean) {

    if (isConfirmed) {
      this.removeEmployee(this.employeeIdToBeDeleted);
    }
    this.employeeIdToBeDeleted = null;
    this.showConfirmDialog = false;

  }
}
