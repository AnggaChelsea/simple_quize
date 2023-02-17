export interface Quize {
  description:string,
  answer: string,
  option: [
    {
      label: string,
      value: string
    }
  ]
}


export interface Question {
  id: number;
  text: string;
  options: Option[];
  selectedOption: number;
}

export interface Option {
  id: number;
  text: string;
}
