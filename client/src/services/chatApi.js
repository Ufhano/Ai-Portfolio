import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function sendChatMessage(message, history = []) {
  const response = await axios.post(`${API_URL}/api/chat`, {
    message,
    history,
  });

  return response.data.reply;
}
