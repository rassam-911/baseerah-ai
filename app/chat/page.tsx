"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    setLoading(true);

    setMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await res.json();

      const aiMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#071739] text-white p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-7xl font-black text-[#D97745] mb-4">
            Baseerah AI
          </h1>

          <p className="text-gray-400 text-xl">
            مساعد مالي ذكي لتحليل السلوك المالي والتوصيات الذكية
          </p>

        </div>

        {/* Chat Container */}

        <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 h-[750px] flex flex-col shadow-[0_0_60px_rgba(217,119,69,0.12)]">

          {/* Messages */}

          <div className="flex-1 overflow-y-auto space-y-6 flex flex-col">

            {messages.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-center text-gray-500 text-xl">
                ✨ ابدأ محادثة مع الذكاء الاصطناعي
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-5 rounded-[28px] leading-9 text-lg ${
                    msg.role === "user"
                      ? "bg-[#D97745] text-white shadow-[0_0_30px_rgba(217,119,69,0.3)]"
                      : "bg-white/10 border border-white/10"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/10 px-6 py-4 rounded-3xl text-gray-300">
                  جاري التحليل...
                </div>
              </div>
            )}

          </div>

          {/* Input */}

          <div className="flex items-end gap-4 mt-8">

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 h-24 bg-white/5 border border-white/10 rounded-2xl p-5 outline-none resize-none text-lg"
            />

            <button
              onClick={sendMessage}
              className="bg-[#D97745] h-24 px-10 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-[0_0_30px_rgba(217,119,69,0.25)]"
            >
              إرسال
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}