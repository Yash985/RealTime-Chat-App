import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/exactTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ messageData }) => {
  const { authUser } = useAuthContext();

  const { selectedConversation } = useConversation();
  const fromMe = messageData.senderId === authUser._id;
  const formattedTime = extractTime(messageData.createdAt);

  const chatClassName = fromMe ? "chat chat-end" : "chat chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const BubbleBgColor = fromMe ? "bg-lime-600" : "bg-gray-600";
  const ShakeClass=messageData.shouldShake ? "shake" : "";
  return (
    <div className={`${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="avatar" />
        </div>
      </div>
      {messageData ? (
        <>
          <div
            className={`chat-bubble text-white  ${BubbleBgColor} ${ShakeClass} pb-2`}
          >
            {messageData.message}
          </div>
          <div className="chat-footer text-gray-100 opacity-50 text-xs flex gap-1 items-center">
            {formattedTime}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Message;
