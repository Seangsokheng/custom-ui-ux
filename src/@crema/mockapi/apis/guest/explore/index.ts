import { Club } from '@crema/types/models/guest';
const clubLogo = 'assets/images/guest/piubc.jpg';

// Mock data
 const clubsData: Club[] = [
  {
      id: 1,
      name: 'Football Club',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      members: 124,
      category: 'Sports',
      logo: clubLogo,
      imageUrl: ''
  },
  {
      id: 2,
      name: 'Basketball Club',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      members: 98,
      category: 'Sports',
      logo: clubLogo,
      imageUrl: ''
  },
  {
      id: 3,
      name: 'Chess Club',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      members: 45,
      category: 'Academic',
      logo: clubLogo,
      imageUrl: ''
  },
  {
      id: 4,
      name: 'Photography Club',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      members: 72,
      category: 'Arts',
      logo: clubLogo,
      imageUrl: ''
  },
  {
      id: 5,
      name: 'Debate Society',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      members: 56,
      category: 'Academic',
      logo: clubLogo,
      imageUrl: ''
  },
  {
      id: 6,
      name: 'Music Ensemble',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      members: 89,
      category: 'Arts',
      logo: clubLogo,
      imageUrl: ''
  },
  {
      id: 7,
      name: 'Volunteer Group',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      members: 115,
      category: 'Social',
      logo: clubLogo,
      imageUrl: ''
  },
  {
      id: 8,
      name: 'Science Club',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      members: 67,
      category: 'Academic',
      logo: clubLogo,
      imageUrl: ''
  },
  {
      id: 9,
      name: 'Dance Troupe',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      members: 82,
      category: 'Arts',
      logo: clubLogo,
      imageUrl: ''
  },
];

// Simulated API call with delay to mimic real network request
export const getClubs = (): Promise<Club[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clubsData);
    }, 500); // 500ms delay
  });
};

// Get a specific club by ID
export const getClubById = (clubId: number): Promise<Club> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const club = clubsData.find(club => club.id === clubId);
      if (club) {
        resolve(club);
      } else {
        reject(new Error('Club not found'));
      }
    }, 300);
  });
};