export interface Category {
  Id: number;
  Name: string;
  Description: string;
}

export interface CategoryResponse {
  category: Category;
  success: boolean;
}

export interface CategoryListResponse {
  categories: Category[];
  success: boolean;
  totalCount: number;
}
