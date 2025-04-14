// Import axios for HTTP requests
import axios from "axios";

// Set API URL based on environment
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const fetchMemes = async () => {
  try {
    const response = await axios.get(`${API_URL}/memes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching memes:", error);
    throw error;
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

// Helper function to reset data to initial state
export const resetMemeData = async () => {
  try {
    const response = await axios.post(`${API_URL}/memes/reset`);
    return response.data;
  } catch (error) {
    console.error("Error resetting meme data:", error);
    throw error;
  }
};
