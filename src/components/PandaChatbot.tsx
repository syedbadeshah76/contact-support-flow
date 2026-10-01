import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { BookOpen, Brain, HelpCircle, Lightbulb, Sparkles, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import pippinPanda from "@/assets/pippin-panda.png";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";

const CHAT_STORAGE_KEY = "edvanz-pippin-chat-v1";

const welcomeMessage: UIMessage = {
  id: "pippin-welcome",
  role: "assistant",
  parts: [{ type: "text", text: "Hi! I’m Pippin, your learning buddy. Ask me anything, get a hint, or start a quick quiz!" }],
};

const quickActions = [
  { label: "Ask a question", prompt: "I have a learning question.", icon: HelpCircle },
  { label: "Get a hint", prompt: "Can you give me a hint without revealing the full answer?", icon: Lightbulb },
  { label: "Explain this", prompt: "Please explain this lesson in a simple way.", icon: BookOpen },
  { label: "Start a quiz", prompt: "Start a short quiz for me.", icon: Brain },
] as const;

function loadMessages(): UIMessage[] {
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) return [welcomeMessage];
    const parsed = JSON.parse(stored) as UIMessage[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [welcomeMessage];
  } catch {
    return [welcomeMessage];
  }
}

function getText(message: UIMessage) {
  return message.parts.filter((part) => part.type === "text").map((part) => part.text).join("");
}

export function PandaChatbot() {
  const [open, setOpen] = useState(false);
  const initialMessages = useMemo(loadMessages, []);
  const transport = useMemo(
    () => new DefaultChatTransport({
      api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/panda-tutor`,
      headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
    }),
    []
  );
  const { messages, sendMessage, setMessages, status, stop, error, clearError } = useChat({
    id: "pippin-one-conversation",
    messages: initialMessages,
    transport,
    onFinish: ({ messages: completedMessages }) => {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(completedMessages));
    },
    onError: () => toast.error("Pippin could not answer right now. Please try again."),
  });

  useEffect(() => {
    if (status === "ready" && messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, status]);

  const submitPrompt = async (prompt: string) => {
    const text = prompt.trim();
    if (!text || status === "submitted" || status === "streaming") return;
    clearError();
    await sendMessage({ text });
  };

  const handleSubmit = async ({ text }: PromptInputMessage) => {
    await submitPrompt(text);
  };

  const clearChat = () => {
    void stop();
    setMessages([welcomeMessage]);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify([welcomeMessage]));
    toast.success("Chat cleared");
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {open && (
        <section
          aria-label="Pippin AI learning assistant"
          className="pointer-events-auto absolute bottom-28 right-4 flex h-[min(38rem,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl sm:right-6"
        >
          <header className="flex items-center gap-3 overflow-hidden border-b border-border bg-soft-gradient px-4 py-3">
            <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-card shadow-card">
              <img src={pippinPanda} alt="Pippin the panda" className="size-14 object-contain" loading="lazy" width={1024} height={1024} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate text-base font-black text-card-foreground">Pippin</h2>
                <Sparkles className="size-4 text-sun" aria-hidden="true" />
              </div>
              <p className="text-xs font-semibold text-muted-foreground">Your AI learning buddy</p>
            </div>
            <Button type="button" variant="ghost" size="icon" className="rounded-full text-muted-foreground" onClick={clearChat} aria-label="Clear chat" title="Clear chat">
              <Trash2 className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="rounded-full text-muted-foreground" onClick={() => setOpen(false)} aria-label="Close Pippin">
              <X className="size-4" />
            </Button>
          </header>

          <Conversation className="min-h-0 bg-background">
            <ConversationContent className="gap-4 px-4 py-5">
              {messages.map((message) => {
                const text = getText(message);
                if (!text) return null;
                return (
                  <Message key={message.id} from={message.role}>
                    <MessageContent className={message.role === "assistant" ? "rounded-2xl rounded-tl-md border border-border bg-card px-3.5 py-3 shadow-card" : "rounded-2xl rounded-tr-md bg-primary px-3.5 py-3 text-primary-foreground"}>
                      <MessageResponse>{text}</MessageResponse>
                    </MessageContent>
                  </Message>
                );
              })}
              {status === "submitted" && (
                <Message from="assistant">
                  <MessageContent className="rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3 shadow-card">
                    <span className="flex items-center gap-1" aria-label="Pippin is thinking">
                      <span className="size-1.5 animate-bounce rounded-full bg-primary" />
                      <span className="size-1.5 animate-bounce rounded-full bg-grape [animation-delay:120ms]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-sun [animation-delay:240ms]" />
                    </span>
                  </MessageContent>
                </Message>
              )}
              {error && <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">Pippin had trouble answering. Please try again.</p>}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border bg-card p-3">
            <div className="mb-2 flex gap-2 overflow-x-auto pb-1" aria-label="Quick questions">
              {quickActions.map((action) => (
                <Button key={action.label} type="button" variant="outline" size="sm" className="shrink-0 rounded-full bg-background text-xs font-bold" disabled={status === "submitted" || status === "streaming"} onClick={() => void submitPrompt(action.prompt)}>
                  <action.icon className="size-3.5" />
                  {action.label}
                </Button>
              ))}
            </div>
            <PromptInput onSubmit={handleSubmit} className="rounded-2xl bg-background shadow-none">
              <PromptInputBody>
                <PromptInputTextarea placeholder="Ask Pippin anything..." aria-label="Message Pippin" className="min-h-12 max-h-28 text-sm" />
              </PromptInputBody>
              <PromptInputSubmit status={status} onStop={() => void stop()} className="mr-2 rounded-full" />
            </PromptInput>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">Check important answers with a teacher or parent.</p>
          </div>
        </section>
      )}

      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close Pippin AI chat" : "Open Pippin AI chat"}
        aria-expanded={open}
        className="panda-float pointer-events-auto absolute bottom-5 right-4 size-[5.25rem] overflow-visible rounded-full border-0 bg-transparent p-0 shadow-none hover:bg-transparent sm:bottom-6 sm:right-6"
      >
        <span className="absolute inset-2 rounded-full bg-primary/20 blur-md transition-all" />
        <span className="relative grid size-full place-items-center overflow-visible rounded-full border border-primary/20 bg-card shadow-pop transition-transform duration-300 hover:scale-105 active:scale-95">
          <img src={pippinPanda} alt="" className="size-[6.25rem] max-w-none object-contain drop-shadow-lg" loading="lazy" width={1024} height={1024} />
        </span>
        {!open && <span className="absolute right-0 top-0 size-3 rounded-full bg-mint ring-4 ring-card" />}
      </Button>
    </div>
  );
}