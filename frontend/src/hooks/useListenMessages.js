import { useContext, useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { SocketContext } from "../context/SocketContext";

const useListenMessages = () => {
 
  const { messages, setMessages } = useConversation();
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
       newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
