import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class DepartmentsService {

    private _http = inject(HttpClient);//new HttpClient();
    private apiUrl : string = "https://localhost:7290/api/Departments";

    getDepartmentsList(){
        return this._http.get(this.apiUrl + "/departments-list");
    }
}
