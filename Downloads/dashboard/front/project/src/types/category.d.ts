export interface Category {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  displayOrder: number;
  logo?: string | null;
  image?: string | null;
}

export interface RootCategory extends Category {
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface MainCategory extends Category {
  rootCategoryId: string;
}

export interface ChildCategory extends Category {
  rootCategoryId: string;
  mainCategoryId: string;
}