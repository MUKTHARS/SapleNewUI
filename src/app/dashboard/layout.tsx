// src/app/dashboard/layout.tsx - FIXED
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | SAPLE.AI',
  description: 'Manage your AI agents and team',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      {children}
    </div>
  );
}