import { useState, useEffect } from "react";
import { fetchMemes } from "../services/api";

export default function MemeList() {
  const [memes, setMemes] = useState([]);
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

  if (isLoading) {
    return <div className="text-center py-10">Loading memes...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {memes.map((meme) => (
        <div key={meme.id} className="bg-white rounded-lg shadow overflow-hidden">
          <img
            src={meme.image}
            alt={meme.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
            }}
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-black">{meme.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-black">❤️ {meme.likes} likes</span>
              {meme.url ? (
                <a
                  href={meme.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-black hover:text-indigo-800"
                >
                  View source
                </a>
              ) : (
                <span className="text-sm text-gray-400">No source</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
