"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BrainCircuit, SendHorizontal, Sparkles, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Mode = "insights" | "chat";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const STORAGE_KEY = "fyntra:ai-insight-mode";

const quickPrompts = [
  "Where can I reduce spending this week?",
  "What’s my biggest budget risk?",
  "How can I improve my savings rate?"
];

const promptResponses: Record<string, string> = {
  "How can I save more?":
    "Try these moves:\n• Reduce dining by Rp300.000\n• Pause one low-value subscription\n• Route freelance income straight to savings",
  "Where am I overspending?":
    "Main overspending signals:\n• Dining is accelerating fastest\n• Utilities is already close to limit\n• Small transfer habits are adding up",
  "Show budget risks":
    "Budget risks to watch:\n• Utilities could exceed plan next week\n• Dining pace is above target\n• Flexible spending buffer is getting thinner"
};

function getAssistantReply(prompt: string) {
  const normalized = prompt.trim();

  return (
    promptResponses[normalized] ??
    "Quick read:\n• Spending is still manageable overall\n• Dining and subscriptions deserve attention first\n• Income momentum is healthy enough to create more buffer"
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 text-muted-foreground">
      Thinking
      <span className="typing-dot" />
      <span className="typing-dot [animation-delay:120ms]" />
      <span className="typing-dot [animation-delay:240ms]" />
    </span>
  );
}

