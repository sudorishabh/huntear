"use client";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { JobCard } from "./job-card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Share2,
  Plus,
  SlidersHorizontal,
  CirclePlus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";

const COLUMNS = [
  { id: "interested", label: "Interested", count: 2 },
  { id: "applied", label: "Applied", count: 4 },
  { id: "interviewing", label: "Interviewing", count: 2 },
  { id: "offers", label: "Offers", count: 2 },
];

const initialData: Record<string, { id: string }[]> = {
  interested: [{ id: "task-1" }, { id: "task-2" }],
  applied: [
    { id: "task-3" },
    { id: "task-4" },
    { id: "task-5" },
    { id: "task-6" },
  ],
  interviewing: [{ id: "task-7" }, { id: "task-8" }],
  offers: [{ id: "task-9" }, { id: "task-10" }],
};

export const JobTracking = () => {
  const [columns, setColumns] = useState(initialData);
  const [activeTab, setActiveTab] = useState<"active" | "archive">("active");

  const onDragEnd = (result: any) => {
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
        <div className='grid grid-cols-4 gap-0 flex-1 overflow-x-auto px- pt-4'>
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
                      {col.count}
                    </span>
                  </div>

                  {/* Add manually button */}
                  <button className='flex items-center justify-center gap-2 w-full rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted text-sm py-2 transition-colors mb-1'>
                    Add job manually <CirclePlus size={15} />
                  </button>

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
                          <JobCard />
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
