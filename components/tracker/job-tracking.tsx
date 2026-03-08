"use client";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { JobCard } from "./job-card";
import { AppliedJobCard } from "./Applied-job-card";
import { InterviewingJobCard } from "./Interviewing-job-card";
import { OfferJobCard } from "./Offer-job-card";
import { AIInfoCard, ReminderCard } from "./ai-info-card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Share2, Plus, SlidersHorizontal, CirclePlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";

const COLUMNS = [
  { id: "interested", label: "Interested" },
  { id: "applied", label: "Applied" },
  { id: "interviewing", label: "Interviewing" },
  { id: "offers", label: "Offers" },
];

type DemoJobCard = {
  id: string;
  addedLabel: string;
  companyLogo: string;
  companyName: string;
  workType: string;
  jobTitle: string;
  postedAgo: string;
  matchPercent: number;
  missingKeywords: string[];
  // applied-column extras
  appliedDate?: string;
  location?: string;
  resumeFile?: string;
  aiNews?: string;
  aiNewsSentiment?: "good" | "bad" | "neutral";
  // interviewing-column extras
  interviewDate?: string;
  interviewRound?: string;
  notes?: string;
  // offers-column extras
  offerDate?: string;
  offerStatus?: string;
  offerFile?: string;
  annualCtc?: string;
  estInHand?: string;
  equity?: string;
};

const initialData: Record<string, DemoJobCard[]> = {
  interested: [
    {
      id: "task-1",
      addedLabel: "Added today",
      companyLogo:
        "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=120&q=80",
      companyName: "Notion",
      workType: "Remote",
      jobTitle: "Product Data Analyst",
      postedAgo: "3h",
      matchPercent: 78,
      missingKeywords: ["dbt", "Looker", "A/B testing"],
    },
    {
      id: "task-2",
      addedLabel: "Added today",
      companyLogo:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=120&q=80",
      companyName: "Canva",
      workType: "Hybrid",
      jobTitle: "Data Scientist II",
      postedAgo: "6h",
      matchPercent: 66,
      missingKeywords: ["Bayesian stats", "Airflow", "NLP"],
    },
    {
      id: "task-3",
      addedLabel: "Added yesterday",
      companyLogo:
        "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?auto=format&fit=crop&w=120&q=80",
      companyName: "Stripe",
      workType: "Remote",
      jobTitle: "Risk Analytics Specialist",
      postedAgo: "1d",
      matchPercent: 71,
      missingKeywords: ["Fraud models", "PySpark", "Kafka"],
    },
  ],
  applied: [
    {
      id: "task-4",
      addedLabel: "Applied today",
      companyLogo:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=120&q=80",
      companyName: "Figma",
      workType: "Hybrid / Remote",
      jobTitle: "Growth Data Analyst",
      postedAgo: "4h",
      matchPercent: 83,
      missingKeywords: ["Amplitude", "Mixpanel", "Experiment design"],
      appliedDate: "04/03/2026",
      location: "San Francisco, US",
      resumeFile: "figma_resume.pdf",
      aiNews: "Funding: Series C ($100M) raised 3 months ago.",
      aiNewsSentiment: "good",
    },
    {
      id: "task-5",
      addedLabel: "Applied yesterday",
      companyLogo:
        "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=120&q=80",
      companyName: "Shopify",
      workType: "Remote",
      jobTitle: "Senior BI Analyst",
      postedAgo: "2d",
      matchPercent: 74,
      missingKeywords: ["Snowflake", "Finance metrics", "GA4"],
      appliedDate: "01/03/2026",
      location: "Ottawa, Canada",
      resumeFile: "shopify_resume.pdf",
      aiNews: "TikTok Shop partnership announced — merchant revenues up 40%.",
      aiNewsSentiment: "good",
    },
    {
      id: "task-6",
      addedLabel: "Applied 2d ago",
      companyLogo:
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=120&q=80",
      companyName: "Atlassian",
      workType: "Hybrid",
      jobTitle: "ML Engineer",
      postedAgo: "3d",
      matchPercent: 69,
      missingKeywords: ["MLOps", "Docker", "Kubernetes"],
      appliedDate: "28/02/2026",
      location: "Sydney, Australia",
      resumeFile: "atlassian_resume.pdf",
      aiNews: "Layoffs: ~500 roles cut last month across cloud division.",
      aiNewsSentiment: "bad",
    },
    {
      id: "task-7",
      addedLabel: "Applied 3d ago",
      companyLogo:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=120&q=80",
      companyName: "Razorpay",
      workType: "On-site",
      jobTitle: "Analytics Engineer",
      postedAgo: "4d",
      matchPercent: 80,
      missingKeywords: ["Great Expectations", "Terraform", "Datadog"],
      appliedDate: "24/02/2026",
      location: "Bengaluru, India",
      resumeFile: "razorpay_resume.pdf",
      aiNews: "Series F ($375M) closed — valuation at $7.5B, 6 months ago.",
      aiNewsSentiment: "good",
    },
  ],
  interviewing: [
    {
      id: "task-8",
      addedLabel: "Interview tomorrow",
      companyLogo:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=120&q=80",
      companyName: "Airbnb",
      workType: "Remote",
      jobTitle: "Marketplace Data Scientist",
      postedAgo: "5d",
      matchPercent: 88,
      missingKeywords: ["Causal inference", "Geo analysis", "ETL"],
      interviewDate: "10/03/2026",
      location: "Remote",
      resumeFile: "airbnb_resume.pdf",
      interviewRound: "Round 1",
      notes: "Focus on product sense & SQL case study.",
      aiNews: "Airbnb launches 'Icons' experience tier — strong Q4 bookings.",
      aiNewsSentiment: "good",
    },
    {
      id: "task-9",
      addedLabel: "Interview this week",
      companyLogo:
        "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=120&q=80",
      companyName: "NVIDIA",
      workType: "Hybrid",
      jobTitle: "Applied ML Scientist",
      postedAgo: "1w",
      matchPercent: 76,
      missingKeywords: ["CUDA", "LLM eval", "Distributed training"],
      interviewDate: "12/03/2026",
      location: "Santa Clara, US",
      resumeFile: "nvidia_resume.pdf",
      interviewRound: "Round 2",
      notes: "System design round — prepare GPU memory arch.",
      aiNews: "NVIDIA H200 demand exceeds supply; revenue guidance raised 20%.",
      aiNewsSentiment: "good",
    },
    {
      id: "task-10",
      addedLabel: "Interview this week",
      companyLogo:
        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=120&q=80",
      companyName: "Zomato",
      workType: "On-site",
      jobTitle: "Decision Scientist",
      postedAgo: "1w",
      matchPercent: 73,
      missingKeywords: ["Pricing models", "Forecasting", "BigQuery"],
      interviewDate: "14/03/2026",
      location: "Gurugram, India",
      resumeFile: "zomato_resume.pdf",
      interviewRound: "Round 3",
      notes: "Final round with VP — business case presentation.",
      aiNews:
        "Zomato acquires Blinkit stake raised; quick commerce up 55% YoY.",
      aiNewsSentiment: "good",
    },
  ],
  offers: [
    {
      id: "task-11",
      addedLabel: "Offer received",
      companyLogo:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=120&q=80",
      companyName: "Microsoft",
      workType: "Hybrid",
      jobTitle: "Data Analyst",
      postedAgo: "2w",
      matchPercent: 92,
      missingKeywords: ["Power BI", "Azure Synapse", "DAX"],
      offerDate: "20/02/2026",
      offerStatus: "Negotiating",
      location: "Hyderabad, India",
      offerFile: "offer_microsoft.pdf",
      annualCtc: "₹28,00,000",
      estInHand: "₹1,75,000 / mo",
      equity: "₹12L",
    },
    {
      id: "task-12",
      addedLabel: "Offer negotiation",
      companyLogo:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=120&q=80",
      companyName: "Adobe",
      workType: "Remote",
      jobTitle: "Senior Product Analyst",
      postedAgo: "2w",
      matchPercent: 89,
      missingKeywords: ["Retention models", "Segment", "Roadmap analytics"],
      offerDate: "05/03/2026",
      offerStatus: "Accepted",
      location: "Noida, India",
      offerFile: "offer_adobe.pdf",
      annualCtc: "₹22,00,000",
      estInHand: "₹1,37,500 / mo",
      equity: "₹8L",
    },
  ],
};

