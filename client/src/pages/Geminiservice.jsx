import { useState } from 'react';
import axios from 'axios';

// SVG Icon for the search button for a cleaner look
const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3Z" />
    <path d="M5 21L7 16" />
    <path d="M17 16L19 21" />
  </svg>
);

// --- NEW: Component to format the Markdown response ---
const FormattedAnswer = ({ text }) => {
  if (!text) {
    return <p className="text-gray-400">Your answer will appear here...</p>;
  }

  // Convert basic Markdown to HTML with Tailwind classes
  const formattedText = text
    // Bold: **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    // Headlines: #, ##
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-4 text-pink-300">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-6 text-purple-300">$1</h1>')
    // Bullets: * item
    .replace(/^\* (.*$)/gm, '<li class="mb-2 ml-4">$1</li>')
    // Replace list markers with proper ul tags
    .replace(/<\/li>\n<li/g, '</li><li') // join list items
    .replace(/(<li.*<\/li>)/g, '<ul class="list-disc list-inside space-y-2">$1</ul>')
    // Paragraphs for remaining lines - CORRECTED THIS LINE
    .replace(/^(?!<[hluol]).*$/gm, '<p class="mb-4">$&</p>')
    // Cleanup empty paragraphs
    .replace(/<p>\s*<\/p>/g, '');
    

  return (
    <div 
      className="whitespace-pre-wrap text-gray-300 text-base leading-relaxed" 
      dangerouslySetInnerHTML={{ __html: formattedText }} 
    />
  );
};


function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- Core API function - Unchanged as requested ---
  async function getgenerateanswer() {
    setIsLoading(true);
    setAnswer(""); 


  const API_KEY = import.meta.env.VITE_GEMINI_APIKEY;

    if (!API_KEY) {
      setAnswer("API key is missing. Please set the VITE_GEMINI_APIKEY environment variable.");
      setIsLoading(false);
      return;
    }

    try {
     
         const response =  await axios({
            url:`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            method:"post",
            data: {"contents" : [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]

          }
  })
      setAnswer(response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response found.");
    } catch (error) {
      console.error("Error fetching data: ", error);
      setAnswer("Sorry, something went wrong. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isLoading) {
      getgenerateanswer();
    }
  };

  return (
    <div className="bg-gray-900 w-400 min-h-screen flex flex-col items-center justify-center text-white p-4 font-sans">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-8">
        
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Learn with Ai
          </h1>
          <p className="text-gray-400 mt-2">Your AI-powered assistant</p>
        </div>

        <div className="relative">
          <input
            type="text"
            className="w-full bg-gray-700 border-2 border-gray-600 rounded-full py-3 px-6 text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-16"
            placeholder="Ask me anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold p-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
            onClick={getgenerateanswer}
            disabled={isLoading || !question}
          >
            <SparkleIcon />
          </button>
        </div>

        {/* --- MODIFIED: Answer Section now uses the FormattedAnswer component --- */}
        <div className="bg-gray-900/50 rounded-xl p-6 min-h-[200px] border border-gray-700">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-purple-400 animate-pulse"></div>
                    <div className="w-4 h-4 rounded-full bg-purple-400 animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-4 h-4 rounded-full bg-purple-400 animate-pulse [animation-delay:0.4s]"></div>
                    <span className="ml-4 text-gray-300">Thinking...</span>
                </div>
            </div>
          ) : (
            <FormattedAnswer text={answer} />
          )}
        </div>

      </div>
       <footer className="text-center mt-8 text-gray-500">
          <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
}

export default App;

