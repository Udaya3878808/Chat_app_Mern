import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extracTime";
const Message = ({message}) => {
  const { authUser } = useContext(AuthContext);
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt)
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shekeClass = message.shouldshake ? "shake" :""
 
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind css chat bubble compontent" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shekeClass} pb-2`}>
        {message.message}
      </div>
      <div className={"chat-foote opacity-50 text-xs flex gap-1 items-center"}>
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
