import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.svg";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#111111] text-neutral-600 dark:text-[#A1A1AA] flex justify-center px-4 sm:px-6 pt-32 pb-32 font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors">
      <div className="w-full max-w-[560px] flex flex-col gap-16">
        {/* Profile Section */}
        <section className="flex gap-5 items-start">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-neutral-200 dark:bg-[#161616] border border-neutral-300 dark:border-neutral-800 flex items-center justify-center transition-colors">
            <Image src={Logo} width={23} alt="A" />
          </div>
          <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300 transition-colors">
            <span className="text-black dark:text-white font-medium">
              Hey, I'm Ansab.
            </span>{" "}
            I design, build, and shape ideas into products people care about.{" "}
            <Link
              href="#"
              className="text-black dark:text-white font-medium underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-4 hover:decoration-neutral-600 dark:hover:decoration-neutral-400 transition-colors"
            >
              Say hello
            </Link>
          </p>
        </section>

        {/* WORK Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-[11px] font-mono tracking-[0.15em] text-neutral-500 uppercase">
            Work
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center p-4 rounded-xl border border-neutral-200 dark:border-neutral-800/60 bg-white dark:bg-[#161616]/80 hover:bg-neutral-50 dark:hover:bg-[#1A1A1A] transition-colors">
              <div className="flex flex-col gap-1">
                <span className="text-[15px] font-medium text-black dark:text-white transition-colors">
                  Full Stack Intern
                </span>
                <span className="text-[13px] text-neutral-500">
                  2025 - Present
                </span>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className="text-[15px] font-medium text-black dark:text-white transition-colors">
                  Devxtra
                </span>
                <span className="text-[13px] text-neutral-500">Kochi</span>
              </div>
            </div>

            <button className="flex items-center gap-2 text-[13px] text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors py-1 w-fit group">
              <ChevronDown className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Previous roles</span>
              <span className="bg-neutral-200 dark:bg-[#1C1C1C] text-neutral-600 dark:text-neutral-400 rounded-full px-2 py-0.5 text-[10px] leading-none ml-1 transition-colors">
                0
              </span>
            </button>
          </div>
        </section>

        {/* WHAT I DO Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-[11px] font-mono tracking-[0.15em] text-neutral-500 uppercase">
            What I do
          </h2>
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800/60 bg-transparent flex flex-col gap-4 text-[15px] text-neutral-600 dark:text-neutral-300 leading-relaxed shadow-sm transition-colors">
            <p>
              I started with code and gradually developed a strong interest in
              design and how products feel, not just how they work. Today, I
              build as a developer while thinking about user experience,
              clarity, and clean visual storytelling. I enjoy creating products
              that are both functional and thoughtfully designed. I care about
              simple interfaces, meaningful interactions, and building things
              people genuinely enjoy using. Recently, I’ve also been exploring
              AI and its role in the future of product building.
            </p>
          </div>
        </section>

        {/* RECENT WORK Section */}
        <section className="flex flex-col gap-2">
          <h2 className="text-[11px] font-mono tracking-[0.15em] text-neutral-500 uppercase pb-4 mb-2 border-b border-neutral-200 dark:border-neutral-800/60 transition-colors">
            Recent Work
          </h2>
          <div className="flex flex-col">
            {[
            "Healix"
            ].map((project) => (
              <Link
                key={project}
                href="#"
                className="flex justify-between items-center py-3 group"
              >
                <span className="text-[15px] text-neutral-700 dark:text-[#D4D4D8] font-medium group-hover:text-black dark:group-hover:text-white transition-colors">
                  {project}
                </span>
                <ArrowRight className="w-4 h-4 text-neutral-400 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white -translate-x-1 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
