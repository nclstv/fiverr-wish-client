function HomePage() {
  const profilePicture =
    "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg";
  return (
    <div className="w-full max-w-7xl m-auto py-4">
      <div className="bg-gray-100 rounded-3xl p-8 border border-gray-200 flex gap-4">
        <div
          style={{ backgroundImage: `url(${profilePicture})` }}
          className="h-14 w-14 rounded-full bg-center bg-cover"
        ></div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Premier Dog Sitting Services</h1>
          <h2 className="text-sm font-base text-gray-500">28km away - Paris</h2>
          <p className="mt-4 text-justify text-base">
            Welcome to Pawsitively Yours, where your furry friend's happiness is
            our top priority!
          </p>
          <h2 className="text-4xl font-bold mt-4 text-green-500">300$ / DAY</h2>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
