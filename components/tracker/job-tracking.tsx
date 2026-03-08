"use client";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { JobCard } from "./Job-card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Share2,
  Plus,
  SlidersHorizontal,
  CirclePlus,
} from "lucide-react";

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
      <div className='flex items-center justify-between px-6 py-3 border-b border-border'>
        <div className='w-72'>
          <Input
            placeholder='Type/search...'
            className='rounded-full h-9 bg-muted border-0 px-4 text-sm'
          />
        </div>
        <div className='flex items-center gap-3'>
          <button className='text-muted-foreground hover:text-foreground transition-colors'>
            <Bell size={20} />
          </button>
          <div className='w-9 h-9 rounded-full bg-muted overflow-hidden ring-2 ring-border'>
            <img
              src='https://i.pravatar.cc/36'
              alt='avatar'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>

      {/* ── Page title ── */}
      <div className='px-6 pt-6 pb-4'>
        <h1 className='text-3xl font-bold tracking-tight'>My Workplace</h1>
      </div>

      {/* ── Tabs + Action buttons ── */}
      <div className='flex items-center justify-between px-6 pb-4'>
        {/* Tabs */}
        <div className='flex items-center gap-2'>
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
        </div>

        {/* Action buttons */}
        <div className='flex items-center gap-2'>
          <button className='flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors'>
            Export <Share2 size={14} />
          </button>
          <button className='flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-black transition-colors'>
            Add Job{" "}
            <Plus
              size={15}
              strokeWidth={2.5}
            />
          </button>
          <button className='p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'>
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      <Separator />

      {/* ── Kanban board ── */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-4 gap-0 flex-1 overflow-x-auto divide-x divide-border px-2 pt-4'>
          {COLUMNS.map((col) => (
            <Droppable
              droppableId={col.id}
              key={col.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className='flex flex-col gap-3 px-4 min-h-[400px]'>
                  {/* Column header */}
                  <div className='flex items-center gap-2 mb-1'>
                    <h2 className='font-semibold text-sm'>{col.label}</h2>
                    <span className='text-xs text-muted-foreground font-medium'>
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
                          className='cursor-grab'>
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
