import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchMemes = async () => {
  try {
    const response = await axios.get(`${API_URL}/memes`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching memes:", error);
    return [];
  }
};

export const fetchMeme = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/memes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching meme with id ${id}:`, error);
    throw error;
  }
};

export const updateMeme = async (id, updatedMeme) => {
  try {
    const response = await axios.put(`${API_URL}/memes/${id}`, updatedMeme);
    return response.data;
  } catch (error) {
    console.error(`Error updating meme with id ${id}:`, error);
    throw error;
  }
};
