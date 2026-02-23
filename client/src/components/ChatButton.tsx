import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! Ask me anything about Aarchi's resume." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("https://ai-portfolio-jul6.onrender.com", {
        message: input,
      });

      const aiMessage: Message = {
        role: "assistant",
        content: response.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error connecting to AI server.",
        },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg z-50"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        💬
      </motion.button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-zinc-900 border border-gray-700 rounded-xl shadow-2xl z-50 flex flex-col">
          
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold">AI Assistant</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 self-end ml-auto"
                    : "bg-gray-700 self-start"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-sm">
                AI is typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 bg-black border border-gray-600 rounded-md text-sm focus:outline-none"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 rounded-md text-sm hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default ChatButton;