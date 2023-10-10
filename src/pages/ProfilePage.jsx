const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`text-2xl ${
          i <= rating ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    );
  }
  return <div className="flex">{stars}</div>;
};

function ProfilePage() {
  const profilePicture =
    "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg";

  const user = {
    username: "John Doe",
    email: "johndoe@example.com",
  };

  const services = [
    {
      id: 1,
      title: "Graphic Design",
      description: "Professional graphic design services... more",
      price: "$200 per day",
    },
    {
      id: 2,
      title: "Web Development",
      description: "Custom website development... more",
      price: "$500 per day",
    },
  ];

  const ratings = [
    { id: 1, rating: 5, comment: "Great service!" },
    { id: 2, rating: 4, comment: "Very satisfied." },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-4">
      <div className="flex flex-col md:flex-row items-center space-x-8">
        <div
          style={{ backgroundImage: `url(${profilePicture})` }}
          className="h-40 w-40 rounded-full bg-center bg-cover mb-4"
        ></div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-semibold">{user.username}</h1>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold">Email</h2>
          <p className="text-gray-500">
            {user.email} <a href="/email-edit">Change</a>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold">Username</h2>
          <p className="text-gray-500">
            {user.username} <a href="/username-edit">Change</a>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold">Password</h2>
          <p className="text-gray-500">
            ****** <a href="/password-edit">Change</a>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Services Offered</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-500">{service.description}</p>
              <p className="text-gray-600">{service.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Ratings Sent</h2>
        <ul>
          {ratings.map((rating) => (
            <li key={rating.id} className="mt-2">
              <div className="text-gray-500">
                <RatingStars rating={rating.rating} />
              </div>
              <div className="text-gray-600">{rating.comment}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
