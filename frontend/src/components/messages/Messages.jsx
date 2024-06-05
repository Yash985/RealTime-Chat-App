import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages"
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message"
import useListenMessages from "../../hooks/useListenMessages";


const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages()
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    },100)
  },[messages])
  return (
    <div className="px-4 flex-1 overflow-auto relative">
      {loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}
      {!loading && messages.length === 0 && (<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-100">Send A Message To the Conversation</div>)}
      {!loading && messages.length>0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}><Message  messageData={ message} /></div>
     ))}
    </div>
  )
}

export default Messages