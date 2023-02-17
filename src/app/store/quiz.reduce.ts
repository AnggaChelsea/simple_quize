import { createReducer, on } from '@ngrx/store';
import { Question } from '../models/question.model';
import * as QuizActions from './quiz.actions';

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: { [questionId: number]: number };
}

export const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
};

export const quizReducer = createReducer(
  initialState,
  on(QuizActions.loadQuestionsSuccess, (state, { questions }) => ({
    ...state,
    questions,
  })),
  on(QuizActions.nextQuestion, (state) => ({
    ...state,
    currentQuestionIndex: state.currentQuestionIndex + 1,
  })),
  on(QuizActions.previousQuestion, (state) => ({
    ...state,
    currentQuestionIndex: state.currentQuestionIndex - 1,
  })),
  on(QuizActions.submitQuiz, (state, { answers }) => ({
    ...state,
    answers,
  }))
);
