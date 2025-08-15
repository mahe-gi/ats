import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "M-ats" },
    { name: "description", content: "Smart feed back for your dream job!" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-small.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Scores</h1>
          <h2>Review submissions and get AI-powered feedback instantly.</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => {
              return <ResumeCard key={resume.id} resume={resume} />;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
