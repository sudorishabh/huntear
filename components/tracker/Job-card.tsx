import { MoreVertical } from "lucide-react";
import { Badge } from "../ui/badge";

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
  const demoLogos = [
    "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=120&q=80",
  ];

  const fallbackLogo =
    demoLogos[(companyName.length + jobTitle.length) % demoLogos.length];

  return (
    <div className='bg-card text-card-foreground rounded-lg p-4 flex flex-col gap-4'>
      {/* Top row */}
      <div className='flex items-center justify-between'>
        {/* <span className='text-xs font-medium bg-muted text-muted-foreground px-3 py-1 rounded-full'>
          {addedLabel}
        </span> */}
        <Badge className='bg-transparent border font-normal border-[#383838] text-[#CECECE] p-2.5 text-xs'>
          {addedLabel}
        </Badge>
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
          <span className='text-[#FFFFFF] font-semibold'>{companyName}</span>
          <span className='text-[13px] text-[#B3B3B3]'>{workType}</span>
        </div>
      </div>

      {/* Job title & posted */}
      <div className='flex flex-col gap-0.5'>
        <span className='text-[#9B9B9B] text-sm font-medium'>{jobTitle}</span>
        <span className='text-xs text-muted-foreground'>{postedAgo}</span>
      </div>

      {/* Match progress */}
      <div className='flex flex-col gap-1.5'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-[#8A8A8A]'>Job profile match</span>
          <span className='font-medium text-[#CECECE]'>{matchPercent}%</span>
        </div>
        <div className='h-1 w-full rounded-full bg-muted overflow-hidden'>
          <div
            className='h-full rounded-full bg-[#C5AB01]'
            style={{ width: `${matchPercent}%` }}
          />
        </div>
      </div>

      {/* Missing keywords */}
      <div className='flex flex-col gap-2'>
        <span className='text-xs text-[#8A8A8A]'>Missing keyword</span>
        <div className='flex flex-wrap gap-1'>
          {missingKeywords.map((kw) => (
            <span
              key={kw}
              className='text-xs bg-[#292929] text-[#CECECE] px-3 py-1 rounded'>
              {kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
