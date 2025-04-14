import { useState, useEffect } from "react";
import { updateMeme as apiUpdateMeme } from "../services/api";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function MemeEditModal({ isOpen, onClose, meme, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    likes: 0,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (meme) {
      setFormData({
        name: meme.name,
        image: meme.image,
        likes: meme.likes,
      });
      setErrors({});
    }
  }, [meme]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 3 || formData.name.length > 100) {
      newErrors.name = "Name must be between 3 and 100 characters";
    }

    if (!formData.image) {
      newErrors.image = "Image URL is required";
    } else {
      try {
        new URL(formData.image);
      } catch (e) {
        newErrors.image = "Invalid URL format";
      }
    }

    const likesNum = parseInt(formData.likes, 10);
    if (isNaN(likesNum) || likesNum < 0 || likesNum > 99) {
      newErrors.likes = "Likes must be a number between 0 and 99";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "likes" ? (value === "" ? "" : parseInt(value, 10) || 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const updatedMeme = {
          ...meme,
          ...formData,
        };

        await apiUpdateMeme(meme.id, updatedMeme);

        if (onUpdate) {
          onUpdate(updatedMeme);
        }

        onClose();
      } catch (error) {
        // Silent fail
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Meme</h3>
              <button
                onClick={onClose}
                type="button"
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-3 space-y-4">
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                  ID
                </label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  value={meme.id}
                  readOnly
                  style={{ background: "white" }}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ background: "white" }}
                  className={`mt-1 block w-full py-2 px-3 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={formData.image}
                  onChange={handleChange}
                  style={{ background: "white" }}
                  className={`mt-1 block w-full py-2 px-3 border ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black`}
                />
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
              </div>

              <div>
                <label htmlFor="likes" className="block text-sm font-medium text-gray-700">
                  Likes
                </label>
                <input
                  type="number"
                  name="likes"
                  id="likes"
                  min="0"
                  max="99"
                  style={{ background: "white" }}
                  value={formData.likes}
                  onChange={handleChange}
                  className={`mt-1 block w-full py-2 px-3 border ${
                    errors.likes ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black`}
                />
                {errors.likes && <p className="mt-1 text-sm text-red-600">{errors.likes}</p>}
              </div>
            </form>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                isSubmitting ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
              } text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
