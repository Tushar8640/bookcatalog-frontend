export interface IReview {
  review: string;
  _id: string;
}

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
  reviews: IReview[];
  createdAt: string;
  updatedAt: string;
  description?: string;
  addedBy: string;
}
