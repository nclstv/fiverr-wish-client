function EmailEditForm() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold">Password Edit</h2>
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-semibold mb-2"
            htmlFor="currentPassword"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className="w-full border-gray-300 rounded-lg p-2"
            placeholder="Enter your current password"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-semibold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-full border-gray-300 rounded-lg p-2"
            placeholder="Enter your new password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EmailEditForm;
