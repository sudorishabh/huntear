import { Bell } from "lucide-react";
import React from "react";

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
      <div className=''>{children}</div>
    </div>
  );
};
