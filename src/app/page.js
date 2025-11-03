import MyNavBar from "../components/MyNavBar";
import MyHeroSection from "../components/MyHeroSection";
import ProjectPreviewCard from "../components/project-preview-card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <MyNavBar />
      <main className="flex-1">
        <MyHeroSection />
        <ProjectPreviewCard count={3} />
      </main>
    </div>
  );
}
