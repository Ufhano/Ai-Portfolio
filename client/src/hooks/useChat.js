import {useState, useRef, useEffect} from 'react';
import {sendChatMessage} from '../services/chatApi';

export function useChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi  I’m Ufhano’s AI portfolio assistant.\n\nYou can ask me about his skills, experience, projects, or DevOps background  or click one of the suggestions below to get started.',
      createdAt: Date.now(),
    },
  ]);

  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages, loading]);

  const sendMessage = async (message) => {
    if (!message?.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      {role: 'user', content: message, createdAt: Date.now()},
    ]);

    setLoading(true);

    try {
      const reply = await sendChatMessage(message);

      // Artificial delay for realism
      await new Promise((resolve) => setTimeout(resolve, 600));

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: reply,
          createdAt: Date.now(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
          createdAt: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    bottomRef,
  };
}
