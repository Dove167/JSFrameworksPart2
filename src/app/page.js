import MyNavBar from "../components/MyNavBar";
import MyHeroSection from "../components/MyHeroSection";
import ProjectPreviewCard from "../components/project-preview-card";
import { FullGitHubCalendar } from "../components/github-calendar";

export const revalidate = 0;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* MyNavBar removed from here - now in RootLayout */}
      <main className="flex-1">
        <MyHeroSection />
        
        {/* GitHub Contributions Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <FullGitHubCalendar
                username="Dove167"
                className="shadow-lg w-full"
              />
            </div>
          </div>
        </section>
        
        <ProjectPreviewCard count={3} />
      </main>
    </div>
  );
}
