import { ChevronDown } from "lucide-react";

export default function About() {
  const now = new Date();
  const keralaTime = now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Set to false for 24-hour format
  });

  return (
    <section className="p-5 flex flex-col gap-5 w-full max-w-2xl h-screen ">
      <div>
        <h1 className="md:text-3xl text-xl  font-light  text-neutral-400">
          I’m <span className=" dark:text-white text-black">Ansab</span>, a
          software{" "}
          <span className=" dark:text-white text-black">developer</span> in{" "}
          <span className="underline dark:text-white text-black underline-offset-5 decoration-1 ">
            India
          </span>{" "}
          who builds modern, user-friendly web applications and loves crafting
          clean <span className="dark:text-white text-black">designs</span>.
        </h1>
      </div>
      <div className="grid gap-2">
        <h1 className="text-neutral-400 text-sm">WORK</h1>
        <div className="flex flex-col gap-3">
          <div className="p-5 dark:border-neutral-900 border rounded-sm bg-neutral-100 dark:bg-neutral-950 flex justify-between">
            <div className="flex flex-col">
              <h1>Full stack Intern</h1>
              <p className="text-xs text-neutral-400">2025 - Present</p>
            </div>
            <div className="flex flex-col">
              <h1>Devxtra</h1>
              <p className="text-xs text-neutral-400">Kerala</p>
            </div>
          </div>
          {/* <div className="flex px-3 py-1 gap-2 bg-neutral-900 rounded-sm w-fit">
            <ChevronDown width={15} />
            <h1>Previous roles</h1>
          </div> */}
        </div>
      </div>
    </section>
  );
}
