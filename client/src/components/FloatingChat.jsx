import { useState } from "react";
import ChatbotPopup from "./ChatbotPopup";

const FloatingChat = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="group relative flex items-center justify-center
                     w-16 h-16 rounded-full
                     bg-gradient-to-r from-purple-500 to-pink-600
                     hover:scale-110 transition"
        >
          <span className="absolute inset-0 blur-md rounded-full
                           bg-gradient-to-r from-purple-400 to-pink-500
                           animate-pulse"></span>
          <span className="relative text-2xl text-white z-10">🤖</span>
        </button>
      </div>

      {open && <ChatbotPopup close={() => setOpen(false)} />}
    </>
  );
};

export default FloatingChat;
