function HomePage() {
  const profilePicture =
    "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg";

  return (
    <div className="w-full max-w-7xl mx-auto py-4">
      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div
            style={{ backgroundImage: `url(${profilePicture})` }}
            className="h-40 w-full rounded-lg bg-center bg-cover mb-4"
          ></div>
          <h1 className="text-xl font-semibold">
            Premier Dog Sitting Services
          </h1>
          <p className="text-sm text-gray-500">28km away - Paris</p>
          <p className="text-2xl font-semibold mt-4 text-green-500">
            300$ / DAY
          </p>
          <p className="text-base">John Doe</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
