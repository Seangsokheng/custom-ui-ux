import Head from 'next/head';
import Hero from '@crema/components/guest/hero';
import FeatureClubs from '@crema/components/guest/featureClub'; 

export default function Home() {
  return (
    <>
      <Head>
        <title>UniClub Zone - Discover Your Passion</title>
        <meta name="description" content="Join university clubs and discover your passion" />
      </Head>
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
    </>
  );
}