import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        {
          data:JSON.stringify({ message }),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      setMessages([...messages, res.data]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
