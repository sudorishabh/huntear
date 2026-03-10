"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  MapPin,
  RefreshCw,
  Sparkles,
  ChevronDown,
} from "lucide-react";

interface InterviewingJobCardDialogProps {
  children: React.ReactNode;
  interviewDate?: string;
  companyLogo?: string;
  companyName?: string;
  location?: string;
  jobTitle?: string;
  resumeFile?: string;
  interviewRound?: string;
  notes?: string;
  aiNews?: string;
  aiNewsSentiment?: "good" | "bad" | "neutral";
}

const demoLogos = [
  "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=120&q=80",
];

const DEMO_DESCRIPTION = `We are seeking a skilled and motivated Software Developer to design, develop, test, and maintain high-quality software applications. The ideal candidate will work closely with cross-functional teams to deliver scalable and efficient solutions that meet business needs.`;

const DEMO_RESPONSIBILITIES = [
  "Design, code, test, and debug software applications",
  "Collaborate with designers, product managers, and other developers",
  "Maintain and improve existing systems",
  "Write clean, well-documented code",
  "Troubleshoot technical issues and implement fixes",
  "Participate in code reviews and development planning",
];

const DEMO_QUALIFICATIONS = [
  "Bachelor's degree in Computer Science or related field (or equivalent experience)",
  "Proficiency in at least one programming language (e.g., Python, Java, JavaScript)",
  "Basic understanding of databases and APIs",
];

const DEMO_NEWS = [
  "About one-third of customer support in the U.S. and Canada is now handled by AI, with global rollout plans.",
  "The company appointed a former Big Tech AI leader as Chief Technology Officer, underscoring its AI focus.",
  "Offering incentives (up to ~$750–$1,000 USD) to new hires in key cities to meet surging demand.",
];

const SUGGESTED_NOTES = [
  "Focus on system design principles and scalability trade-offs.",
  "Prepare SQL case study with optimisation examples.",
  "Review behavioural questions around cross-functional collaboration.",
  "Brush up on product metrics and A/B testing frameworks.",
];

