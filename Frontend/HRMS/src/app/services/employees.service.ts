import { Service, Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee } from '../interfaces/employee.interface';

@Service()
//@Injectable()
export class EmployeesService {

    // constructor(private _http: HttpClient){

    // }

    private _http = inject(HttpClient);//new HttpClient();
    private apiUrl : string = "https://localhost:7290/api/Employees";

    getByCriteria(){
        let params = new HttpParams();
        params = params.set('PositionId', '');
        params = params.set('Name', '');
        params = params.set('IsActive', '');

        return this._http.get(this.apiUrl, {params});
    }

    getManagers(employeeId?: number){
        let params = new HttpParams();
        params = params.set("empId", employeeId ?? "");

        return this._http.get(this.apiUrl + "/managers-list", {params})
    }

    create(employee: Employee){
        return this._http.post(this.apiUrl, employee);
    }

    update(employee : Employee){
        return this._http.put(this.apiUrl + `/${employee.id}`, employee);
    }

    getById(id : number){
        return this._http.get(this.apiUrl + `/${id}`);
    }
}
