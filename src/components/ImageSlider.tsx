import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageSliderProps = {
  images: string[];
  altPrefix: string;
};

export default function ImageSlider({ images, altPrefix }: ImageSliderProps) {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef(0);
  const pointerId = useRef<number | null>(null);

  const count = images.length;
  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const previous = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const rail = thumbsRef.current;
    const thumb = rail?.querySelector<HTMLElement>(`[data-thumb="${index}"]`);
    if (!rail || !thumb) return;
    const nextLeft =
      thumb.offsetLeft - rail.clientWidth / 2 + thumb.offsetWidth / 2;
    rail.scrollTo({ left: nextLeft, behavior: "smooth" });
  }, [index]);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [next, previous]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (count < 2) return;
    pointerStartX.current = event.clientX;
    pointerId.current = event.pointerId;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setDragOffset(event.clientX - pointerStartX.current);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const width = viewportRef.current?.offsetWidth || 1;
    const threshold = width * 0.18;
    if (dragOffset <= -threshold) next();
    else if (dragOffset >= threshold) previous();
    setIsDragging(false);
    setDragOffset(0);
    if (pointerId.current != null) {
      event.currentTarget.releasePointerCapture(pointerId.current);
      pointerId.current = null;
    }
  };

  if (count === 0) return null;

  const shift = `calc(${-index * 100}% + ${isDragging ? dragOffset : 0}px)`;

  return (
    <div className="space-y-4">
      <div
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${altPrefix} image slider`}
        className="relative aspect-video overflow-hidden rounded-xl bg-slate-900 outline-none ring-sky-500/40 focus-visible:ring-2"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className={`flex h-full ${isDragging ? "" : "transition-transform duration-500 ease-out"}`}
          style={{ transform: `translateX(${shift})` }}
        >
          {images.map((image, i) => (
            <figure
              key={image + i}
              className="h-full w-full shrink-0"
              aria-hidden={i !== index}
            >
              <img
                src={image}
                alt={`${altPrefix} screenshot ${i + 1} of ${count}`}
                className="h-full w-full select-none object-contain bg-slate-900 pointer-events-none"
                draggable={false}
              />
            </figure>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={previous}
              onPointerDown={(event) => event.stopPropagation()}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-slate-950/70 p-2 text-white backdrop-blur-sm transition hover:bg-slate-900"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              onPointerDown={(event) => event.stopPropagation()}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-slate-950/70 p-2 text-white backdrop-blur-sm transition hover:bg-slate-900"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-slate-950/70 px-3 py-1 text-xs text-slate-200 backdrop-blur-sm">
              {index + 1} / {count}
            </div>
          </>
        )}
      </div>

      {count > 1 && (
        <>
          <div className="flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-sky-400"
                    : "w-2 bg-slate-600 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
          <div className="relative">
            <div
              ref={thumbsRef}
              className="thumb-rail flex gap-3 overflow-x-auto overscroll-x-contain px-1 pb-3"
            >
              {images.map((image, i) => (
                <button
                  key={`thumb-${image}-${i}`}
                  type="button"
                  data-thumb={i}
                  onClick={() => goTo(i)}
                  aria-label={`Select image ${i + 1}`}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    i === index
                      ? "border-sky-400 ring-2 ring-sky-400/30"
                      : "border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-16 w-8 bg-gradient-to-r from-[#13283a] to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-16 w-8 bg-gradient-to-l from-[#13283a] to-transparent"
            />
          </div>
        </>
      )}
    </div>
  );
}
