import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Create Campaign | Admin Panel',
  description: 'Create a new advertising campaign for your products.',
};

export default function CreateCampaignPage() {
  redirect('/dashboard/advertise');
}