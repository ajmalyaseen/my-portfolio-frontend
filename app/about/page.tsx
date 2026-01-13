import Image from 'next/image';
import {
    Briefcase,
    GraduationCap,
    Code2,
    Github,
    Linkedin,
    Instagram,
    Mail,
    Database,
    Layout,
    Zap,
    Globe,
    Cpu,
    FileCode,
    ShieldCheck,
    Palette,
    GitBranch,
    MessageSquare,
    Lightbulb,
    Clock,
    Users,
    RefreshCw,
    Coffee
} from 'lucide-react';

/**
 * Interface for timeline items in the Journey section.
 */
interface TimelineItem {
    id: number;
    year: string;
    title: string;
    organization: string;
    description: string;
    type: 'work' | 'education' | 'other'; // Used to determine which icon to display
}

// Timeline data representing professional and educational milestones
const timelineData: TimelineItem[] = [
    {
        id: 1,
        year: "2026 - Present",
        title: "Backend Engineer (Freelance)",
        organization: "Self-Employed",
        description: "Designing and implementing scalable backend architectures using Django and PostgreSQL. Focused on optimizing database performance and building secure RESTful APIs.",
        type: 'work'
    },
    {
        id: 3,
        year: "May 2025 - Sept 2025",
        title: "Barista",
        organization: "Third Wave Coffee",
        description: "Provided premium customer service in a high-demand environment. Developed strong communication and multitasking skills while maintaining precision under pressure. Mastered professional espresso machines and brewing techniques.",
        type: 'work'
    },
    {
        id: 2,
        year: "2023 - Present",
        title: "Bachelor of Computer Applications (BCA)",
        organization: "Krupanidhi Degree College",
        description: "Focusing on computer science fundamentals, algorithms, and backend systems. Actively developing projects that leverage modern server-side technologies.",
        type: 'education'
    },
];

// Social media links for the connect section
const socialLinks = [
    {
        name: "GitHub",
        url: "https://github.com/yourusername",
        icon: Github
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/yourusername",
        icon: Linkedin
    },
    {
        name: "Instagram",
        url: "https://instagram.com/yourusername",
        icon: Instagram
    },
    {
        name: "Email",
        url: "mailto:ajmalyaseen706@gmail.com",
        icon: Mail
    }
];

// Technical skills with icons
const techSkills = [
    { name: "Django", icon: FileCode },
    { name: "Python", icon: Zap },
    { name: "PostgreSQL", icon: Database },
    { name: "REST APIs", icon: Globe },
    { name: "JavaScript", icon: FileCode },
    { name: "TypeScript", icon: ShieldCheck },
    { name: "Next.js", icon: Cpu },
    { name: "React", icon: Layout },
    { name: "Tailwind CSS", icon: Palette },
    { name: "Git", icon: GitBranch }
];

// Soft skills with icons
const softSkills = [
    { name: "Communication", icon: MessageSquare },
    { name: "Problem Solving", icon: Lightbulb },
    { name: "Time Management", icon: Clock },
    { name: "Team Collaboration", icon: Users },
    { name: "Adaptability", icon: RefreshCw }
];

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto bg-spotlight min-h-screen">

            {/* --- SECTION 1: INTRODUCTION (BIO) --- */}
            <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-center mb-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                {/* Profile Photo Container - Refined for a perfect circle */}
                <div className="relative w-56 h-56 md:w-72 md:h-72 aspect-square rounded-full overflow-hidden border-4 border-primary/20 mx-auto shadow-2xl ring-offset-4 ring-offset-background ring-4 ring-primary/5">
                    <Image
                        src="https://res.cloudinary.com/dgie5t9uw/image/upload/v1768320307/photo_2026-01-13_21-34-52_aihlj2.jpg"
                        alt="Ajmal Yaseen"
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition duration-700 scale-110 origin-center"
                    />
                </div>

                {/* Bio Content */}
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-4 text-foreground">
                        Hi, I'm <span className="text-gradient">Ajmal Yaseen</span>
                    </h1>
                    <p className="text-text-muted text-lg leading-relaxed">
                        I am a dedicated <span className="text-foreground font-semibold">Backend Engineer</span> based in Kerala, India. My core expertise lies in architecting <span className="text-foreground font-semibold">robust server-side systems</span> with Django, while maintaining a strong understanding of modern frontend technologies like Next.js and React. I am passionate about writing clean, efficient code and solving complex architectural challenges.
                    </p>
                </div>
            </section>

            {/* --- SECTION 2: CONNECT --- */}
            <section className="mt-24 pt-12 border-t border-card-border animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                <h2 className="text-2xl font-bold mb-8 text-foreground">Let's Connect</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 rounded-xl bg-card-bg border border-card-border hover:border-blue-500 hover:bg-card-bg/50 transition-all group"
                        >
                            <div className="p-2 bg-foreground/5 dark:bg-foreground/10 rounded-lg text-text-muted group-hover:text-blue-500 transition-colors">
                                <social.icon size={20} />
                            </div>
                            <span className="font-medium text-text-muted group-hover:text-foreground">
                                {social.name}
                            </span>
                        </a>
                    ))}
                </div>
            </section>

            {/* --- SECTION 3: TECHNICAL SKILLS --- */}
            <section className="mb-12 mt-24 pt-12 border-t border-card-border animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-foreground">
                    <Code2 className="text-blue-500" /> Technical Skills
                </h2>
                <div className="flex flex-wrap gap-4">
                    {techSkills.map((skill) => (
                        <div key={skill.name} className="flex items-center gap-3 px-4 py-2 bg-card-bg border border-card-border rounded-xl text-text-muted text-sm hover:text-foreground hover:border-blue-500/50 transition-all cursor-default group">
                            <skill.icon size={18} className="text-text-muted group-hover:text-blue-500 transition-colors" />
                            <span className="font-medium">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </section >

            {/* --- SECTION 4: SOFT SKILLS --- */}
            <section className="mb-24 mt-12 pt-0 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-foreground">
                    <Users className="text-blue-500" /> Soft Skills
                </h2>
                <div className="flex flex-wrap gap-4">
                    {softSkills.map((skill) => (
                        <div key={skill.name} className="flex items-center gap-3 px-4 py-2 bg-card-bg border border-card-border rounded-xl text-text-muted text-sm hover:text-foreground hover:border-blue-500/50 transition-all cursor-default group">
                            <skill.icon size={18} className="text-text-muted group-hover:text-blue-500 transition-colors" />
                            <span className="font-medium">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </section >

            {/* --- SECTION 5: JOURNEY (EXPERIENCE & EDUCATION) --- */}
            <section className="mb-24 mt-24 pt-12 border-t border-card-border animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
                <h2 className="text-2xl font-bold mb-12 flex items-center gap-3 text-foreground">
                    <Briefcase className="text-blue-500" /> Journey So Far
                </h2>

                <div className="relative border-l border-card-border ml-3 md:ml-6 space-y-12">
                    {timelineData.map((item) => (
                        <div key={item.id} className="relative pl-8 md:pl-12">

                            {/* Timeline Indicator */}
                            <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-background"></span>

                            {/* Item Header */}
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1 sm:mt-0">
                                    {item.year}
                                </span>
                            </div>

                            {/* Organization Info */}
                            <div className="flex items-center gap-2 text-text-muted text-sm mb-3">
                                {item.type === 'work' ? <Briefcase size={14} /> : <GraduationCap size={14} />}
                                <span>{item.organization}</span>
                            </div>

                            {/* Item Description */}
                            <p className="text-text-muted leading-relaxed max-w-2xl">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}


