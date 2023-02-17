import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { QuizService } from '../../shared/services/quiz.service'
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-poin-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [QuizService],
  template: `
    <div class="container">
      <h2>Check Your Point</h2>
      <button
        (click)="checkPoint()"
        type="button"
        class="btn btn-outline-success"
      >
        LET ME SEE
      </button>
      <div *ngIf="status === 'jawabanmu kurang tepat'" class="banner">
        <h1>{{ status }}</h1>
        <p>Yu Belajar lagi</p>
      </div>
      <div *ngIf="status === 'jawabanmu benar'" class="bannersuccess">
        <h1>{{ status }}</h1>
      </div>
    </div>
  `,
  styles: [
    `
      .banner {
        background-image: url(../../../assets/image02.png);
        width: 100%;
        background-size: cover;
        margin-top: 20px;
        height: 450px;
        border-radius: 5px;
      }
      .bannersuccess {
        background-image: url(../../../assets/animasianak.jpg);
        width: 100%;
        background-size: cover;
        margin-top: 20px;
        height: 450px;
        border-radius: 5px;
      }
      button {
        color: black;
        font-size: 35;
      }
    `,
  ],
})
export class PoinPageComponent implements OnInit {
  data: any
  convertAnswer1: any
  answer2: any
  checkQuestion: any
  status?: string
  constructor(private quizeService: QuizService) {}

  ngOnInit(): void {
    this.quizeService.data$.subscribe((value: any) => {
      console.log(value)
    })
    const check = history.state.value
    const answer1: any = localStorage.getItem('jawaban')
    this.convertAnswer1 = JSON.parse(answer1)
    console.log(this.convertAnswer1)
    this.answer2 = check
    console.log(this.answer2)
    this.checkQuestion = check.dataSoal
    console.log(this.checkQuestion[0].correct)
  }

  checkPoint() {
    if (
      this.convertAnswer1.answer === this.checkQuestion[0].correct &&
      this.answer2.answer === this.checkQuestion[1].correct
    ) {
      console.log('jawabanmu benar')
      this.status = 'jawabanmu benar'
    } else {
      this.status = 'jawabanmu kurang tepat'
    }
  }
}
