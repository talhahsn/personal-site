"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { type ChatMessage } from "@/app/api/chat/route";
import { profile } from "@/data/profile";

const STARTER_PROMPTS = [
  "What's your tech stack?",
  "Are you open to work?",
  "Tell me about your AI projects",
  "How many years of experience?",
];

// Generates a UUID-compatible session ID (matches Supabase uuid column type)
function makeSessionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

type LeadStep = "idle" | "asking_name" | "asking_company" | "asking_email" | "done";

interface LeadData {
  name: string;
  company: string;
  email: string;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [sessionId] = useState(makeSessionId);
  const [showStarters, setShowStarters] = useState(true);

  // Lead capture state
  const [leadStep, setLeadStep] = useState<LeadStep>("idle");
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [leadCapturing, setLeadCapturing] = useState(false);

  const transcriptSentRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  // Detect when a user explicitly wants to leave their details
  function userWantsToConnect(text: string): boolean {
    const lower = text.toLowerCase();
    const signals = [
      "yes", "sure", "yeah", "leave my details", "leave details", "my details",
      "contact me", "reach me", "get in touch", "connect", "follow up", "follow-up",
      "i'd like to", "i would like to", "sounds good", "absolutely",
    ];
    return signals.some((s) => lower.includes(s));
  }

  const sendMessage = useCallback(
    async (text: string) => {
      if (streaming) return;
      setShowStarters(false);

      // If idle and user explicitly wants to connect, start lead capture
      if (leadStep === "idle" && userWantsToConnect(text) && messages.length > 0) {
        const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
        const assistantMentionedContact =
          lastAssistant &&
          (lastAssistant.content.toLowerCase().includes("details") ||
            lastAssistant.content.toLowerCase().includes("follow up") ||
            lastAssistant.content.toLowerCase().includes("reach him") ||
            lastAssistant.content.toLowerCase().includes("contact"));
        if (assistantMentionedContact) {
          setMessages((prev) => [
            ...prev,
            { role: "user", content: text },
            { role: "assistant", content: "Great! What's your name?" },
          ]);
          setLeadStep("asking_name");
          setShowStarters(false);
          return;
        }
      }

      // Handle lead capture flow inline
      if (leadStep === "asking_name") {
        setLeadData((d) => ({ ...d, name: text }));
        setMessages((prev) => [
          ...prev,
          { role: "user", content: text },
          { role: "assistant", content: `Great, ${text}! What company are you from? (or type "skip" to skip)` },
        ]);
        setLeadStep("asking_company");
        return;
      }

      if (leadStep === "asking_company") {
        const company = text.toLowerCase() === "skip" ? "" : text;
        setLeadData((d) => ({ ...d, company }));
        setMessages((prev) => [
          ...prev,
          { role: "user", content: text },
          { role: "assistant", content: "And what's the best email for Talha to reach you?" },
        ]);
        setLeadStep("asking_email");
        return;
      }

      if (leadStep === "asking_email") {
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
        if (!emailValid) {
          setMessages((prev) => [
            ...prev,
            { role: "user", content: text },
            { role: "assistant", content: "That doesn't look like a valid email. Can you double-check it?" },
          ]);
          return;
        }

        const finalLead = { ...leadData, email: text } as LeadData;
        setLeadData(finalLead);
        setLeadStep("done");
        setLeadCapturing(true);

        const allMessages: ChatMessage[] = [
          ...messages,
          { role: "user", content: text },
        ];
        setMessages([
          ...allMessages,
          { role: "assistant", content: `Perfect! I've passed your details to Talha — he'll be in touch at ${text} soon. Is there anything else I can help with?` },
        ]);

        // Send lead to API
        try {
          await fetch("/api/chat/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId,
              name: finalLead.name,
              company: finalLead.company,
              email: finalLead.email,
              transcript: allMessages,
            }),
          });
        } catch {
          // silently fail
        } finally {
          setLeadCapturing(false);
        }
        return;
      }

      // Normal chat
      const userMessage: ChatMessage = { role: "user", content: text };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setStreaming(true);
      setStreamingText("");

      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages, sessionId }),
          signal: abortRef.current.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error("Request failed");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setStreamingText(fullText);
        }

        const assistantMessage: ChatMessage = { role: "assistant", content: fullText };
        setMessages([...updatedMessages, assistantMessage]);
        setStreamingText("");
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setMessages([
            ...updatedMessages,
            { role: "assistant", content: "Something went wrong. Please try again." },
          ]);
        }
      } finally {
        setStreaming(false);
        setStreamingText("");
      }
    },
    [messages, streaming, sessionId, leadStep, leadData]
  );

  // Send transcript when widget is closed (if there were messages)
  function handleClose() {
    setOpen(false);
    if (messages.length >= 2 && !transcriptSentRef.current) {
      transcriptSentRef.current = true;
      fetch("/api/chat/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, messages }),
      }).catch(() => {});
    }
  }

  // Cancel ongoing stream if widget is unmounted
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => (open ? handleClose() : setOpen(true))}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-slate-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              width="20" height="20" viewBox="0 0 20 20" fill="none"
            >
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {profile.available && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-90 max-w-[calc(100vw-24px)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden"
            style={{ maxHeight: "min(520px, calc(100dvh - 120px))" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-gray-100 flex items-center justify-center">
                  <span className="text-white dark:text-gray-900 text-xs font-bold">T</span>
                </div>
                {profile.available && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-900" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-gray-100 leading-none">Talha's Assistant</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                  {profile.available ? "Open to opportunities · usually replies fast" : "Ask me anything"}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-slate-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close chat"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <ChatMessages
              messages={messages}
              streaming={streaming}
              streamingText={streamingText}
            />

            {/* Starter prompts */}
            {showStarters && messages.length === 0 && (
              <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="text-[11px] px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <ChatInput onSend={sendMessage} disabled={streaming || leadCapturing} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
