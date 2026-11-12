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

    getByCriteria(searchObj : any){
        let params = new HttpParams();
        params = params.set('PositionId', searchObj.positionId ?? '');
        params = params.set('Name', searchObj.name ?? '');
        params = params.set('IsActive',searchObj.isActive ?? '');

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

    delete(id : number){
        return this._http.delete(this.apiUrl + `/${id}`);
    }
}
