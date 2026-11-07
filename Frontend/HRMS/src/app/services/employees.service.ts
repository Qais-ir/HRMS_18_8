import { Service, Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Service()
//@Injectable()
export class EmployeesService {

    // constructor(private _http: HttpClient){

    // }

    private _http = inject(HttpClient);//new HttpClient();

    getByCriteria(){
        let params = new HttpParams();
        params = params.set('PositionId', '');
        params = params.set('Name', '');
        params = params.set('IsActive', '');

        return this._http.get("https://localhost:7290/api/Employees", {params});
    }

}
