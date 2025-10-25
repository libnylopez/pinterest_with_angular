export interface Post {
  id?: string;            // id de Firebase (push key)
  title: string;
  description: string;
  imageUrl: string;
  createdAt: number;      // Date.now()
}
