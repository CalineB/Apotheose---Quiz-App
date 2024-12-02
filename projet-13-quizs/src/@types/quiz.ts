export interface IQuiz {
  id: number;
  name: string;
  slug?: string;
  tag: string | number;
  level: string | number;
  questions: IQuestion[];
}

export interface IFiltre {
  id: number;
  name: string;
}

export interface IQuestion {
  id: number;
  description: string;
  answers: IAnswer[];
}
export interface IAnswer {
  id: number;
  description: string;
  is_good_answer: boolean;
}

export interface IListQuiz {
  id: number;
  name: string;
  slug?: string;
  tag_id: number | string;
  level_id: number | string;
  played: number;
}
export interface ICreateQuiz {
  name: string;
  tag: number | string;
  level: number | string;
  question: ICreateQuestion[];
}
export interface ICreateQuestion {
  id: number;
  description: string;
  answers: { description: string; isgoodanswer: boolean }[];
}

export interface IHistory {
  id: number;
  score: number;
  max_score: number;
  quiz_id: number;
}
