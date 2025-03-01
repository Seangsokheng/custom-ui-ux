// mockApi.ts
import { Club } from '@crema/types/models/guest';

export const mockClubData: Club = {
  id: 1,
  name: "Master Football Club",
  description: "football community",
  imageUrl: "/assets/images/clubDetail/1.png",
  members: 124,
  totalPosts: 124,
  logo: "/assets/images/guest/piubc.jpg",
  vision: "To build an inclusive community where students excel and lead through basketball.",
  mission: "To support athletic excellence, personal growth, and community engagement.",
  goal: "To nurture skilled, confident, and responsible individuals committed to teamwork and leadership.",
  contactInfo: {
    email: "Seangsokheng@gmail.com",
    phone: "+855 92935339",
    social: {
      facebook: "https://facebook.com/masterfootballclub",
      instagram: "https://instagram.com/masterfootballclub"
    }
  },
  gallery: [
    "/assets/images/clubDetail/2.jpg",
    "/assets/images/clubDetail/3.jpg",
    "/assets/images/clubDetail/4.jpg",
    "/assets/images/clubDetail/2.jpg",
    "/assets/images/clubDetail/3.jpg",
    "/assets/images/clubDetail/4.jpg",
  ],
  posts: [
    {
      id: 1,
      title: "Football Club",
      content: "This competition is free entrance. For those who is interested can register to secure your seat now!",
      date: "2025-03-20",
      image: "/assets/images/clubDetail/2.jpg",
      author: {
        name: "Admin",
        avatar: "/assets/images/clubDetail/4.jpg"
      }
    },
    {
      id: 2,
      title: "Football Club",
      content: "This competition is free entrance. For those who is interested can register to secure your seat now!",
      date: "2025-03-20",
      image: "/assets/images/clubDetail/2.jpg",
      author: {
        name: "Admin",
        avatar: "/assets/images/clubDetail/4.jpg"
      }
    },
    {
      id: 3,
      title: "Football Club",
      content: "This competition is free entrance. For those who is interested can register to secure your seat now!",
      date: "2025-03-20",
      image: "/assets/images/clubDetail/2.jpg",
      author: {
        name: "Admin",
        avatar: "/assets/images/clubDetail/4.jpg"
      }
    },
    {
      id: 4,
      title: "Football Club",
      content: "This competition is free entrance. For those who is interested can register to secure your seat now!",
      date: "2025-03-20",
      image: "/assets/images/clubDetail/2.jpg",
      author: {
        name: "Admin",
        avatar: "/assets/images/clubDetail/4.jpg"
      }
    },
    // Add more posts as needed
  ]
};

export const fetchClubDetails = async (id: number): Promise<Club> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClubData);
    }, 500);
  });
};