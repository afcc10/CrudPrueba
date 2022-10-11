import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../data-structures/interfaces/student';
import { BasicResponse } from '../data-structures/shared/basic-response';
import { catchError, retry } from 'rxjs/operators';
import { ENDPOINTS } from '../utils/commons/web-constants';
import { handleError } from '../utils/helpers/error-handler';

@Injectable({
  providedIn: 'root'
})
export class StudentApiService {

  constructor(private http: HttpClient) { }

  async getStudents() : Promise<Partial<BasicResponse<Student[]>>> {
    return await this.http.get<Partial<BasicResponse<Student[]>>>(ENDPOINTS.getStudents()).pipe(
      retry(1), 
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async registerStudent(student : Student):Promise<Partial<BasicResponse<Student>>>{    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(student);
    return await this.http.post<BasicResponse<Student>>(ENDPOINTS.registerStudent(),body,httpOptions).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async updateStudent(cliente : Student):Promise<Partial<BasicResponse<Student>>>{    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(cliente);
    return await this.http.put<BasicResponse<Student>>(ENDPOINTS.updateStudent(),body,httpOptions).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async getbyIdStudent(id : number): Promise<Partial<BasicResponse<Student>>>{    
    return await this.http.get<BasicResponse<Student>>(ENDPOINTS.getByIdStudent(id)).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async deleteById(id : number): Promise<Partial<BasicResponse<boolean>>>{    
    return await this.http.delete<BasicResponse<boolean>>(ENDPOINTS.deleteByIdStudent(id)).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }
}
