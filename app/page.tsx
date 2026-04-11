"use client";

// Components
import HeroSection from "@/components/sections/HeroSection";
import TopTopicsSection from "@/components/sections/TopTopicsSection";
import ObsessionSection from "@/components/sections/ObsessionSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import UnexpectedQuestionSection from "@/components/sections/UnexpectedQuestionSection";
import SignatureStyleSection from "@/components/sections/SignatureStyleSection";
import MonthlyRecapSection from "@/components/sections/MonthlyRecapSection";
import AchievementSection from "@/components/sections/AchievementSection";
import WelcomeModal from "@/components/WelcomeModal";
import AnnouncementAlert from "@/components/AnnouncementAlert";
import BackgroundScene from "@/components/3d/BackgroundScene";
import SideProjectsSection from "@/components/sections/SideProjectsSection";
import TestAppSection from "@/components/sections/TestAppSection";
export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* 3D Background - Fixed position */}
      <BackgroundScene />

      {/* Content dengan backdrop blur untuk readability */}
      <div className="relative ">
        <WelcomeModal />
        <AnnouncementAlert />

        <section id="home">
          <HeroSection />
        </section>
        <section id="testapp-ptsp">
          <TestAppSection />
        </section>
        <section id="top-topics">
          <TopTopicsSection />
        </section>

        <section id="obsession">
          <ObsessionSection />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>

        <section id="side-projects">
          <SideProjectsSection />
        </section>

        <section id="monthly">
          <MonthlyRecapSection />
        </section>

        <section id="unexpected-question">
          <UnexpectedQuestionSection />
        </section>

        <section id="signature-style">
          <SignatureStyleSection />
        </section>

        <section id="achievements">
          <AchievementSection />
        </section>
      </div>
    </main>
  );
}
