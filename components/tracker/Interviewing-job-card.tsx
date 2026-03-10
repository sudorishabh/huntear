import { MoreVertical, CornerDownRight, File } from "lucide-react";
import { Badge } from "../ui/badge";
import { InterviewingJobCardDialog } from "./interviewing-job-card-dialog";

interface InterviewingJobCardProps {
  interviewDate?: string;
  companyLogo?: string;
  companyName?: string;
  location?: string;
  jobTitle?: string;
  postedAgo?: string;
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

const sentimentColor = {
  good: "text-emerald-400",
  bad: "text-red-400",
  neutral: "text-[#CECECE]",
};

const fallbackNews = [
  "Company ranked in top 50 best places to work globally for 2026.",
  "New product launch drove a 28% spike in daily active users last quarter.",
  "Engineering blog post on distributed systems went viral — 40k+ reads.",
  "Remote-first policy extended permanently; hiring across all time zones.",
  "Acquired a leading AI startup for $120M to boost ML capabilities.",
  "Just crossed 10M customers milestone — posted on official LinkedIn.",
  "Featured in Time's '100 most influential companies' list this year.",
  "Open-sourced their internal data pipeline tool — trending on GitHub.",
];

export const InterviewingJobCard = ({
  interviewDate = "20/02/2026",
  companyLogo,
  companyName = "Airbnb",
  location = "India",
  jobTitle = "Data Scientist",
  postedAgo = "2d+",
  resumeFile = "myresume.pdf",
  interviewRound = "Round 1",
  notes,
  aiNews,
  aiNewsSentiment = "neutral",
}: InterviewingJobCardProps) => {
  const resolvedNews =
    aiNews ??
    fallbackNews[(companyName.length + jobTitle.length) % fallbackNews.length];
  const fallbackLogo =
    demoLogos[(companyName.length + jobTitle.length) % demoLogos.length];

  return (
    <InterviewingJobCardDialog
      interviewDate={interviewDate}
      companyLogo={companyLogo}
      companyName={companyName}
      location={location}
      jobTitle={jobTitle}
      resumeFile={resumeFile}
      interviewRound={interviewRound}
      notes={notes}
      aiNews={aiNews}
      aiNewsSentiment={aiNewsSentiment}>
      <div className='bg-card text-card-foreground rounded-xl p-4 flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 shrink-0' />
            <Badge className='bg-transparent border font-normal border-[#383838] text-[#CECECE] p-2.5 text-xs'>
              {interviewDate}
            </Badge>
          </div>
          <button className='text-muted-foreground hover:text-foreground transition-colors'>
            <MoreVertical
              className='text-gray-200'
              size={18}
            />
          </button>
        </div>

        {/* Company info */}
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center shrink-0'>
            <img
              src={companyLogo || fallbackLogo}
              alt={companyName}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='flex flex-col'>
            <span className='text-[#FFFFFF] font-medium'>{companyName}</span>
            <span className='text-[13px] text-[#B3B3B3]'>{location}</span>
          </div>
        </div>

        {/* Job title & posted */}
        <div className='flex flex-col gap-0.5'>
          <span className='text-[#FFFFFF] text-sm'>{jobTitle}</span>
          <span className='text-xs text-muted-foreground'>{postedAgo}</span>
        </div>

        {/* Resume file badge */}
        <div>
          <span className='inline-flex items-center gap-1.5 text-xs bg-transparent border border-[#383838] text-[#CECECE] px-2 py-1 rounded-lg'>
            <File
              size={12}
              className='shrink-0'
            />
            {resumeFile}
          </span>
        </div>

        {/* Interview round + notes */}
        <div className='flex flex-col gap-1.5'>
          <span className='inline-flex items-center text-sm text-[#FFFFFF] bg-[#1F1F1F] px-3 py-1 rounded-lg w-fit'>
            {interviewRound}
          </span>
          <span className='flex items-center gap-1.5 text-xs text-[#8A8A8A]'>
            <CornerDownRight
              size={12}
              className='shrink-0 text-[#555555]'
            />
            {notes ?? "Write your notes"}
          </span>
        </div>

        {/* AI news box */}
        <div className='bg-[#1F1F1F] rounded-lg px-3 py-3 flex flex-col gap-1'>
          <span className='text-xs text-[#848484]'>
            Recent news about {companyName}
          </span>
          <span
            className={`text-sm leading-snug text-[13px] text-[#B7B7B7] ${sentimentColor[aiNewsSentiment]}`}>
            {resolvedNews}
          </span>
        </div>
      </div>
    </InterviewingJobCardDialog>
  );
};
