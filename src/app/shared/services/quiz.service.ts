import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Quize } from '../model/quiz.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private dataQuestion = new BehaviorSubject('')
  data$ = this.dataQuestion.asObservable()
  constructor(private http: HttpClient) { }
  getDatQuize() : Observable<Quize>{
    return this.http.get<Quize>(`${environment.firebase}/data-quize.json`) as Observable<Quize>
  }
  postData(body: Quize): Observable<Quize>{
   return this.http.post(`${environment.firebase}/data-quize.json`, body) as Observable<Quize>
  }
  saveDataAnswer(body: any){
    return this.http.post(`${environment.firebase}/data-answer.json`, body)
  }
  shareData(data: any){
    return this.dataQuestion.next(data)
  }
}
