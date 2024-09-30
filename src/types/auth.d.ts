export interface ITenant {
  id: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  onboardingStatus: "pending" | "completed";
}
