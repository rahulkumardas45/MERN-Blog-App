import GeminiPopupChat from "./GeminiPopupChat";

const ChatbotPopup = ({ close }) => {
  return (
    <div className="fixed bottom-24 right-6 z-50
                    w-[380px] h-[520px]
                    bg-gray-950 text-white
                    rounded-2xl shadow-2xl
                    flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between
                      px-4 py-3
                      bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="flex items-center gap-2 font-semibold">
          🤖 Gemini Assistant
        </div>
        <button onClick={close} className="text-lg text-gray-800">✖</button>
      </div>

      {/* Chat */}
      <GeminiPopupChat />
    </div>
  );
};

export default ChatbotPopup;
