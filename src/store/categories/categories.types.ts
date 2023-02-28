export enum CATEGORY_ACTION_TYPES {
  FETCH_CATEGORIES = "categories/FETCH_CATEGORIES",
  FETCH_CATEGORIES_SUCCESS = "categories/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "categories/FETCH_CATEGORIES_FAILED",
}

export type Categories = {
  title: string;
  imageUrl: string;
  items: Category[];
};

export type Category = {
  title: string;
  id: number;
  imageUrl: string;
  price: number;
};

export type CategoryMap = {
  [key: string]: Category[];
};