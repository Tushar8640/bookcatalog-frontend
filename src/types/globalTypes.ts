export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
  reviews: number;
  createdAt: string;
  updatedAt: string;
  description?: string;
}
