import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { QuizService } from '../../shared/services/quiz.service'
import { HttpClientModule } from '@angular/common/http'
import { Quize } from 'src/app/shared/model/quiz.model'
import { map } from 'rxjs'
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms'
import { Question } from '../../shared/model/quiz.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  providers: [QuizService],
  template: `
    <div class="container">
      <div class="banner"></div>
      <div class="head-line">
        <h3>Hi I Have Question For u!</h3>
        <p>Please complete this question</p>
      </div>
      <div>
        <form #form="ngForm" (ngSubmit)="sendAnswer(form)">
          <div *ngIf="state <=0" class="radiogroup html">
            <div class="wrapper">
              <h3 class="mb-4">{{ dataQuestion[0].description }}</h3>
              <div *ngFor="let option of dataQuestion[0].answer">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    ngModel
                    name="answer"
                    [value]="option.id"
                    id="{{ option.text }}"
                    (change)="onItemChange(option.id)"
                    [ngModelOptions]="{ standalone: true }"
                  />
                  <label class="form-check-label" for="{{ option.name }}}">
                    {{ option.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="state >= 1" class="radiogroup html">
            <div class="wrapper">
              <h3 class="mb-4">{{ dataQuestion[1].description }}</h3>
              <div *ngFor="let option of dataQuestion[1].answer">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    ngModel
                    name="answer"
                    [value]="option.id"
                    id="{{ option.text }}"
                    (change)="onItemChange(option.id)"
                    [ngModelOptions]="{ standalone: true }"
                  />
                  <label class="form-check-label" for="{{ option.name }}}">
                    {{ option.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button *ngIf="state >= 1" class="btn btn-primary btn-save" type="button" (click)="checkPoint()" >
        Check Point
      </button>
        </form>
      </div>
      <button (click)="doNext()" *ngIf="state <= 0" class="btn btn-primary btn-save" type="submit" >
        Next
      </button>

    </div>
  `,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  dataQuestion: any
  state = 0
  answerOption: any[] = []
  selectedValue?: string
  question: Question[] = []
  selectedOption: any
  dataAnswer: any
  constructor(private serviceQuize: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.doGetData()
    console.log(this.selectedOption)
  }

  doGetData() {
    this.serviceQuize
      .getDatQuize()
      .pipe(
        map((item: any) => {
          const dataArr = []
          for (let key in item) {
            dataArr.push({ ...item[key], id: key })
          }
          return dataArr
        }),
      )
      .subscribe((value: any) => {
        console.log(value)
        this.dataQuestion = value;
        this.serviceQuize.shareData(this.dataQuestion)
      })
  }

  doNext(){
    this.serviceQuize.shareData(this.dataQuestion)
    this.state++
    const datajawab = {
      soal: this.state,
      answer: this.dataAnswer
    }
    localStorage.setItem('jawaban', JSON.stringify(datajawab))
  }

  sendAnswer(form: NgForm) {
    const selected = {
      answer: form.value.id,
    }
    console.log(selected)
    this.serviceQuize.saveDataAnswer(this.dataAnswer).subscribe((value: any) => {
      console.log(value)
    })
  }

  onItemChange(event: any) {
    console.log(event)
    this.dataAnswer = event
    for (let i = 0; i < this.dataQuestion.length; i++) {
      const selectedOption = this.dataQuestion[i].selectedOption;
      console.log(`Selected ${selectedOption}`);
    }

    const dataBody = {
      answer: this.dataAnswer,
    }

    // console.log(this.dataAnswer)
  }
  doCreateData() {
    const dataquiz: any = {

      selectedOption: 0,
    }

    this.serviceQuize.postData(dataquiz).subscribe((value: any) => {
      console.log(value)
      this.doGetData()
    })
  }

  checkPoint(){
    this.state++
    const data = {
      dataSoal: this.dataQuestion,
      soal: this.state,
      answer: this.dataAnswer
    }
    this.router.navigate(['point-page'], {
      state: {value: data}
    })
  }
}
