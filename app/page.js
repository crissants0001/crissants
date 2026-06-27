import { 
  Hero, KPIs, DashboardPreview, 
  Features, Timeline, TechArchitecture, Contact 
} from '../components/HomeSections';

export default function Home() {
  return (
    <main>
      <Hero />
      <KPIs />
      <DashboardPreview />
      <Features />
      <Timeline />
      <TechArchitecture />
      <Contact />
    </main>
  );
}