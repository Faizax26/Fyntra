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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "assistant-initial",
      role: "assistant",
      text: "I can help summarize spending patterns, budget risk, and quick savings opportunities."
    }
  ]);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [typingTarget, setTypingTarget] = useState("");
  const [typedText, setTypedText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (typeof listRef.current?.scrollTo === "function") {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, typedText, mode]);

  useEffect(() => {
    if (mode === "chat") {
      inputRef.current?.focus();
    }
  }, [mode, messages.length]);

  function submitPrompt(prompt: string) {
    const trimmed = prompt.trim();

    if (!trimmed) {
      return;
    }

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, role: "user", text: trimmed };
    const assistantId = `assistant-${Date.now() + 1}`;
    const reply = getAssistantReply(trimmed);

    setHasStartedChat(true);
    setMessages((current) => [...current, userMessage, { id: assistantId, role: "assistant", text: "" }]);
    setTypingMessageId(assistantId);
    setTypingTarget(reply);
    setInputValue("");
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
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
      <Card className="h-full overflow-hidden border-primary/12 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.12),transparent_30%),linear-gradient(180deg,rgba(56,87,255,0.06),transparent_72%)] shadow-[0_24px_54px_-34px_rgba(56,87,255,0.32)]">
        <CardHeader className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.24),transparent_58%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_54%),linear-gradient(180deg,rgba(56,87,255,0.08),transparent_78%)]" />
          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <CardTitle className="text-[1.05rem]">Fyntra AI</CardTitle>
              <div className="inline-flex rounded-full border border-border/70 bg-background/70 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                {([
                  { id: "insights", label: "Insights" },
                  { id: "chat", label: "AI Chat" }
                ] as const).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMode(option.id)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                      mode === option.id
                        ? "bg-gradient-to-r from-primary to-indigo-500 text-primary-foreground shadow-[0_12px_24px_-18px_rgba(56,87,255,0.52)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/70"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <span className="ai-insight-icon-glow flex size-10 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-[0_14px_28px_-20px_rgba(56,87,255,0.42)]">
              <BrainCircuit className="size-5" />
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div key={mode} className="ai-insight-mode-panel">
            {mode === "insights" ? (
              <div className="space-y-5">
                <div className="rounded-3xl border border-primary/12 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.12),transparent_48%),linear-gradient(180deg,rgba(56,87,255,0.06),transparent_100%)] p-5 shadow-[0_18px_38px_-26px_rgba(56,87,255,0.24)] ring-1 ring-primary/8">
                  <Badge className="border border-primary/15 bg-primary/12 text-primary shadow-[0_10px_24px_-18px_rgba(56,87,255,0.45)]">
                    Top signal
                  </Badge>
                  <p className="mt-4 text-lg font-semibold leading-8 tracking-tight">
                    Spending on dining and subscriptions is climbing faster than income growth this month.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    If this pace continues, your flexible spending will outgrow planned buffers by the third week.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-start gap-3 rounded-3xl border bg-background/50 p-4 shadow-sm transition hover:bg-background/66">
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
                  <div className="flex items-start gap-3 rounded-3xl border bg-background/50 p-4 shadow-sm transition hover:bg-background/66">
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
              <div className="rounded-3xl border border-primary/10 bg-background/60 p-5 pb-8 shadow-[0_18px_38px_-28px_rgba(15,23,42,0.28)] ring-1 ring-primary/7">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Ask Fyntra AI</p>
                    <p className="mt-1 text-xs text-muted-foreground">Fast answers about spending, risk, and savings.</p>
                  </div>
                  <span className="flex size-9 items-center justify-center rounded-2xl border border-primary/12 bg-primary/10 text-primary">
                    <BrainCircuit className="size-4" />
                  </span>
                </div>

                {!hasStartedChat ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => submitPrompt(prompt)}
                        className="rounded-full border border-border/70 bg-background/78 px-3.5 py-2 text-sm text-foreground/88 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/18 hover:bg-primary/8 hover:shadow-[0_14px_28px_-24px_rgba(56,87,255,0.3)]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                ) : null}

                <div
                  ref={listRef}
                  className={cn(
                    "mt-4 space-y-3 overflow-y-auto rounded-[1.5rem] border border-border/70 bg-background/55 p-3.5 transition-[max-height] duration-300 ease-out",
                    hasStartedChat ? "max-h-[280px]" : "max-h-[168px]"
                  )}
                >
                  {renderedMessages.map((message) => (
                    <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                      <div
                        className={
                          message.role === "user"
                            ? "ai-insight-bubble max-w-[74%] rounded-[1.4rem] rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground shadow-[0_16px_34px_-24px_rgba(56,87,255,0.38)]"
                            : "ai-insight-bubble max-w-[76%] rounded-[1.4rem] rounded-bl-md border border-primary/12 bg-[linear-gradient(180deg,rgba(56,87,255,0.1),rgba(56,87,255,0.02)_100%)] px-4 py-3 text-sm text-foreground shadow-[0_16px_34px_-28px_rgba(15,23,42,0.24)]"
                        }
                      >
                        <div className="whitespace-pre-line leading-6">
                          {message.text || <TypingDots />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  className="mt-4 flex items-center gap-2 rounded-[1.35rem] border border-border/70 bg-background/74 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_24px_-20px_rgba(15,23,42,0.34)]"
                  onSubmit={(event) => {
                    event.preventDefault();
                    submitPrompt(inputValue);
                  }}
                >
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder="Ask about your spending..."
                    className="rounded-2xl border-border/70 bg-background/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] focus-visible:ring-primary/25"
                  />
                  <Button type="submit" size="icon" className="rounded-2xl shadow-sm transition-transform duration-200 hover:scale-[1.02]">
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