export const JobTracking = () => {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;
    const sourceItems = Array.from(columns[sourceCol]);
    const destItems = Array.from(columns[destCol]);
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({ ...columns, [sourceCol]: sourceItems });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [sourceCol]: sourceItems,
        [destCol]: destItems,
      });
    }
  };

  return (
    <div className='flex flex-col h-full'>
      {/* ── Top search bar ── */}
      {/* <div className='flex items-center justify-between px-6 py-3 border-b border-border'></div> */}

      {/* ── Page title ── */}

      {/* ── Tabs + Action buttons ── */}
      <div className='flex items-center justify-between px-6 pb-4'>
        {/* Tabs */}
        <div className='flex items-center gap-2'>
          <Tabs
            defaultValue='overview'
            className='w-60'>
            <TabsList className='bg-transparent flex gap-2'>
              <TabsTrigger
                value='overview'
                className='p-4 border-0 bg-[#191919] text-xs text-[#CFCFCF]'>
                Overview
                <span className='bg-gray-800 rounded-full size-5 flex items-center justify-center border text-[11px]'>
                  12
                </span>
              </TabsTrigger>
              <TabsTrigger
                value='analytics'
                className='p-4 border-0 bg-[#191919] text-xs text-[#CFCFCF]'>
                Analytics
                <span className='bg-gray-800 rounded-full size-5 flex items-center justify-center border text-[11px]'>
                  3
                </span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value='overview'>
              {/* <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  View your key metrics and recent project activity. Track
                  progress across all your active projects.
                </CardDescription>
              </CardHeader>
              <CardContent className='text-sm text-muted-foreground'>
                You have 12 active projects and 3 pending tasks.
              </CardContent>
            </Card> */}
            </TabsContent>
            <TabsContent value='analytics'>
              {/* <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Track performance and user engagement metrics. Monitor trends
                  and identify growth opportunities.
                  </CardDescription>
                  </CardHeader>
                  <CardContent className='text-sm text-muted-foreground'>
                  Page views are up 25% compared to last month.
                  </CardContent>
            </Card> */}
            </TabsContent>
          </Tabs>
          <div className='w-48 flex items-center gap-2'>
            <Input
              placeholder='Type/search...'
              className='h-9 border px-4 text-sm'
            />
            <button className='p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'>
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>
        {/* <div className='flex items-center gap-2'>
          <button
            onClick={() => setActiveTab("active")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
              ${
                activeTab === "active"
                  ? "border-foreground/40 text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
            Active <span className='text-muted-foreground font-normal'>3</span>
          </button>
          <button
            onClick={() => setActiveTab("archive")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
              ${
                activeTab === "archive"
                  ? "border-foreground/40 text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
            Archive{" "}
            <span className='text-muted-foreground font-normal'>14</span>
          </button>
        </div> */}

        {/* Action buttons */}
        <div className='flex items-center gap-2 w-60'>
          {/* <button className='flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors'>
            Export <Share2 size={14} />
          </button>
          <button className='flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-black transition-colors'>
            Add Job{" "}
            <Plus
              size={15}
              strokeWidth={2.5}
            />
          </button> */}
          <Button variant='outline'>
            Export <Share2 size={14} />
          </Button>
          <Button className=' bg-blue-500 hover:bg-blue-400 text-white transition-colors'>
            Add Job{" "}
            <Plus
              size={15}
              strokeWidth={2.5}
            />
          </Button>
        </div>
      </div>

      <Separator />

      {/* ── Kanban board ── */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-4 gap-0 flex-1 overflow-x-auto px-2 pt-4'>
          {COLUMNS.map((col) => (
            <Droppable
              droppableId={col.id}
              key={col.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className=' flex flex-col gap-3 px-2.5 min-h-100'>
                  {/* Column header */}
                  <div className='flex items-center gap-2 mb-1'>
                    <h2 className='text-sm'>{col.label}</h2>
                    <span
                      className='text-xs 
                    bg-gray-800 rounded size-4.5 text-muted-foreground font-medium flex items-center justify-center'>
                      {(columns[col.id] ?? []).length}
                    </span>
                  </div>

                  {/* Add manually button */}
                  <button className='flex items-center justify-center gap-2 w-full rounded-md border border-[#2E2E2E] text-muted-foreground hover:text-foreground hover:bg-muted text-xs py-2 transition-colors mb-1'>
                    Add job manually <CirclePlus size={15} />
                  </button>

                  {/* Reminder Card for applied column */}
                  {col.id === "applied" && <ReminderCard />}

                  {/* AI Info Card for interested and interviewing columns */}
                  {(col.id === "interested" || col.id === "interviewing") && (
                    <AIInfoCard
                      message={
                        col.id === "interested"
                          ? `Seems like out of ${(columns[col.id] ?? []).length} jobs you're interested in, HTML and CSS is mostly required but missing in your resume.`
                          : `Across your ${(columns[col.id] ?? []).length} interviews, system design and SQL case studies appear most frequently — consider focused prep.`
                      }
                    />
                  )}

                  {/* Cards */}
                  {(columns[col.id] ?? []).map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className='cursor-grab mb-1.5'>
                          {col.id === "applied" ? (
                            <AppliedJobCard
                              appliedDate={task.appliedDate}
                              companyLogo={task.companyLogo}
                              companyName={task.companyName}
                              location={task.location}
                              jobTitle={task.jobTitle}
                              postedAgo={task.postedAgo}
                              resumeFile={task.resumeFile}
                              aiNews={task.aiNews}
                              aiNewsSentiment={task.aiNewsSentiment}
                            />
                          ) : col.id === "interviewing" ? (
                            <InterviewingJobCard
                              interviewDate={task.interviewDate}
                              companyLogo={task.companyLogo}
                              companyName={task.companyName}
                              location={task.location}
                              jobTitle={task.jobTitle}
                              postedAgo={task.postedAgo}
                              resumeFile={task.resumeFile}
                              interviewRound={task.interviewRound}
                              notes={task.notes}
                              aiNews={task.aiNews}
                              aiNewsSentiment={task.aiNewsSentiment}
                            />
                          ) : col.id === "offers" ? (
                            <OfferJobCard
                              offerDate={task.offerDate}
                              offerStatus={task.offerStatus}
                              companyLogo={task.companyLogo}
                              companyName={task.companyName}
                              location={task.location}
                              jobTitle={task.jobTitle}
                              postedAgo={task.postedAgo}
                              offerFile={task.offerFile}
                              annualCtc={task.annualCtc}
                              estInHand={task.estInHand}
                              equity={task.equity}
                            />
                          ) : (
                            <JobCard {...task} />
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
