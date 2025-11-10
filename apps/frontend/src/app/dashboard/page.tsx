'use client';

import { useMeetings } from '@/features/meetings/hooks/use-meetings';

export default function DashboardPage() {
  const { data: meetings, isLoading } = useMeetings();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-muted-foreground mb-6">User dashboard for managing meetings and settings.</p>
      
      <div className="grid gap-4">
        {meetings?.map((meeting: any) => (
          <div key={meeting.id} className="border rounded p-4">
            <pre>{JSON.stringify(meeting, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
