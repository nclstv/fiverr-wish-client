function EmailEditForm() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold">Email Edit</h2>
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-semibold mb-2"
            htmlFor="newEmail"
          >
            New Email
          </label>
          <input
            type="email"
            id="newEmail"
            name="newEmail"
            className="w-full border-gray-300 rounded-lg p-2"
            placeholder="Enter your new email address"
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
