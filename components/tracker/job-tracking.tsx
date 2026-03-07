"use client";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { JobCard } from "./Job-card";

const initialData = {
  todo: [
    { id: "task-1", content: "Setup project" },
    { id: "task-2", content: "Install dependencies" },
  ],
  doing: [{ id: "task-3", content: "Build Kanban board" }],
  done: [{ id: "task-4", content: "Deploy app" }],
};

export const JobTracking = () => {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceItems = Array.from(columns[sourceCol]);
    const destItems = Array.from(columns[destCol]);

    const [movedItem] = sourceItems.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceItems.splice(destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [sourceCol]: sourceItems,
      });
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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='grid grid-cols-3 gap-6 p-6'>
        {Object.entries(columns).map(([columnId, tasks]) => (
          <Droppable
            droppableId={columnId}
            key={columnId}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='bg-muted rounded-lg p-4 min-h-[300px]'>
                <h2 className='font-bold mb-4 capitalize'>{columnId}</h2>

                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='mb-3 cursor-grab'>
                        {/* <CardContent className='p-4'>
                          {task.content}
                        </CardContent> */}
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
  );
};
