export default function Hero() {
  return (
    <section className="flex flex-col gap-5 h-full justify-center items-center">
      <div>
        <h1 className="text-3xl w-full max-w-lg font-light text-neutral-400">
          <span className="dark:text-white text-black">Hey, I'm Ansab.</span> I build, create, and tell stories that make products
          matter. Based in India, <span className="underline dark:text-white text-black underline-offset-5 decoration-1">Say hello</span>
        </h1>
      </div>

      <div className=" w-full max-w-lg">
        <button className="dark:bg-neutral-900 bg-neutral-200 w-full p-3 font-mono">start project</button>
      </div>
    </section>
  );
}
