import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-32">
      <div className="text-center">
        <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] font-normal tracking-[0.2em] text-ivory">
          KORTSIDE.
        </h1>
        <Link
          to="/"
          className="link-line mt-10 inline-block font-sans text-[11px] font-light uppercase tracking-[0.4em] text-ivory/70 transition-colors duration-500 hover:text-ivory"
        >
          Return.
        </Link>
      </div>
    </section>
  );
}
