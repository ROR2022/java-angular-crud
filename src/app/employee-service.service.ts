import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  baseUrl = 'http://localhost:8080/api/v1/employees';

  constructor(
    private http: HttpClient
  ) { }

  getEmployeesList(): Observable<Employee[]> {
    //console.log('getEmployeesList:..', this.baseUrl);
    return this.http.get<Employee[]>(`${this.baseUrl}`)
    .pipe(
      map((response: any) => {
        //console.log('response:..', response);
        return response;
      })
    );
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}`, employee)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
