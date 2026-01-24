import { useEffect, useRef, useState } from "react";
import axios from "axios";

/* Icon */
const SparkleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3Z" />
  </svg>
);

/* Formatter */
const FormattedAnswer = ({ text }) => {
  if (!text) return null;

  const html = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^\* (.*$)/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
    .replace(/^(?!<h|<u|<l).*$/gm, "<p>$&</p>");

  return (
    <div
      className="prose prose-invert max-w-none text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const GeminiPopupChat = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function send() {
    if (!question.trim() || isLoading) return;

    const userMsg = { role: "user", text: question };
    setMessages((p) => [...p, userMsg]);
    setQuestion("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/bog/gemini`,
        { prompt: userMsg.text }
      );

      setMessages((p) => [
        ...p,
        { role: "ai", text: res.data.answer || "No response" },
      ]);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "ai", text: "❌ Something went wrong" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm
                ${m.role === "user"
                  ? "bg-purple-600 rounded-br-none"
                  : "bg-gray-800 rounded-bl-none"}`}
            >
              <FormattedAnswer text={m.text} />
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-gray-400 text-sm animate-pulse">
            🤖 Thinking...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 p-3 flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask something..."
          className="flex-1 bg-gray-800 rounded-full px-4 py-2
                     outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />
        <button
          onClick={send}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-500 to-pink-500
                     p-2 rounded-full hover:scale-110 transition"
        >
          <SparkleIcon />
        </button>
      </div>
    </>
  );
};

export default GeminiPopupChat;





