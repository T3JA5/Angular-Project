import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Employee } from './employee';
import { Observable, of, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = '/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${apiUrl}`)
      .pipe(
        tap(cases => console.log('fetched Employee')),
        catchError(this.handleError('getEmployee', []))
      );
  }

  getEmployeeById(id: string): Observable<Employee> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(_ => console.log(`fetched Employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployeeById id=${id}`))
    );
  }

  addEmployee(cases: Employee): Observable<Employee> {
    return this.http.post<Employee>(apiUrl, cases, httpOptions).pipe(
      tap((c: Employee) => console.log(`added Employee w/ id=${c._id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  updateEmployee(id: string, cases: Employee): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, cases, httpOptions).pipe(
      tap(_ => console.log(`updated Employee id=${id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  deleteEmployee(id: string): Observable<Employee> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Employee>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }


}


