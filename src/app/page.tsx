import LandingPage from "@/components/landing-page/LandingPage";
import SplashGate from "@/components/SplashGate";

export default function Home() {
  return (
    <SplashGate>
      <LandingPage />
    </SplashGate>
  );
}