export function AiInsight() {
  const [mode, setMode] = useState<Mode>("insights");
  const [inputValue, setInputValue] = useState("");
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [typingTarget, setTypingTarget] = useState("");
  const [typedText, setTypedText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const thinkingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored === "insights" || stored === "chat") {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    if (!typingMessageId) {
      return;
    }

    setTypedText("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(typingTarget.slice(0, index));

      if (index >= typingTarget.length) {
        window.clearInterval(timer);
        setMessages((current) =>
          current.map((message) => (message.id === typingMessageId ? { ...message, text: typingTarget } : message))
        );
        setTypingMessageId(null);
      }
    }, 18);

    return () => window.clearInterval(timer);
  }, [typingMessageId, typingTarget]);

  useEffect(() => {
    if (mode === "chat") {
      inputRef.current?.focus();
    }
  }, [mode]);

  useEffect(() => {
    if (typeof listRef.current?.scrollTo === "function") {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, typedText, mode]);

  useEffect(() => {
    return () => {
      if (thinkingTimerRef.current) {
        window.clearTimeout(thinkingTimerRef.current);
      }
    };
  }, []);

  function handleChipSelect(prompt: string) {
    submitPrompt(prompt);
  }

  function submitPrompt(prompt: string) {
    const trimmed = prompt.trim();

    if (!trimmed) {
      return;
    }

    if (thinkingTimerRef.current) {
      window.clearTimeout(thinkingTimerRef.current);
    }

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, role: "user", text: trimmed };
    const assistantId = `assistant-${Date.now() + 1}`;

    setHasStartedChat(true);
    setMessages((current) => [...current, userMessage, { id: assistantId, role: "assistant", text: "" }]);
    setTypingMessageId(null);
    setTypingTarget("");
    setTypedText("");
    setInputValue("");
    thinkingTimerRef.current = window.setTimeout(() => {
      setTypingMessageId(assistantId);
      setTypingTarget(getAssistantReply(trimmed));
      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }, 280);
  }

  const renderedMessages = useMemo(
    () =>
      messages.map((message) => ({
        ...message,
        text: typingMessageId === message.id ? typedText : message.text
      })),
    [messages, typedText, typingMessageId]
  );

  return (
    <div className="h-full">
      <Card className="h-full overflow-hidden border-primary/12 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_44%),linear-gradient(180deg,rgba(56,87,255,0.06),rgba(255,255,255,0)_78%)] shadow-[0_24px_54px_-34px_rgba(56,87,255,0.32)]">
        <CardHeader className="relative pb-5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.16),transparent_54%),linear-gradient(180deg,rgba(56,87,255,0.05),transparent_78%)]" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0 space-y-3">
              <div className="space-y-1">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground/80">
                  Assistant layer
                </p>
                <CardTitle className="text-[1.1rem] tracking-tight">Fyntra AI</CardTitle>
              </div>
              <div className="relative inline-grid h-11 w-[212px] grid-cols-2 items-center rounded-full border border-white/8 bg-slate-950/64 p-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <span
                  aria-hidden="true"
                  className="absolute bottom-[3px] left-[3px] top-[3px] w-[101px] rounded-full bg-gradient-to-r from-primary to-indigo-500 shadow-[0_18px_32px_-24px_rgba(56,87,255,0.48)] transition-transform duration-200 ease-out"
                  style={{
                    transform: mode === "chat" ? "translateX(105px)" : "translateX(0)"
                  }}
                />
                {([
                  { id: "insights", label: "Insights" },
                  { id: "chat", label: "AI Chat" }
                ] as const).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMode(option.id)}
                    className={cn(
                      "relative z-[1] flex h-full items-center justify-center rounded-full text-sm font-semibold transition-colors duration-150",
                      mode === option.id
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <span className="ai-insight-icon-glow flex size-14 shrink-0 items-center justify-center rounded-[1.6rem] border border-primary/15 bg-primary/10 text-primary shadow-[0_20px_36px_-24px_rgba(56,87,255,0.4)]">
              <BrainCircuit className="size-7" />
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div key={mode} className="ai-insight-mode-panel">
            {mode === "insights" ? (
              <div className="space-y-4">
                <div className="rounded-[1.9rem] border border-primary/12 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.12),transparent_44%),linear-gradient(180deg,rgba(56,87,255,0.08),rgba(255,255,255,0)_100%)] p-5 shadow-[0_22px_42px_-30px_rgba(56,87,255,0.28)] ring-1 ring-primary/8">
                  <Badge className="border border-primary/15 bg-primary/12 text-primary shadow-[0_10px_24px_-18px_rgba(56,87,255,0.45)]">
                    Top signal
                  </Badge>
                  <p className="mt-4 text-[1.05rem] font-semibold leading-8 tracking-tight">
                    Spending on dining and subscriptions is climbing faster than income growth this month.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    If this pace continues, your flexible spending will outgrow planned buffers by the third week.
                  </p>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-start gap-3 rounded-[1.6rem] border border-white/8 bg-background/50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/66">
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/12 bg-emerald-500/12 text-emerald-600 shadow-[0_14px_28px_-22px_rgba(16,185,129,0.42)] dark:text-emerald-400">
                      <Sparkles className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Possible savings</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Reduce dining by Rp300.000 to land closer to your 50% savings target.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-[1.6rem] border border-white/8 bg-background/50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/66">
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl border border-amber-500/12 bg-amber-500/12 text-amber-600 shadow-[0_14px_28px_-22px_rgba(245,158,11,0.36)] dark:text-amber-400">
                      <TrendingDown className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Watch category</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Utilities is already at 87% of its monthly budget and needs attention soon.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[1.9rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(56,87,255,0.05),rgba(255,255,255,0)_22%)] p-5 shadow-[0_18px_38px_-28px_rgba(15,23,42,0.28)] ring-1 ring-primary/7">
                {!hasStartedChat ? (
                  <div className="flex flex-wrap gap-2.5">
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleChipSelect(prompt)}
                        className="rounded-full border border-white/8 bg-background/78 px-3.5 py-2 text-sm text-foreground/88 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/8 hover:shadow-[0_14px_28px_-24px_rgba(56,87,255,0.28)]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                ) : null}

                <p className={cn("text-xs text-muted-foreground", !hasStartedChat && "mt-3")}>
                  I can help with insights, risks, and savings ideas.
                </p>

                {hasStartedChat ? (
                  <div
                    ref={listRef}
                    className="mt-4 max-h-[240px] space-y-3 overflow-y-auto rounded-[1.45rem] border border-white/8 bg-background/50 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                  >
                    {renderedMessages.map((message) => (
                      <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                        <div
                          className={
                            message.role === "user"
                              ? "ai-insight-bubble max-w-[72%] rounded-[1.45rem] rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground shadow-[0_16px_34px_-24px_rgba(56,87,255,0.38)]"
                              : "ai-insight-bubble max-w-[74%] rounded-[1.45rem] rounded-bl-md border border-primary/12 bg-[linear-gradient(180deg,rgba(56,87,255,0.1),rgba(56,87,255,0.02)_100%)] px-4 py-3 text-sm text-foreground shadow-[0_16px_34px_-28px_rgba(15,23,42,0.24)]"
                          }
                        >
                          <div className="whitespace-pre-line leading-6">{message.text || <TypingDots />}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <form
                  className="mt-4 flex items-center gap-2 rounded-[1.45rem] border border-primary/10 bg-background/78 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_24px_-20px_rgba(15,23,42,0.34)] transition-shadow duration-200 focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_28px_-18px_rgba(56,87,255,0.2)]"
                  onSubmit={(event) => {
                    event.preventDefault();
                    submitPrompt(inputValue);
                  }}
                >
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder="Ask anything about your money..."
                    className="rounded-2xl border-white/0 bg-transparent shadow-none focus-visible:ring-primary/25"
                  />
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => submitPrompt(inputValue)}
                    className="rounded-2xl bg-gradient-to-br from-primary to-indigo-500 shadow-[0_14px_26px_-18px_rgba(56,87,255,0.46)] transition-all duration-200 hover:scale-[1.02] hover:brightness-105"
                  >
                    <SendHorizontal className="size-4" />
                  </Button>
                </form>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
