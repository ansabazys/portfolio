"use client";

import Image from "next/image";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type Photo = {
  id: number;
  title: string;
  place: string;
  year: string;
  src: string;
  tone: string;
};

const INITIAL_PHOTOS: Photo[] = [
  {
    id: 1,
    title: "Building with intent",
    place: "Product systems",
    year: "01",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85",
    tone: "#d9d0bd",
  },
  {
    id: 2,
    title: "Quiet interface",
    place: "Design practice",
    year: "02",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
    tone: "#c9c4b9",
  },
  {
    id: 3,
    title: "Ideas in motion",
    place: "Kerala, India",
    year: "03",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85",
    tone: "#b8c4c1",
  },
  {
    id: 4,
    title: "Details matter",
    place: "Craft & code",
    year: "04",
    src: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=900&q=85",
    tone: "#d6c2b2",
  },
];

const stackRotations = [-3, 2.5, -1.5, 3];

export function KineticPhotoStack() {
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [thrown, setThrown] = useState<"left" | "right" | null>(null);
  const [focus, setFocus] = useState<Photo | null>(null);
  const start = useRef({ x: 0, y: 0 });
  const moved = useRef(false);

  const rotateDeck = (direction: "left" | "right") => {
    if (thrown) return;

    setThrown(direction);
    window.setTimeout(() => {
      setPhotos((current) => [...current.slice(1), current[0]]);
      setThrown(null);
      setDrag({ x: 0, y: 0, active: false });
    }, 300);
  };

  const pointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (thrown) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    start.current = { x: event.clientX, y: event.clientY };
    moved.current = false;
    setDrag({ x: 0, y: 0, active: true });
  };

  const pointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!drag.active) return;
    const x = event.clientX - start.current.x;
    const y = event.clientY - start.current.y;
    if (Math.abs(x) + Math.abs(y) > 8) moved.current = true;
    setDrag({ x, y, active: true });
  };

  const pointerUp = () => {
    if (!drag.active) return;
    if (Math.abs(drag.x) > 72) rotateDeck(drag.x > 0 ? "right" : "left");
    else setDrag({ x: 0, y: 0, active: false });
  };

  return (
    <section className="relative isolate py-3">

      <div className="relative flex items-center justify-end">
        <div className="hidden overflow-hidden rounded-md border border-[#D5D3CC] bg-[#FAFAF8]/80 sm:flex dark:border-[#383734] dark:bg-[#121211]/80">
          <button
            aria-label="Previous photo"
            className="grid size-8 place-items-center border-r border-[#D5D3CC] text-[#141413] transition hover:bg-white disabled:cursor-default disabled:opacity-40 dark:border-[#383734] dark:text-[#EDEDEB] dark:hover:bg-[#2A2927]"
            disabled={Boolean(thrown)}
            onClick={() => rotateDeck("left")}
            type="button"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            aria-label="Next photo"
            className="grid size-8 place-items-center text-[#141413] transition hover:bg-white disabled:cursor-default disabled:opacity-40 dark:text-[#EDEDEB] dark:hover:bg-[#2A2927]"
            disabled={Boolean(thrown)}
            onClick={() => rotateDeck("right")}
            type="button"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="relative mx-auto h-[390px] w-[255px] [perspective:1000px] sm:h-[430px] sm:w-[280px]">
        {[...photos].reverse().map((photo, reverseIndex) => {
          const index = photos.length - 1 - reverseIndex;
          const isTop = index === 0;
          const translateX = index * 4;
          const translateY = index * 4;
          const rotation = stackRotations[index];
          const dragTransform = isTop ? { x: drag.x, y: drag.y } : { x: 0, y: 0 };
          const isThrown = isTop && thrown;

          return (
            <button
              aria-label={`Open ${photo.title}`}
              className="group absolute inset-0 overflow-hidden rounded-[7px] border border-black/10 bg-[#F8F5ED] p-2 pb-0 text-left shadow-[0_12px_28px_rgba(31,29,24,0.16)] transition-[transform,box-shadow,opacity] duration-300 ease-out hover:shadow-[0_18px_40px_rgba(31,29,24,0.22)] dark:border-white/10 dark:bg-[#E8E3D9]"
              key={photo.id}
              onClick={() => {
                if (!moved.current && isTop) setFocus(photo);
              }}
              onPointerCancel={pointerUp}
              onPointerDown={isTop ? pointerDown : undefined}
              onPointerMove={isTop ? pointerMove : undefined}
              onPointerUp={isTop ? pointerUp : undefined}
              style={{
                zIndex: photos.length - index,
                transform: `translate3d(${translateX + dragTransform.x}px, ${translateY + dragTransform.y}px, 0) rotate(${rotation + dragTransform.x * 0.045}deg)${isThrown ? ` translateX(${thrown === "right" ? "130%" : "-130%"}) rotate(${thrown === "right" ? "14deg" : "-14deg"})` : ""}`,
                opacity: isThrown ? 0 : 1,
                cursor: isTop ? (drag.active ? "grabbing" : "grab") : "pointer",
                touchAction: "none",
              }}
              type="button"
            >
              <span className="relative block h-[285px] overflow-hidden rounded-[3px] sm:h-[325px]" style={{ backgroundColor: photo.tone }}>
                <Image alt="" className="object-cover saturate-[.88] transition duration-500 group-hover:scale-[1.03]" draggable={false} fill sizes="280px" src={photo.src} />
                <span className="absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,.22)_47%,transparent_58%)] translate-x-[-120%] transition-transform duration-700 group-hover:translate-x-[120%]" />
              </span>
              <span className="flex h-[66px] items-center justify-between gap-3 px-1.5">
                <span className="grid gap-0.5">
                  <b className="text-[11px] font-medium tracking-tight text-[#171714]">{photo.title}</b>
                  <small className="text-[9px] text-[#77736B]">{photo.place}</small>
                </span>
                <em className="font-mono text-[9px] not-italic text-[#77736B]">{photo.year}</em>
              </span>
              <span className="absolute right-4 top-4 grid size-7 place-items-center rounded-full bg-white/85 text-[#24231F] opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Expand size={13} strokeWidth={1.5} />
              </span>
            </button>
          );
        })}
      </div>

      {focus && (
        <div aria-label={focus.title} aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-transparent p-5 backdrop-blur-xl" onClick={() => setFocus(null)} role="dialog">
          <figure className="relative m-0 w-full max-w-xl overflow-visible rounded-lg" onClick={(event) => event.stopPropagation()}>
            <button aria-label="Close" className="absolute -top-12 right-0 grid size-9 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition hover:bg-black/40" onClick={() => setFocus(null)} type="button"><X size={16} /></button>
            <div className="relative aspect-[4/3]"><Image alt={focus.title} className="object-cover" fill sizes="(max-width: 640px) 100vw, 576px" src={focus.src} /></div>
            <figcaption className="flex items-center justify-between bg-[#F2EFE7] px-5 py-4 text-[#171714]"><span className="grid gap-0.5"><b className="text-sm font-medium">{focus.title}</b><span className="text-[11px] text-[#737068]">{focus.place}</span></span><em className="font-mono text-[10px] not-italic">{focus.year}</em></figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
