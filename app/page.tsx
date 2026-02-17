import Link from "next/link";
import ContactForm from "@/app/components/ContactForm";
import ProjectCard, { GalleryItem } from "@/app/components/ProjectSection";
import { API_BASE_URL, CONTACT_EMAIL } from "@/lib/config";

/**
 * Fetches gallery projects from the backend API.
 * Returns an empty array if the fetch fails.
 */
async function getProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/project/`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export const dynamic = 'force-dynamic';
export default async function Home() {
  const projects = await getProjects();

  // Define steps for the workflow section
  const steps = [
    {
      num: "01",
      title: "Architect",
      desc: "Analyzing requirements and designing robust database schemas and API structures."
    },
    {
      num: "02",
      title: "Develop",
      desc: "Building scalable backend systems with Django and crafting clean server-side logic."
    },
    {
      num: "03",
      title: "Deploy & Integrate",
      desc: "Ensuring secure deployments and seamless integration with modern frontend technologies."
    }
  ];
console.log("Projects data from API:", projects);
  return (
    <div className="min-h-screen selection:bg-blue-500 font-sans pt-16 md:pt-12 bg-spotlight">
      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col justify-center min-h-[70vh] md:min-h-[85vh] relative">
        {/* Subtle decorative background element */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10 animate-float"></div>

        {/* Status Badge */}
        <div className="flex items-center space-x-3 mb-6 md:mb-8 animate-reveal">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted/80">
            Calicut, Kerala, India
          </p>
        </div>

        {/* Main Heading focusing on Backend Engineering */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 md:mb-8 text-foreground animate-reveal [animation-delay:200ms]">
          Architecting <span className="text-gradient italic">scalable</span> <br />
          backend systems.
        </h1>

        {/* Brief Introduction */}
        <p className="text-base md:text-xl text-text-muted max-w-xl leading-relaxed mb-8 md:mb-10 font-normal animate-reveal [animation-delay:400ms]">
          Hi, I'm a <span className="text-foreground font-semibold">Backend Engineer</span> specialized in building robust server-side logic with <span className="text-foreground">Django</span>. I also have a solid foundation in frontend tools like <span className="text-foreground">React</span> and <span className="text-foreground">Next.js</span>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-5 animate-reveal [animation-delay:600ms]">
          <Link href="/about">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-full font-bold transition-all active:scale-95 text-sm md:text-base cursor-pointer shadow-lg shadow-primary/20 hover:shadow-primary/40">
              About Me
            </button>
          </Link>

          <Link href="/blog" className="group flex items-center gap-2 text-foreground font-bold py-3.5 px-6 hover:text-primary transition-colors text-sm md:text-base">
            Read My Blog
            <span className="group-hover:translate-x-1 transition-transform text-primary">→</span>
          </Link>
        </div>
      </main>

      {/* Featured Projects Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-card-border/50 animate-reveal [animation-delay:800ms]">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center tracking-tight">Featured Projects</h2>

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project: GalleryItem) => (
              <ProjectCard key={project.id} item={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-text-muted bg-card-bg/50 rounded-3xl border border-dashed border-card-border">
              <p>No projects found or connection failed.</p>
            </div>
          )}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-24 md:py-32 border-t border-card-border/50 bg-card-bg/10 rounded-[3rem] my-10 md:my-20">
        <h2 className="text-2xl font-bold mb-16 tracking-tight text-text-muted uppercase italic flex items-center gap-3">
          <span className="h-[1px] w-8 bg-primary"></span>
          The Technical Workflow
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={step.num} className="group p-8 md:p-10 rounded-[2.5rem] bg-card-bg border border-card-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
              <span className="text-6xl font-black text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                {step.num}
              </span>
              <h3 className="text-2xl font-bold mt-6 mb-4 text-foreground">{step.title}</h3>
              <p className="text-text-muted leading-relaxed text-base font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32 border-t border-card-border/50 relative overflow-hidden" id="contact">
        {/* Subtle background glow for contact */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 text-foreground leading-[1.1]">
              Let's build <br />
              <span className="text-gradient italic font-light">something powerful.</span>
            </h2>
            <p className="text-text-muted text-lg md:text-xl max-w-sm leading-relaxed font-medium mb-12 opacity-90">
              I'm specialized in backend development and open for collaborations or full-time roles.
            </p>

            <div className="space-y-6">
              <p className="text-xs font-bold text-text-muted uppercase tracking-[0.2em]">Connect with me</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-xl md:text-3xl font-bold text-foreground hover:text-primary transition-all duration-300 underline decoration-primary/30 decoration-2 underline-offset-8 hover:decoration-primary break-words">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="w-full flex md:justify-end mt-10 md:mt-0">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
