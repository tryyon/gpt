import { Suspense } from 'react';
import InfluencersClient from './influencers-client';
import { PageTitle } from '@/global-components/layout/PageTitle';

export default function InfluencersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageTitle 
        title="Influencers" 
        subtitle="Manage your influencer marketing campaigns"
      />
      <InfluencersClient />
    </Suspense>
  );
}