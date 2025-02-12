import { useState, useEffect } from 'react';
import { Club } from '@crema/types/models/guest';
import { mockClubs } from '@crema/mockapi/apis/guest';

export default function FeatureClubs() {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    // Simulating API call with mock data
    setClubs(mockClubs);
  }, []);

  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Feature Clubs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {clubs.map(club => (
          <div key={club.id} className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={club.imageUrl}
              alt={club.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{club.name}</h3>
              <p className="text-gray-600">{club.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}