export function InterviewingJobCardDialog({
  children,
  interviewDate = "23/03/26",
  companyLogo,
  companyName = "Company",
  location = "Remote",
  jobTitle = "Job Title",
  resumeFile = "resume.pdf",
  interviewRound = "Round 1",
  notes,
  aiNews,
  aiNewsSentiment = "neutral",
}: InterviewingJobCardDialogProps) {
  const [descOpen, setDescOpen] = useState(false);
  const [noteText, setNoteText] = useState(notes ?? "");
  const [suggesting, setSuggesting] = useState(false);

  const [generating, setGenerating] = useState(false);
  const [news, setNews] = useState<string[]>([]);

  const fallbackLogo =
    demoLogos[(companyName.length + jobTitle.length) % demoLogos.length];
  const logoSrc = companyLogo || fallbackLogo;

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const loadNews = () => {
    setGenerating(true);
    setNews([]);
    setTimeout(() => {
      setGenerating(false);
      setNews(aiNews ? [aiNews] : DEMO_NEWS);
    }, 1400);
  };

  useEffect(() => {
    loadNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyName, aiNews]);

  const handleSuggest = () => {
    setSuggesting(true);
    setTimeout(() => {
      setSuggesting(false);
      const suggestion =
        SUGGESTED_NOTES[
          (companyName.length + jobTitle.length) % SUGGESTED_NOTES.length
        ];
      setNoteText(suggestion);
    }, 900);
  };

  const sentimentDot =
    aiNewsSentiment === "good"
      ? "bg-emerald-400"
      : aiNewsSentiment === "bad"
        ? "bg-red-400"
        : "bg-[#8A8A8A]";

  const roundLabel = interviewRound?.toLowerCase().includes("1")
    ? "First"
    : interviewRound?.toLowerCase().includes("2")
      ? "Second"
      : interviewRound?.toLowerCase().includes("3")
        ? "Third"
        : (interviewRound ?? "First");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='w-[900px] max-w-[95vw] sm:max-w-[95vw] p-0 gap-0 bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden [&>button]:hidden'>
        <div className='flex h-150 min-w-0'>
          {/* ── Left panel ── */}
          <div className='flex-1 min-w-0 overflow-y-auto p-8 pr-6 dialog-scroll'>
            {/* Interview date badge */}
            <div className='inline-flex items-center gap-1.5 border border-[#2e2e2e] rounded-full px-3 py-1 text-xs text-[#CECECE] mb-6'>
              <span className='w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0' />
              Interview {interviewDate}
            </div>

            {/* Company + logo */}
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0'>
                <img
                  src={logoSrc}
                  alt={companyName}
                  className='w-full h-full object-cover'
                />
              </div>
              <div>
                <p className='text-[#FFFFFF] font-medium text-sm'>
                  {companyName}
                </p>
                <p className='text-xs text-[#B3B3B3] flex items-center gap-1'>
                  <MapPin size={10} />
                  {location}
                </p>
              </div>
            </div>

            {/* Job title */}
            <h2 className='text-[#FFFFFF] text-xl font-semibold mb-0.5'>
              {jobTitle}
            </h2>
            <p className='text-sm text-[#8A8A8A] mb-5'>Full time</p>

            <Separator className='bg-[#2a2a2a] mb-5' />

            {/* Job Description accordion */}
            <div className='border border-[#2a2a2a] rounded-lg mb-6 overflow-hidden'>
              <button
                onClick={() => setDescOpen((v) => !v)}
                className='w-full flex items-center justify-between px-4 py-3 text-sm text-[#CECECE] hover:bg-[#1c1c1c] transition-colors'>
                <span className='flex items-center gap-2'>
                  Job Description
                  <ChevronDown
                    size={14}
                    className={`text-[#8A8A8A] transition-transform duration-200 ${descOpen ? "rotate-180" : ""}`}
                  />
                </span>
                <span className='text-xs border border-[#2e2e2e] rounded px-2 py-0.5 text-[#CECECE]'>
                  {roundLabel} round
                </span>
              </button>

              {descOpen && (
                <div className='px-4 pb-4 pt-1 border-t border-[#2a2a2a]'>
                  <p className='text-sm text-[#C0C0C0] leading-relaxed mb-4'>
                    {DEMO_DESCRIPTION}
                  </p>
                  <p className='text-sm text-[#FFFFFF] font-medium mb-2'>
                    Key Responsibilities
                  </p>
                  <ul className='space-y-1.5 mb-4'>
                    {DEMO_RESPONSIBILITIES.map((item) => (
                      <li
                        key={item}
                        className='flex items-start gap-2 text-sm text-[#C0C0C0]'>
                        <span className='mt-1.5 w-1 h-1 rounded-full bg-[#8A8A8A] shrink-0' />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className='text-sm text-[#FFFFFF] font-medium mb-2'>
                    Qualifications
                  </p>
                  <ul className='space-y-1.5'>
                    {DEMO_QUALIFICATIONS.map((item) => (
                      <li
                        key={item}
                        className='flex items-start gap-2 text-sm text-[#C0C0C0]'>
                        <span className='mt-1.5 w-1 h-1 rounded-full bg-[#8A8A8A] shrink-0' />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Notes section */}
            <p className='text-sm text-[#FFFFFF] font-medium mb-3'>Notes:</p>

            <div className='border border-[#2a2a2a] rounded-lg overflow-hidden'>
              {/* Meta row */}
              <div className='flex items-center gap-4 px-4 py-2.5 border-b border-[#2a2a2a] flex-wrap'>
                <span className='inline-flex items-center gap-1.5 border border-[#2e2e2e] rounded-full px-2.5 py-0.5 text-xs text-[#CECECE]'>
                  <span className='text-[#8A8A8A]'>Round:</span> {roundLabel}
                </span>
                <span className='text-xs text-[#8A8A8A]'>
                  <span className='text-[#CECECE]'>Interview date:</span>{" "}
                  {interviewDate}
                </span>
                <span className='text-xs text-[#8A8A8A]'>
                  <span className='text-[#CECECE]'>Last modified:</span> {today}
                </span>
              </div>

              {/* AI suggest row */}
              <div className='flex items-center justify-between px-4 py-2.5 border-b border-[#2a2a2a]'>
                <div className='flex items-center gap-2 text-xs text-[#8A8A8A] font-mono'>
                  <Sparkles
                    size={12}
                    className={`text-cyan-400 ${suggesting ? "animate-pulse" : ""}`}
                  />
                  Suggest main idea from overall notes
                </div>
                <button
                  onClick={handleSuggest}
                  disabled={suggesting}
                  className='text-xs bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white px-3 py-1 rounded transition-colors'>
                  {suggesting ? "Thinking..." : "Suggest"}
                </button>
              </div>

              {/* Textarea */}
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder='"Jot down your questions for the interviewer, or summarize how it went…"'
                className='w-full bg-transparent text-sm text-[#C0C0C0] placeholder:text-[#555555] placeholder:italic px-4 py-3 resize-none outline-none min-h-28'
              />
            </div>
          </div>

          {/* ── Vertical divider ── */}
          <div className='w-px bg-[#2a2a2a] shrink-0' />

          {/* ── Right panel ── */}
          <div className='w-75 shrink-0 overflow-y-auto p-6 flex flex-col gap-6 dialog-scroll'>
            {/* Resume file pill */}
            <div className='flex justify-end'>
              <button className='flex items-center gap-1.5 border border-[#2e2e2e] rounded-md px-3 py-1.5 text-xs text-[#CECECE] hover:bg-[#242424] transition-colors'>
                <FileText size={12} />
                {resumeFile}
              </button>
            </div>

            {/* Properties */}
            <div>
              <p className='text-sm font-medium text-[#FFFFFF] mb-3'>
                Properties
              </p>
              <div className='flex flex-col gap-2.5 text-sm'>
                <div className='flex items-center justify-between'>
                  <span className='text-[#8A8A8A]'>Status</span>
                  <span className='flex items-center gap-1.5 border border-[#2e2e2e] rounded-full px-2.5 py-0.5 text-xs text-[#CECECE]'>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${sentimentDot}`}
                    />
                    Interviewing
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-[#8A8A8A]'>Priority</span>
                  <span className='border border-[#2e2e2e] rounded-full px-2.5 py-0.5 text-xs text-[#CECECE]'>
                    High
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-[#8A8A8A]'>Target date</span>
                  <span className='border border-[#2e2e2e] rounded-full px-2.5 py-0.5 text-xs text-[#CECECE]'>
                    {interviewDate}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-[#8A8A8A]'>Labels</span>
                  <span className='text-xs text-[#CECECE]'>Important</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-[#8A8A8A]'>Round</span>
                  <span className='border border-[#2e2e2e] rounded-full px-2.5 py-0.5 text-xs text-[#CECECE]'>
                    {roundLabel}
                  </span>
                </div>
              </div>
            </div>

            <Separator className='bg-[#2a2a2a]' />

            {/* About company */}
            <div>
              <p className='text-sm font-medium text-[#FFFFFF] mb-1'>
                About company
              </p>
              <p className='text-xs text-[#8A8A8A] mb-3'>
                Know company better before going in it.
              </p>

              <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-2 text-xs text-[#8A8A8A] font-mono'>
                  <Sparkles
                    size={12}
                    className={`text-cyan-400 ${generating ? "animate-pulse" : ""}`}
                  />
                  {generating ? "Generating news..." : "Latest news"}
                </div>
                <button
                  onClick={loadNews}
                  disabled={generating}
                  className='text-[#8A8A8A] hover:text-[#CECECE] transition-colors disabled:opacity-40'>
                  <RefreshCw
                    size={12}
                    className={generating ? "animate-spin" : ""}
                  />
                </button>
              </div>

              {!generating && news.length > 0 && (
                <ul className='space-y-3'>
                  {news.map((item, i) => (
                    <li
                      key={i}
                      className='flex items-start gap-2 text-xs text-[#C0C0C0] leading-relaxed'>
                      <span className='mt-1.5 w-1 h-1 rounded-full bg-[#8A8A8A] shrink-0' />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {generating && (
                <div className='space-y-2'>
                  {[70, 90, 60].map((w) => (
                    <div
                      key={w}
                      className='h-3 rounded-full bg-[#242424] animate-pulse'
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
