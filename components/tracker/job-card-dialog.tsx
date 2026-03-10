"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FileText, Calendar } from "lucide-react";

interface JobCardDialogProps {
  children: React.ReactNode;
  addedLabel?: string;
  companyLogo?: string;
  companyName?: string;
  workType?: string;
  jobTitle?: string;
  matchPercent?: number;
  missingKeywords?: string[];
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

function getMatchLabel(pct: number): string {
  if (pct >= 85) return "Excellent";
  if (pct >= 70) return "Very Good";
  if (pct >= 55) return "Good";
  return "Fair";
}

export function JobCardDialog({
  children,
  addedLabel = "Added today",
  companyLogo,
  companyName = "Company",
  workType = "Remote",
  jobTitle = "Job Title",
  matchPercent = 75,
  missingKeywords = [],
}: JobCardDialogProps) {
  const fallbackLogo =
    demoLogos[(companyName.length + jobTitle.length) % demoLogos.length];

  const logoSrc = companyLogo || fallbackLogo;
  const matchLabel = getMatchLabel(matchPercent);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='w-[900px] max-w-[95vw] sm:max-w-[95vw] p-0 gap-0 bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden [&>button]:hidden'>
        <div className='flex h-150 min-w-0'>
          {/* ── Left panel: Job description ── */}
          <div className='flex-1 min-w-0 overflow-y-auto p-8 pr-6 scrollbar-thin scrollbar-thumb-[#2e2e2e]'>
            {/* Added badge */}
            <div className='inline-flex items-center gap-1.5 border border-[#2e2e2e] rounded-full px-3 py-1 text-xs text-[#CECECE] mb-6'>
              <Calendar
                size={11}
                className='text-muted-foreground'
              />
              {addedLabel}
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
                <p className='text-xs text-[#B3B3B3]'>{workType}</p>
              </div>
            </div>

            {/* Job title */}
            <h2 className='text-[#FFFFFF] text-xl font-semibold mb-0.5'>
              {jobTitle}
            </h2>
            <p className='text-sm text-[#8A8A8A] mb-5'>Full time</p>

            <Separator className='bg-[#2a2a2a] mb-5' />

            {/* Description */}
            <p className='text-sm text-[#C0C0C0] leading-relaxed mb-5'>
              {DEMO_DESCRIPTION}
            </p>

            {/* Responsibilities */}
            <p className='text-sm text-[#FFFFFF] font-medium mb-2'>
              Key Responsibilities
            </p>
            <ul className='space-y-1.5 mb-5'>
              {DEMO_RESPONSIBILITIES.map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-2 text-sm text-[#C0C0C0]'>
                  <span className='mt-1.5 w-1 h-1 rounded-full bg-[#8A8A8A] shrink-0' />
                  {item}
                </li>
              ))}
            </ul>

            {/* Qualifications */}
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

          {/* ── Vertical divider ── */}
          <div className='w-px bg-[#2a2a2a] shrink-0' />

          {/* ── Right panel: Properties + insights ── */}
          <div className='w-75 shrink-0 overflow-y-auto p-6 flex flex-col gap-6'>
            {/* Resume file pill */}
            <div className='flex justify-end'>
              <button className='flex items-center gap-1.5 border border-[#2e2e2e] rounded-md px-3 py-1.5 text-xs text-[#CECECE] hover:bg-[#242424] transition-colors'>
                <FileText size={12} />
                Designresume.pdf
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
                  <span className='border border-[#2e2e2e] rounded-full px-2.5 py-0.5 text-xs text-[#CECECE]'>
                    Interested
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
                    27/04/26
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-[#8A8A8A]'>Labels</span>
                  <span className='text-xs text-[#CECECE]'>Important</span>
                </div>
              </div>
            </div>

            <Separator className='bg-[#2a2a2a]' />

            {/* Keywords insight */}
            <div>
              <p className='text-sm font-medium text-[#FFFFFF] mb-1'>
                Keywords insight
              </p>
              <p className='text-xs text-[#8A8A8A] mb-3'>
                A few keywords don&apos;t match the job.
              </p>
              <div className='flex flex-wrap gap-1.5'>
                {missingKeywords.map((kw) => (
                  <span
                    key={kw}
                    className='border border-[#2e2e2e] rounded-full px-2.5 py-1 text-xs text-[#CECECE]'>
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <Separator className='bg-[#2a2a2a]' />

            {/* Job matching */}
            <div>
              <p className='text-sm font-medium text-[#FFFFFF] mb-1'>
                Job matching
              </p>
              <p className='text-xs text-[#8A8A8A] mb-4'>
                Job match percentage and hiring chances.
              </p>

              <div className='flex items-center gap-3 mb-2'>
                <span className='text-3xl font-bold text-[#FFFFFF]'>
                  {matchPercent}%
                </span>
                <div className='w-px h-8 bg-[#2e2e2e]' />
                <div>
                  <p className='text-sm font-medium text-[#FFFFFF]'>
                    {matchLabel}
                  </p>
                  <p className='text-xs text-[#8A8A8A] leading-snug'>
                    Match your resume 100% with the right keywords.
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className='h-1.5 w-full rounded-full bg-[#2a2a2a] overflow-hidden mt-3'>
                <div
                  className='h-full rounded-full bg-[#C5AB01]'
                  style={{ width: `${matchPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
