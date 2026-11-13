import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Department } from '../interfaces/department.interface';

@Service()
export class DepartmentsService {

    private _http = inject(HttpClient); // new HttpClient
    private apiUrl = 'https://localhost:7290/api/Departments';

    getDepartmentsList() {
        return this._http.get(this.apiUrl + "/departments-list");
    }

    getByCriteria(searchObj: any) {
        let params = new HttpParams();
        params = params.set("Name", searchObj.departmentName ?? "");
        params = params.set("FloorNumber", searchObj.floorNumber ?? "");

        return this._http.get(this.apiUrl , { params });
    }

    add(department: Department) {
        return this._http.post(this.apiUrl , department);
    }

    update(department: Department) {

        return this._http.put(this.apiUrl + `/${department.id}`, department);
    }

    delete(id: number) {
        return this._http.delete(this.apiUrl + `/${id}`);
    }

    getById(id: number) {
        return this._http.get(this.apiUrl + `/${id}`);
    }
}