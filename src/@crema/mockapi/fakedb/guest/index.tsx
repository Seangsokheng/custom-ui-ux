import { Club } from '@crema/types/models/guest';

export const mockClubs: Club[] = [
  {
    id: 1,
    name: 'Basketball Club',
    description: 'Join our basketball club to develop your skills and compete in local tournaments.',
    imageUrl: 'assets/images/guest/basketball.jpg', // Corrected path
  },
  {
    id: 2,
    name: 'Football Club',
    description: 'Experience the thrill of football with our professional coaches and weekly matches.',
    imageUrl: 'assets/images/guest/football.jpg',
  },
  {
    id: 3,
    name: 'Volleyball Club',
    description: 'Learn volleyball fundamentals and advanced techniques in a fun environment.',
    imageUrl: 'assets/images/guest/volleyball.jpg',
  },
];