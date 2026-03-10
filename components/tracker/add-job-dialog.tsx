"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "interested", label: "Interested" },
  { id: "applied", label: "Applied" },
  { id: "interviewing", label: "Interviewing" },
  { id: "offers", label: "Offers" },
];

export function AddJobDialog({
  children,
  defaultTab = "interested",
}: {
  children: React.ReactNode;
  defaultTab?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const CheckboxText = ({ label }: { label: string }) => (
    <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-300">
      <div className="w-4 h-4 rounded-[3px] bg-[#1C1C1C] border border-[#2E2E2E] flex items-center justify-center shrink-0"></div>
      {label}
    </label>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {/* max height added to match proportion in image */}
      <DialogContent 
        className="p-0 sm:max-w-[700px] border-[#2E2E2E] bg-[#0A0A0A] text-foreground gap-0 overflow-hidden flex flex-col h-[650px] !rounded-[16px] [&>button]:hidden"
        showCloseButton={false}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#2E2E2E] shrink-0 bg-[#0A0A0A]">
          <h2 className="text-base font-medium">Sort application</h2>
        </div>

        <div className="flex flex-1 overflow-hidden h-full">
          {/* Left Sidebar */}
          <div className="w-[180px] bg-[#161616] border-r border-[#2E2E2E] flex flex-col py-2 shrink-0 overflow-y-auto dialog-scroll">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "text-left px-6 py-2.5 text-[13px] transition-colors",
                  activeTab === tab.id
                    ? "bg-[#2A2A2A] text-white"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col bg-[#0A0A0A]">
            <div className="flex-1 overflow-y-auto px-6 py-5 dialog-scroll">
              <h3 className="text-[15px] font-medium mb-5">Select filter</h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[13px] text-gray-300">Job title</label>
                  <Input className="bg-transparent border-[#2E2E2E] h-9 focus-visible:ring-0 focus-visible:border-[#555] rounded-md" />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] text-gray-300">Job location</label>
                  <Input className="bg-transparent border-[#2E2E2E] h-9 focus-visible:ring-0 focus-visible:border-[#555] rounded-md" />
                </div>

                {/* Job Type Grid */}
                <div className="space-y-3">
                  <label className="text-[13px] text-gray-300">Job Type</label>
                  <div className="grid grid-cols-3 gap-y-3.5">
                    <CheckboxText label="Remote" />
                    <CheckboxText label="On-site" />
                    <CheckboxText label="Hybrid" />
                  </div>
                </div>

                {/* Date Grid */}
                <div className="space-y-3">
                  <label className="text-[13px] text-gray-300">
                    {activeTab === "interviewing"
                      ? "Job Applied date"
                      : activeTab === "offers"
                      ? "Proposal date"
                      : "Date posted"}
                  </label>
                  <div className="grid grid-cols-3 gap-y-3.5">
                    <CheckboxText label="Today" />
                    <CheckboxText label="This week" />
                    <CheckboxText label="Last week" />
                    <CheckboxText label="Month" />
                    <CheckboxText label="15 days before" />
                  </div>
                </div>

                {/* Work Type Grid */}
                <div className="space-y-3">
                  <label className="text-[13px] text-gray-300">Work Type</label>
                  <div className="grid grid-cols-3 gap-y-3.5">
                    <CheckboxText label="Full-time" />
                    <CheckboxText label="Freelancing" />
                    <CheckboxText label="Contract" />
                  </div>
                </div>

                {/* Conditional Fields (Rounds / Stage) */}
                {activeTab === "interviewing" && (
                  <div className="space-y-3">
                    <label className="text-[13px] text-gray-300">Rounds</label>
                    <div className="grid grid-cols-3 gap-y-3.5">
                      <CheckboxText label="First" />
                      <CheckboxText label="Second" />
                      <CheckboxText label="Third" />
                      <CheckboxText label="Fourth" />
                      <CheckboxText label="Fifth" />
                    </div>
                  </div>
                )}

                {activeTab === "offers" && (
                  <div className="space-y-3">
                    <label className="text-[13px] text-gray-300">
                      Proposal stage
                    </label>
                    <div className="grid grid-cols-3 gap-y-3.5">
                      <CheckboxText label="Proposal stage" />
                      <CheckboxText label="Negotiating" />
                      <CheckboxText label="Decline" />
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <CheckboxText label="Show mark as important" />
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 pt-2 pb-6 flex items-center justify-between mt-auto">
              <Button
                variant="ghost"
                className="bg-[#1C1C1C] hover:bg-[#2A2A2A] text-[13px] text-gray-300 hover:text-white h-9 px-5 rounded-md"
              >
                Clear filter
              </Button>
              <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white text-[13px] font-medium h-9 px-7 rounded-md">
                Update
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
