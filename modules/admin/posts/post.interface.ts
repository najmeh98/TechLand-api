export interface post {
  id: string;
  image: string | null;
  title: string;
  content: string | null;
  updatedAt: Date;
  published: boolean;
}

export interface findpost extends Omit<post, "published"> {
  createdAt: Date;
}

export interface adminpost {
  post: {
    id: string;
    image: string | null;
    updatedAt: Date;
    title: string;
    content: string | null;
    createdAt: Date;
    categoryId: string;
    category: {
      name: string;
    };
  }[];
}
