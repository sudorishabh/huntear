"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  MapPin,
  ChevronDown,
  Sparkles,
  Copy,
  Share2,
  RefreshCw,
} from "lucide-react";

interface OfferJobCardDialogProps {
  children: React.ReactNode;
  offerDate?: string;
  offerStatus?: string;
  companyLogo?: string;
  companyName?: string;
  location?: string;
  jobTitle?: string;
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

function buildAnalysis(companyName: string): string {
  return `Estimation: Target:\n$145k – $168k (94% Match). Your Distributed Systems expertise drives top-tier value.\n\nOffer Review: ${companyName} –\nCompetitive. Base is 85th percentile, but the 5% bonus is low.\n\nNegotiation Tip:\n"Given market data for Seniors, is there flexibility to move the bonus toward 10%?"`;
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className='flex items-center gap-1.5 text-sm font-medium text-[#FFFFFF] mb-3 hover:text-[#CECECE] transition-colors'>
        {title}
        <ChevronDown
          size={14}
          className={`text-[#8A8A8A] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && children}
    </div>
  );
}

function PropRow({
  label,
  value,
  pill = true,
}: {
  label: string;
  value: string;
  pill?: boolean;
}) {
  return (
    <div className='flex items-center justify-between'>
      <span className='text-[#8A8A8A] text-sm'>{label}</span>
      {pill ? (
        <span className='border border-[#2e2e2e] rounded-full px-2.5 py-0.5 text-xs text-[#CECECE]'>
          {value}
        </span>
      ) : (
        <span className='text-xs text-[#CECECE]'>{value}</span>
      )}
    </div>
  );
}

export function OfferJobCardDialog({
  children,
  offerDate = "23/4/2026",
  offerStatus = "Negotiating",
  companyLogo,
  companyName = "Company",
  location = "Remote",
  jobTitle = "Job Title",
  offerFile = "offer.pdf",
  annualCtc = "₹18,00,000",
  estInHand = "₹1,12,500 / mo",
  equity = "₹8L",
}: OfferJobCardDialogProps) {
  const [descOpen, setDescOpen] = useState(false);
  const [analysisText, setAnalysisText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const fallbackLogo =
    demoLogos[(companyName.length + jobTitle.length) % demoLogos.length];
  const logoSrc = companyLogo || fallbackLogo;

  const runAnalysis = () => {
    setGenerating(true);
    setAnalysisText("");
    const full = buildAnalysis(companyName);
    let i = 0;
    const interval = setInterval(() => {
      i += 3;
      setAnalysisText(full.slice(0, i));
      if (i >= full.length) {
        setAnalysisText(full);
        clearInterval(interval);
        setGenerating(false);
      }
    }, 18);
  };

  useEffect(() => {
    runAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyName, annualCtc]);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysisText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // derive numeric salary for display
  const offeringSalary = annualCtc;
  const salaryExpectation = estInHand;
  const equityValue = equity;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='w-[900px] max-w-[95vw] sm:max-w-[95vw] p-0 gap-0 bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden [&>button]:hidden'>
        <div className='flex h-150 min-w-0'>
          {/* ── Left panel ── */}
          <div className='flex-1 min-w-0 overflow-y-auto p-8 pr-6 dialog-scroll'>
            {/* Offer date badge */}
            <div className='inline-flex items-center gap-1.5 border border-[#2e2e2e] rounded-full px-3 py-1 text-xs text-[#CECECE] mb-6'>
              <span className='w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0' />
              {offerDate}
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
                  Round 1st
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

            {/* AI Salary & Offer Analysis */}
            <p className='text-sm text-[#FFFFFF] font-medium mb-3'>
              AI Salary &amp; Offer Analysis
            </p>

            <div className='border border-[#2a2a2a] rounded-lg overflow-hidden'>
              {/* Terminal output */}
              <div className='px-4 pt-4 pb-3 min-h-36'>
                <div className='flex items-start gap-2'>
                  <Sparkles
                    size={13}
                    className={`text-cyan-400 mt-0.5 shrink-0 ${generating ? "animate-pulse" : ""}`}
                  />
                  <pre className='text-xs text-[#C0C0C0] font-mono leading-relaxed whitespace-pre-wrap break-words flex-1'>
                    {analysisText}
                    {generating && (
                      <span className='inline-block w-1.5 h-3.5 bg-cyan-400 ml-0.5 animate-pulse align-middle' />
                    )}
                  </pre>
                </div>
              </div>

              {/* Action icons row */}
              <div className='flex items-center justify-end gap-3 px-4 py-2.5 border-t border-[#2a2a2a]'>
                <button
                  onClick={handleCopy}
                  title='Copy'
                  className='text-[#8A8A8A] hover:text-[#CECECE] transition-colors'>
                  <Copy
                    size={13}
                    className={copied ? "text-emerald-400" : ""}
                  />
                </button>
                <button
                  title='Share'
                  className='text-[#8A8A8A] hover:text-[#CECECE] transition-colors'>
                  <Share2 size={13} />
                </button>
                <button
                  onClick={runAnalysis}
                  disabled={generating}
                  title='Regenerate'
                  className='text-[#8A8A8A] hover:text-[#CECECE] transition-colors disabled:opacity-40'>
                  <RefreshCw
                    size={13}
                    className={generating ? "animate-spin" : ""}
                  />
                </button>
              </div>
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
                {offerFile}
              </button>
            </div>

            {/* Properties */}
            <CollapsibleSection title='Properties'>
              <div className='flex flex-col gap-2.5'>
                <PropRow
                  label='Status'
                  value='Interested'
                />
                <PropRow
                  label='Priority'
                  value='High'
                />
                <PropRow
                  label='Target date'
                  value={offerDate}
                />
                <PropRow
                  label='Labels'
                  value='Important'
                  pill={false}
                />
                <PropRow
                  label='Offer stage'
                  value={offerStatus}
                />
              </div>
            </CollapsibleSection>

            <Separator className='bg-[#2a2a2a]' />

            {/* Offering job */}
            <CollapsibleSection title='Offering job'>
              <div className='flex flex-col gap-2.5'>
                <PropRow
                  label='Offering salary'
                  value={offeringSalary}
                  pill={false}
                />
                <PropRow
                  label='Salary expectation'
                  value={salaryExpectation}
                  pill={false}
                />
                <PropRow
                  label='Basic %'
                  value='50%'
                />
                <PropRow
                  label='Variable Pay %'
                  value='10%'
                />
                <PropRow
                  label='PF Applicable (Y/N)'
                  value='Yes'
                />
                <PropRow
                  label='Tax Regime'
                  value='New Regime'
                />
                <PropRow
                  label='State'
                  value={location}
                />
              </div>
            </CollapsibleSection>

            <Separator className='bg-[#2a2a2a]' />

            {/* The Wealth & Perks */}
            <CollapsibleSection title='The Wealth & Perks'>
              <div className='flex flex-col gap-2.5'>
                {/* Equity row with vesting period */}
                <div className='flex items-center justify-between'>
                  <span className='text-[#8A8A8A] text-sm'>
                    Equity &amp; Stocks
                  </span>
                  <div className='flex items-center gap-1.5'>
                    <span className='text-xs text-[#CECECE]'>
                      {equityValue}
                    </span>
                    <span className='border border-[#2e2e2e] rounded-full px-2 py-0.5 text-xs text-[#CECECE] flex items-center gap-0.5'>
                      4Y
                      <ChevronDown
                        size={10}
                        className='text-[#8A8A8A]'
                      />
                    </span>
                  </div>
                </div>
                <PropRow
                  label='Flexible Work'
                  value='Hybrid'
                />
                <PropRow
                  label='Relocation required'
                  value='No'
                />
                <PropRow
                  label='Paid Time Off (PTO)'
                  value='15 Days'
                />
                <PropRow
                  label='Wellness Programs'
                  value='Yes'
                />
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
