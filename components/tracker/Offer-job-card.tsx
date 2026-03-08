import React from "react";
import { FileText, DollarSign, HandCoins, Rocket } from "lucide-react";
import { Badge } from "../ui/badge";

interface OfferJobCardProps {
  offerDate?: string;
  offerStatus?: string;
  companyLogo?: string;
  companyName?: string;
  location?: string;
  jobTitle?: string;
  postedAgo?: string;
  offerFile?: string;
  annualCtc?: string;
  estInHand?: string;
  equity?: string;
}

const demoLogos = [
  "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=120&q=80",
];

export const OfferJobCard = ({
  offerDate = "20/02/2026",
  offerStatus = "Negotiating",
  companyLogo,
  companyName = "Airbnb",
  location = "India",
  jobTitle = "Data Scientist",
  postedAgo = "2d+",
  offerFile = "offer.pdf",
  annualCtc = "₹18,00,000",
  estInHand = "₹1,12,500 / mo",
  equity,
}: OfferJobCardProps) => {
  const fallbackLogo =
    demoLogos[(companyName.length + jobTitle.length) % demoLogos.length];

  return (
    <div className='bg-card text-card-foreground rounded-xl p-4 flex flex-col gap-4'>
      {/* Top row */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-emerald-400 shrink-0' />
          <Badge className='bg-transparent border font-normal border-[#383838] text-[#CECECE] p-2.5 text-xs'>
            {offerDate}
          </Badge>
        </div>
        <span className='text-xs text-[#CECECE] font-medium'>{offerStatus}</span>
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
        <span className='text-[#FFFFFF] text-[15px] font-medium'>{jobTitle}</span>
        <span className='text-xs text-muted-foreground'>{postedAgo}</span>
      </div>

      {/* Offer file badge */}
      <div>
        <span className='inline-flex items-center gap-1.5 text-xs bg-transparent border border-[#383838] text-[#CECECE] px-3 py-1.5 rounded-full'>
          <FileText size={12} className='shrink-0' />
          {offerFile}
        </span>
      </div>

      {/* Compensation row */}
      <div className='flex gap-2'>
        {/* CTC + In-Hand */}
        <div className='flex flex-col gap-2.5 flex-1'>
          <div className='flex flex-col gap-0.5'>
            <span className='flex items-center gap-1.5 text-xs text-[#8A8A8A]'>
              <DollarSign size={12} className='shrink-0' />
              Annual CTC
            </span>
            <span className='text-[#FFFFFF] text-base font-semibold leading-tight'>
              {annualCtc}
            </span>
          </div>
          <div className='flex flex-col gap-0.5'>
            <span className='flex items-center gap-1.5 text-xs text-[#8A8A8A]'>
              <HandCoins size={12} className='shrink-0' />
              Est. In-Hand
            </span>
            <span className='text-[#CECECE] text-sm font-medium leading-tight'>
              {estInHand}
            </span>
          </div>
        </div>

        {/* Equity box */}
        {equity && (
          <div className='flex flex-col items-center justify-center gap-1.5 bg-[#1E1E1E] rounded-xl px-4 py-3 min-w-27.5'>
            <Rocket size={22} className='text-[#555555]' />
            <span className='text-xs text-[#CECECE] font-medium whitespace-nowrap'>
              + {equity} Equity
            </span>
          </div>
        )}
      </div>

      {/* Clarify offer button */}
      <button className='w-full rounded-lg border border-[#2E2E2E] text-[#CECECE] hover:bg-[#1E1E1E] hover:text-white text-sm font-medium py-2.5 transition-colors'>
        Clarify offer
      </button>
    </div>
  );
};
