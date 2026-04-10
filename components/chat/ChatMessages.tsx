"use client";

import { useEffect, useRef } from "react";
import { type ChatMessage } from "@/app/api/chat/route";

interface ChatMessagesProps {
  messages: ChatMessage[];
  streaming: boolean;
  streamingText: string;
}

export function ChatMessages({ messages, streaming, streamingText }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  if (messages.length === 0 && !streaming) {
    return (
      <div className="flex-1 flex items-center justify-center px-6 py-8 text-center">
        <div>
          <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white dark:text-gray-900">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="currentColor" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-900 dark:text-gray-100 mb-1">Ask me about Talha</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Experience, skills, availability, projects — anything.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
      {messages.map((msg, i) => (
        <MessageBubble key={i} role={msg.role} content={msg.content} />
      ))}
      {streaming && (
        <MessageBubble role="assistant" content={streamingText} isStreaming />
      )}
      <div ref={bottomRef} />
    </div>
  );
}

function MessageBubble({
  role,
  content,
  isStreaming,
}: {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-gray-100 flex items-center justify-center shrink-0 mt-0.5 mr-2">
          <span className="text-white dark:text-gray-900 text-[10px] font-bold">T</span>
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-sky-500 text-white rounded-tr-sm"
            : "bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-gray-100 rounded-tl-sm"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">
          {content}
          {isStreaming && (
            <span className="inline-block w-0.5 h-3.5 bg-current ml-0.5 align-middle animate-pulse" />
          )}
        </p>
      </div>
    </div>
  );
}
