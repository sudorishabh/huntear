import { Bell, Plus, Share2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface dashboardWrapperProps {
  children: React.ReactNode;
  title: string;
}

export const DashboardWrapper = ({
  children,
  title,
}: dashboardWrapperProps) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='px-6 pt-6 pb-4 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-semibold tracking-tight text-[#F2F2F2]'>
            {title}
          </h1>
          <p className='text-muted-foreground text-sm'>
            Manage your job applications and track their status.
          </p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='outline'>
            {/* Export  */}
            <Share2 size={14} />
          </Button>
          <Button variant='outline'>
            <Bell size={20} />
          </Button>
          {/* </Button> */}
          <Button className=' bg-blue-500 hover:bg-blue-400 text-white transition-colors rounded-md gap-1.5 text-xs flex items-center justify-center'>
            Add Job{" "}
            <Plus
              size={12}
              strokeWidth={2.5}
            />
          </Button>

          {/* <div className='w-9 h-9 rounded-full bg-muted overflow-hidden ring-2 ring-border'>
            <img
              src='https://i.pravatar.cc/36'
              alt='avatar'
              className='w-full h-full object-cover'
            />
          </div> */}
        </div>
      </div>
      <div className=''>{children}</div>
    </div>
  );
};
