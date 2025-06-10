export interface Cell {
  value: string;
}

export interface Row {
  cells: Cell[];
}

export interface SizeChart {
  id?: number;
  title: string;
  description: string;
  categories: string[];
  columns: string[];
  rows: Row[];
  csvFile?: File;
  isActive: boolean;
  dateCreated?: Date;
}