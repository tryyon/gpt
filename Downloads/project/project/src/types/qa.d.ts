export interface QAItem {
  id?: string;
  question: string;
  answer: string;
  category: string;
  isPublished: boolean;
  isHighlighted: boolean;
  displayOrder: number;
}

export interface QAForm {
  id?: string;
  title: string;
  items: QAItem[];
  dateCreated?: Date;
  lastUpdated?: Date;
}

export interface QACategory {
  value: string;
  label: string;
}