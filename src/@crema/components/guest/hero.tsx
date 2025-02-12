export default function Hero() {
    return (
      <div className="flex flex-col md:flex-row items-center justify-between py-12 px-6 max-w-7xl mx-auto">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Passion</h1>
          <h2 className="text-3xl md:text-4xl text-blue-500 mb-6">Join a Club Today!</h2>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition">
            Join Now
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="/images/hero-image.jpg"
            alt="Happy students with sports equipment"
            className="rounded-lg w-full h-auto"
          />
        </div>
      </div>
    );
  }