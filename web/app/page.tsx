"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const chat = useChat();
  const { isLoading, handleInputChange, handleSubmit, messages, input } = chat;

  return (
    <div className="w-[700px] mx-auto relative mb-24">
      {messages.map((m) => (
        <div key={m.id} className="">
          <p>{m.role === "user" ? "User: " : "AI: "}</p>
          <div className="whitespace-pre-wrap">{m.content}</div>
        </div>
      ))}
      <AIIsThinking isLoading={isLoading} messages={messages} />

      <form
        onSubmit={handleSubmit}
        className="flex items-center fixed bottom-10 justify-between w-[700px]"
      >
        <input
          className="border rounded-sm me-1 h-8 min-w-full px-2"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />
        <button
          className="bg-black text-white rounded-sm h-8 px-4"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
}

function AIIsThinking({
  isLoading,
  messages,
}: {
  isLoading: boolean;
  messages: Array<any>;
}) {
  return (
    isLoading &&
    messages[messages.length - 1].role === "user" && (
      <>
        <p>AI:</p>
        <p>Thinking...</p>
      </>
    )
  );
}
