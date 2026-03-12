import { DollarSign, HandCoins, Rocket, File } from "lucide-react";
import { Badge } from "../ui/badge";
import { OfferJobCardDialog } from "./offer-job-card-dialog";

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
  equity = "₹8L",
}: OfferJobCardProps) => {
  const fallbackLogo =
    demoLogos[(companyName.length + jobTitle.length) % demoLogos.length];

  return (
    <OfferJobCardDialog
      offerDate={offerDate}
      offerStatus={offerStatus}
      companyLogo={companyLogo}
      companyName={companyName}
      location={location}
      jobTitle={jobTitle}
      offerFile={offerFile}
      annualCtc={annualCtc}
      estInHand={estInHand}
      equity={equity}>
      <div className='bg-card text-card-foreground rounded-xl p-4 flex flex-col gap-4'>
        {/* Top row */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 shrink-0' />
            <Badge className='bg-transparent border font-normal border-[#383838] text-[#CECECE] p-2.5 text-xs'>
              {offerDate}
            </Badge>
          </div>
          <span className='text-xs text-[#CECECE] font-medium'>
            {offerStatus}
          </span>
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
            <span className='text-[13px] text-[#B3B3B3]'>{location}</span>
          </div>
        </div>

        {/* Job title & posted */}
        <div className='flex flex-col gap-0.5'>
          <span className='text-[#9B9B9B] text-sm font-medium'>{jobTitle}</span>
          <span className='text-xs text-muted-foreground'>{postedAgo}</span>
        </div>

        {/* Offer file badge */}
        <div>
          <span className='inline-flex items-center gap-1.5 text-xs bg-transparent border border-[#383838] text-[#CECECE] px-2 py-1 rounded-lg'>
            <File
              size={12}
              className='shrink-0'
            />
            {offerFile}
          </span>
        </div>

        {/* Compensation row */}
        <div className='flex gap-2'>
          {/* CTC + In-Hand */}
          <div className='flex flex-col gap-2.5 flex-1'>
            <div className='flex flex-col gap-0.5'>
              <span className='flex items-center gap-1.5 text-xs text-[#8A8A8A]'>
                <DollarSign
                  size={12}
                  className='shrink-0'
                />
                Annual CTC
              </span>
              <span className='text-[#CECECE] text-sm leading-tight'>
                {annualCtc}
              </span>
            </div>
            <div className='flex flex-col gap-0.5'>
              <span className='flex items-center gap-1.5 text-xs text-[#8A8A8A]'>
                <HandCoins
                  size={12}
                  className='shrink-0'
                />
                Est. In-Hand
              </span>
              <span className='text-[#CECECE] text-sm leading-tight'>
                {estInHand}
              </span>
            </div>
          </div>

          {/* Equity box */}
          <div className='flex flex-col items-center justify-center gap-1.5 bg-[#1E1E1E] rounded-xl px-4 py-3 min-w-27.5'>
            <Rocket
              size={22}
              className='fill-[#616161]  text-[#616161] shrink-0'
            />
            <span className='text-xs text-[#8A8A8A] font-medium whitespace-nowrap'>
              + {equity} Equity
            </span>
          </div>
        </div>

        {/* Clarify offer button */}
        <div className='p-[1px] rounded-lg bg-gradient-to-br from-[#FCF8FF]/50 via-[#C2C2C2]/30 to-[#8A8A8A]/30'>
          <button className='w-full rounded-lg bg-card text-[#CECECE] hover:bg-[#1E1E1E] hover:text-white text-xs py-2.5 transition-colors'>
            Clarify offer
          </button>
        </div>
      </div>
    </OfferJobCardDialog>
  );
};
