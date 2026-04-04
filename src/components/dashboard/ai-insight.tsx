"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BrainCircuit, SendHorizontal, Sparkles, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const quickPrompts = ["How can I save more?", "Where am I overspending?", "Show budget risks"];

const promptResponses: Record<string, string> = {
  "How can I save more?":
    "Try these moves:\n• Cut dining by Rp300.000 this month\n• Delay one subscription renewal\n• Move freelance income straight to goals",
  "Where am I overspending?":
    "The biggest pressure points right now:\n• Dining is climbing fastest\n• Utilities is already near its cap\n• Small daily transfers are adding up",
  "Show budget risks":
    "Budget risks to watch:\n• Utilities could cross limit next week\n• Dining pace is above plan\n• Transport is still healthy but trending upward"
};

function getAssistantReply(prompt: string) {
  const normalized = prompt.trim();

  return (
    promptResponses[normalized] ??
    "Here is the quick read:\n• Spending momentum is still manageable\n• Dining and subscriptions deserve attention first\n• Your income trend is healthy enough to create more buffer"
  );
}

export function AiInsight() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "assistant-initial",
      role: "assistant",
      text: "I can help summarize spend patterns, budget risk, and quick savings opportunities."
    }
  ]);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [typingTarget, setTypingTarget] = useState("");
  const [typedText, setTypedText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

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
          current.map((message) =>
            message.id === typingMessageId
              ? {
                  ...message,
                  text: typingTarget
                }
              : message
          )
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
  }, [messages, typedText]);

  function submitPrompt(prompt: string) {
    const trimmed = prompt.trim();

    if (!trimmed) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed
    };
    const assistantId = `assistant-${Date.now() + 1}`;
    const assistantReply = getAssistantReply(trimmed);

    setMessages((current) => [...current, userMessage, { id: assistantId, role: "assistant", text: "" }]);
    setTypingMessageId(assistantId);
    setTypingTarget(assistantReply);
    setInputValue("");
  }

  const renderedMessages = useMemo(
    () =>
      messages.map((message) => {
        const content = typingMessageId === message.id ? typedText : message.text;

        return { ...message, text: content };
      }),
    [messages, typedText, typingMessageId]
  );

  return (
    <div className="h-full">
      <Card className="h-full overflow-hidden border-primary/12 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.12),transparent_30%),linear-gradient(180deg,rgba(56,87,255,0.06),transparent_72%)] shadow-[0_24px_54px_-34px_rgba(56,87,255,0.32)]">
        <CardHeader className="relative">
          <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.24),transparent_58%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_54%),linear-gradient(180deg,rgba(56,87,255,0.08),transparent_78%)]" />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <CardTitle>AI Insight</CardTitle>
              <CardDescription className="mt-2">
                A premium preview of how an in-product assistant can surface patterns, savings, and budget risks.
              </CardDescription>
            </div>
            <span className="ai-insight-icon-glow flex size-10 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-[0_14px_28px_-20px_rgba(56,87,255,0.42)]">
              <BrainCircuit className="size-5" />
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-3xl border border-primary/12 bg-[radial-gradient(circle_at_top_left,rgba(56,87,255,0.12),transparent_48%),linear-gradient(180deg,rgba(56,87,255,0.06),transparent_100%)] p-5 shadow-[0_18px_38px_-26px_rgba(56,87,255,0.22)]">
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

          <div className="grid gap-3">
            <div className="flex items-start gap-3 rounded-3xl border bg-background/55 p-4 transition hover:bg-background/70">
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
            <div className="flex items-start gap-3 rounded-3xl border bg-background/55 p-4 transition hover:bg-background/70">
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

          <div className="rounded-3xl border border-primary/10 bg-background/60 p-5 shadow-[0_18px_38px_-28px_rgba(15,23,42,0.28)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">Ask Fyntra AI</p>
                <p className="mt-1 text-xs text-muted-foreground">Fast answers about spending, risk, and savings.</p>
              </div>
              <span className="flex size-9 items-center justify-center rounded-2xl border border-primary/12 bg-primary/10 text-primary">
                <BrainCircuit className="size-4" />
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submitPrompt(prompt)}
                  className="rounded-full border border-border/70 bg-background/75 px-3.5 py-2 text-sm text-foreground/88 transition hover:border-primary/18 hover:bg-primary/8"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div
              ref={listRef}
              className="mt-4 max-h-[240px] space-y-3 overflow-y-auto rounded-[1.5rem] border border-border/70 bg-background/55 p-3"
            >
              {renderedMessages.map((message) => (
                <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={message.role === "user"
                      ? "ai-insight-bubble max-w-[88%] rounded-[1.4rem] rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground shadow-[0_16px_34px_-24px_rgba(56,87,255,0.45)]"
                      : "ai-insight-bubble max-w-[92%] rounded-[1.4rem] rounded-bl-md border border-primary/12 bg-[linear-gradient(180deg,rgba(56,87,255,0.08),transparent_100%)] px-4 py-3 text-sm text-foreground shadow-[0_16px_34px_-26px_rgba(15,23,42,0.24)]"
                    }
                  >
                    <div className="whitespace-pre-line leading-6">
                      {message.text || <span className="inline-flex items-center gap-1 text-muted-foreground">Typing<span className="animate-pulse">...</span></span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              className="mt-4 flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                submitPrompt(inputValue);
              }}
            >
              <Input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Ask about your spending..."
                className="rounded-2xl border-border/70 bg-background/80"
              />
              <Button type="submit" size="icon" className="rounded-2xl">
                <SendHorizontal className="size-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
