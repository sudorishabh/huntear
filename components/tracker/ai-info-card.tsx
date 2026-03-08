"use client";
import { useState } from "react";
import { Asterisk, X, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";

interface AIInfoCardProps {
  message?: string;
  onRegenerate?: () => void;
}

export const AIInfoCard = ({
  message = "Seems like out of 10 jobs you're interested in Html and css is mostly required but missing in your resume.",
  onRegenerate,
}: AIInfoCardProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className='relative p-4 flex flex-col gap-3'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1.5'>
          <Asterisk
            size={18}
            className='text-blue-400'
            strokeWidth={2.5}
          />
          <span
            className={cn(
              "text-sm text-[#808080] text-[10px] ",
              GeistMono.className,
            )}>
            AI analysis
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className='text-muted-foreground hover:text-foreground transition-colors'>
          <X size={16} />
        </button>
      </div>

      {/* Message */}
      <p className='text-[13px] text-[#C0C0C0]'>{message}</p>

      {/* Regenerate button */}
      <button
        onClick={onRegenerate}
        className='self-start flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#505050] text-xs text-[#CACACA]'>
        Regenerate{" "}
        <RefreshCw
          size={13}
          strokeWidth={2}
        />
      </button>
    </div>
  );
};

interface ReminderCardProps {
  title?: string;
  message?: string;
}

export const ReminderCard = ({
  title = "Just a reminder...",
  message = "Data scientist roles usually take 2–3 weeks to respond. Hang in there and give it some time.",
}: ReminderCardProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className='relative p-4 flex flex-col gap-2 bg-[#252000] rounded-lg'>
      <div className='flex items-center justify-between '>
        <span className={cn("text-xs text-[#808080]")}>{title}</span>
        <button
          onClick={() => setVisible(false)}
          className='text-muted-foreground hover:text-foreground transition-colors'>
          <X size={16} />
        </button>
      </div>
      <p className='text-[13px] text-[#C0C0C0]'>{message}</p>
    </div>
  );
};
