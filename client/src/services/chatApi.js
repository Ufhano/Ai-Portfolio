import axios from 'axios';

const devApi = import.meta.env.DEV ? import.meta.env.VITE_API_URL : '';

export async function sendChatMessage(message, history = []) {
  const base = devApi ? devApi.replace(/\/$/, '') : '';
  const response = await axios.post(`${base}/api/chat`, {
    message,
    history,
  });

  return response.data.reply;
}
