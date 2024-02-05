export function FileUpload({ setOpenModal }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <button
        className="absolute top-2 right-2 text-white"
        onClick={() => setOpenModal(false)}
      >
        X
      </button>

      <input type="file" name="upload" id="image" className="hidden" />

      <label htmlFor="image" className="cursor-pointer">
        <div className="p-4 bg-slate-700 text-white text-center cursor-pointer">
          <p className="mt-2">Click To Upload</p>
        </div>
      </label>

      <div className="mt-4">
        <label htmlFor="Title" className="text-white">
          Title
        </label>
        <input
          type="text"
          name="Title"
          id="Title"
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="Description" className="text-white">
          Description
        </label>
        <textarea
          name="Description"
          id="Description"
          cols="30"
          rows="5"
          className="w-full p-2 border rounded mt-1"
        ></textarea>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 mr-2"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </button>
        <button className="bg-green-500 text-white px-4 py-2">Submit</button>
      </div>
    </div>
  );
}
