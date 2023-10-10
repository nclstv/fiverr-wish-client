function EmailEditForm() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold">Username Edit</h2>
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-semibold mb-2"
            htmlFor="newUsername"
          >
            New Username
          </label>
          <input
            type="text"
            id="newUsername"
            name="newUsername"
            className="w-full border-gray-300 rounded-lg p-2"
            placeholder="Enter your new username"
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
