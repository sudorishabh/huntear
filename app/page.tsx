import { DashboardWrapper } from "@/components/shared/dashboard-wrapper";
import { JobTracking } from "@/components/tracker/job-tracking";

export default function KanbanBoard() {
  return (
    <DashboardWrapper title='Job Tracking'>
      <JobTracking />
    </DashboardWrapper>
  );
}
