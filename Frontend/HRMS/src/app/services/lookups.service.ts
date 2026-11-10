import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class LookupsService {
    
    private _http = inject(HttpClient);//new HttpClient();
    private apiUrl : string = "https://localhost:7290/api/Lookups";

    getByMajorCode(majorCode: number){
        let params = new HttpParams();
        params = params.set("majorCode", majorCode);

        return this._http.get(this.apiUrl , {params});
    }

}
