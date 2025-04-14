import { useState, useEffect } from "react";
import { fetchMemes, updateMeme as apiUpdateMeme } from "../services/api";
import { PencilIcon } from "@heroicons/react/24/outline";
import MemeEditModal from "./MemeEditModal";

export default function MemeTable() {
  const [memes, setMemes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMemes = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMemes();
        setMemes(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching memes:", err);
        setError("Failed to load memes");
        setMemes([]);
      } finally {
        setIsLoading(false);
      }
    };

    getMemes();
  }, []);

  const handleEditClick = (meme) => {
    setSelectedMeme(meme);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedMeme) => {
    try {
      await apiUpdateMeme(updatedMeme.id, updatedMeme);
      setMemes((currentMemes) => currentMemes.map((meme) => (meme.id === updatedMeme.id ? updatedMeme : meme)));
    } catch (err) {}
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading memes...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image URL
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Likes
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {memes.map((meme) => (
            <tr key={meme.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meme.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{meme.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="max-w-xs truncate">{meme.image}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meme.likes}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEditClick(meme)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PencilIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMeme && (
        <MemeEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          meme={selectedMeme}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
