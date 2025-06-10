export interface Item {
  description: string;
}

export interface Collection {
  id: number;
  title: string;
  items: Item[];
  dateCreated: Date;
  status: 'Enabled' | 'Disabled' | 'Archived';
}