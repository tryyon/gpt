export interface QAItem {
  id?: number;
  question: string;
  answer: string;
  category: string;
  isPublished: boolean;
  isHighlighted: boolean;
  displayOrder: number;
}

export interface QAForm {
  id?: number;
  title: string;
  items: QAItem[];
  dateCreated?: Date;
  lastUpdated?: Date;
}

export interface QACategory {
  value: string;
  label: string;
}