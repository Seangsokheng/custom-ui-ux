import Hero from './hero';
import FeatureClubs from './featureClub';

export default function App() {
  return (
    <div>
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-500">UniClub Zone</div>
          <div className="space-x-4">
            <button className="px-4 py-2">Login</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Register</button>
          </div>
        </nav>
      </header>
      <main>
        <Hero />
        <FeatureClubs />
        <section className="bg-blue-50 py-16 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Community?</h2>
          <p className="mb-8 max-w-2xl mx-auto text-gray-600">
            Join our vibrant community of students and discover new opportunities.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition">
            Become a Student
          </button>
        </section>
      </main>
    </div>
  );
}