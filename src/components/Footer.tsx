export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-void-deep">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 sm:flex-row sm:gap-6 sm:px-10">
        {/* Left Section */}
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-ivory">
            KORTSIDE
          </span>
        </div>

        {/* Center Links */}
        {/* <nav className="flex items-center gap-6 sm:gap-8">
          <a
            href="#"
            className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-ivory/60 transition-colors duration-500 hover:text-ivory sm:text-[10px]"
          >
            PRIVACY
          </a>
          <a
            href="#"
            className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-ivory/60 transition-colors duration-500 hover:text-ivory sm:text-[10px]"
          >
            TERMS
          </a>
          <button
            onClick={() => {
              document.getElementById("inquire")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer bg-transparent border-none p-0 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-ivory/60 transition-colors duration-500 hover:text-ivory focus-visible:outline-none sm:text-[10px]"
          >
            INQUIRY
          </button>
        </nav> */}

        {/* Right Section */}
        <div className="text-center sm:text-right">
          <p className="font-sans text-[8px] font-light tracking-[0.2em] text-ivory/100 uppercase sm:text-[9px]">
            © {new Date().getFullYear()} KORTSIDE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
