import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";

/**
 * TODO: Backend Integration
 * 
 * GET /api/chat/:connectionId/messages - Load chat history
 * POST /api/chat/:connectionId/messages - Send new message
 * 
 * WebSocket Events:
 *   - 'joinChat' - Join a chat room with targetUserId
 *   - 'sendMessage' - Emit message to target user
 *   - 'messageReceived' - Listen for incoming messages
 * 
 * See utils/socket.js for WebSocket connection setup
 */

// Dummy chat messages
const dummyChatMessages = [
  {
    firstName: "Alex",
    lastName: "Rodriguez",
    text: "Hey! How are you doing?"
  },
  {
    firstName: "Demo",
    lastName: "User",
    text: "I'm doing great! How about you?"
  },
  {
    firstName: "Alex",
    lastName: "Rodriguez",
    text: "Pretty good! Working on an exciting new project."
  }
];

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState(dummyChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    // Using dummy data for now
    setMessages(dummyChatMessages);
    
    // Uncomment below to use real API
    // const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
    //   withCredentials: true,
    // });
    // const chatMessages = chat?.data?.messages.map((msg) => {
    //   const { senderId, text } = msg;
    //   return {
    //     firstName: senderId?.firstName,
    //     lastName: senderId?.lastName,
    //     text,
    //   };
    // });
    // setMessages(chatMessages);
  };
  
  useEffect(() => {
    fetchChatMessages();
  }, []);

  // Uncomment below to use real socket connection
  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   const socket = createSocketConnection();
  //   socket.emit("joinChat", {
  //     firstName: user.firstName,
  //     userId,
  //     targetUserId,
  //   });
  //   socket.on("messageReceived", ({ firstName, lastName, text }) => {
  //     console.log(firstName + " :  " + text);
  //     setMessages((messages) => [...messages, { firstName, lastName, text }]);
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [userId, targetUserId]);

  const sendMessage = () => {
    // Using dummy approach - just add to local messages
    if (newMessage.trim() && user) {
      setMessages([...messages, {
        firstName: user.firstName,
        lastName: user.lastName,
        text: newMessage
      }]);
      setNewMessage("");
    }
    
    // Uncomment below to use real socket
    // const socket = createSocketConnection();
    // socket.emit("sendMessage", {
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   userId,
    //   targetUserId,
    //   text: newMessage,
    // });
    // setNewMessage("");
  };

  return (
    <div className="w-[95%] md:w-[85%] lg:w-[70%] mx-auto px-4 my-6">
      <div className="jobble-card h-[75vh] flex flex-col border-[3px] border-jobble-navy-dark rounded-xl bg-white shadow-neobrutalism overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b-[3px] border-jobble-navy-dark bg-white flex items-center gap-3">
          <div className="w-10 h-10 bg-jobble-red rounded-lg border-2 border-jobble-navy-dark flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-white font-bold">💬</span>
          </div>
          <div>
            <h2 className="font-black text-jobble-navy-dark uppercase tracking-wide">Chat</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-jobble-green border border-jobble-navy-dark"></span>
              <p className="text-xs text-xs font-bold text-jobble-navy-dark">Online</p>
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-jobble-bg" style={{backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)", backgroundSize: "20px 20px"}}>
          {messages.map((msg, index) => {
            const isOwnMessage = user.firstName === msg.firstName;
            return (
              <div
                key={index}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`max-w-[75%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                  <div className={`px-5 py-3 border-2 border-jobble-navy-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                    isOwnMessage 
                      ? 'bg-jobble-red text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white text-jobble-navy-dark rounded-2xl rounded-tl-sm'
                  }`}>
                    <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                  </div>
                  <p className={`text-xs font-bold text-gray-500 mt-1.5 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                    {msg.firstName} • 2h ago
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Input */}
        <div className="p-4 border-t-[3px] border-jobble-navy-dark bg-white flex items-center gap-3">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 input bg-jobble-bg border-2 border-jobble-navy-dark rounded-xl px-4 py-3 text-jobble-navy-dark placeholder-gray-500 font-medium focus:outline-none focus:ring-0 shadow-sm"
          />
          <button 
            onClick={sendMessage} 
            className="btn h-12 w-12 rounded-xl bg-jobble-navy text-white border-2 border-jobble-navy-dark hover:bg-jobble-navy-dark hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] grid place-items-center p-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
