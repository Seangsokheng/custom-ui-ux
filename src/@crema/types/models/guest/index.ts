// types.ts
export interface Club {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  members?: number;
  category?: string;
  totalPosts?: number;
  logo?: string;
  vision?: string;
  mission?: string;
  goal?: string;
  contactInfo?: {
    email: string;
    phone: string;
    social: {
      facebook: string;
      instagram: string;
    }
  };
  gallery?: string[];
  posts?: Post[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  image?: string;
  author: {
    name: string;
    avatar: string;
  };
}