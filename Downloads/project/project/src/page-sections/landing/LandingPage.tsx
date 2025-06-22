'use client';

import { Box } from '@mui/material';
import { LandingHeader } from '@/global-components/layout/LandingHeader';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PricingSection } from './PricingSection';
import { CTASection } from './CTASection';
import { FooterSection } from './FooterSection';
import { useRouter } from 'next/navigation';

export function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };

  return (
    <Box>
      <LandingHeader onGetStarted={handleGetStarted} />
      <HeroSection onGetStarted={handleGetStarted} />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection onPlanSelect={handleGetStarted} />
      <CTASection onGetStarted={handleGetStarted} />
      <FooterSection />
    </Box>
  );
}