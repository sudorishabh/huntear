import React from "react";
import { MoreVertical } from "lucide-react";

interface JobCardProps {
  addedLabel?: string;
  companyLogo?: string;
  companyName?: string;
  workType?: string;
  jobTitle?: string;
  postedAgo?: string;
  matchPercent?: number;
  missingKeywords?: string[];
}

export const JobCard = ({
  addedLabel = "Added today",
  companyLogo,
  companyName = "Airbnb",
  workType = "Hybrid / Remote",
  jobTitle = "Data Scientist",
  postedAgo = "2d+",
  matchPercent = 45,
  missingKeywords = [
    "Data wrangling",
    "A/B testing",
    "SQL",
    "Python",
    "Statistical modeling",
  ],
}: JobCardProps) => {
  return (
    <div className='bg-card text-card-foreground rounded-2xl p-4 flex flex-col gap-4 w-72 ring-1 ring-foreground/10'>
      {/* Top row */}
      <div className='flex items-center justify-between'>
        <span className='text-xs font-medium bg-muted text-muted-foreground px-3 py-1 rounded-full'>
          {addedLabel}
        </span>
        <button className='text-muted-foreground hover:text-foreground transition-colors'>
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Company info */}
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 rounded-xl overflow-hidden bg-muted flex items-center justify-center shrink-0'>
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={companyName}
              className='w-full h-full object-cover'
            />
          ) : (
            <span className='text-lg font-bold text-muted-foreground'>
              {companyName.charAt(0)}
            </span>
          )}
        </div>
        <div className='flex flex-col'>
          <span className='font-bold text-base leading-tight'>
            {companyName}
          </span>
          <span className='text-sm text-muted-foreground'>{workType}</span>
        </div>
      </div>

      {/* Job title & posted */}
      <div className='flex flex-col gap-0.5'>
        <span className='font-bold text-lg leading-snug'>{jobTitle}</span>
        <span className='text-sm text-muted-foreground'>{postedAgo}</span>
      </div>

      {/* Match progress */}
      <div className='flex flex-col gap-1.5'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-muted-foreground'>Job profile match</span>
          <span className='font-medium'>{matchPercent}%</span>
        </div>
        <div className='h-1.5 w-full rounded-full bg-muted overflow-hidden'>
          <div
            className='h-full rounded-full bg-yellow-400'
            style={{ width: `${matchPercent}%` }}
          />
        </div>
      </div>

      {/* Missing keywords */}
      <div className='flex flex-col gap-2'>
        <span className='text-sm text-muted-foreground'>Missing keyword</span>
        <div className='flex flex-wrap gap-2'>
          {missingKeywords.map((kw) => (
            <span
              key={kw}
              className='text-xs font-medium bg-muted text-foreground px-3 py-1 rounded-lg'>
              {kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
