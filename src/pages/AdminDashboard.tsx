import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { fadeUp, stagger } from "../lib/motion";
import { type WebsiteContent } from "../hooks/useContent";
import contentData from "../data/content.json";
import defaultInquiries from "../data/inquiries.json";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  referredBy: string;
  message: string;
  createdAt: string;
}

export function AdminDashboard() {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  // Authenticate passcode
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "KORTSIDE2026") {
      setAuthorized(true);
      toast.success("ACCESS GRANTED.");
      sessionStorage.setItem("kortside_auth", "true");
    } else {
      toast.error("INVALID CREDENTIALS.");
    }
  };

  // Check existing session auth
  useEffect(() => {
    const isAuth = sessionStorage.getItem("kortside_auth");
    if (isAuth === "true") {
      setAuthorized(true);
    }
  }, []);

  // Fetch content & inquiries once authorized
  useEffect(() => {
    if (!authorized) return;

    const fetchData = () => {
      setLoading(true);
      try {
        // Load Content
        const storedContent = localStorage.getItem("kortside_content");
        if (storedContent) {
          setContent(JSON.parse(storedContent));
        } else {
          localStorage.setItem("kortside_content", JSON.stringify(contentData));
          setContent(contentData as WebsiteContent);
        }

        // Load Inquiries
        const storedInquiries = localStorage.getItem("kortside_inquiries");
        if (storedInquiries) {
          setInquiries(JSON.parse(storedInquiries));
        } else {
          localStorage.setItem("kortside_inquiries", JSON.stringify(defaultInquiries));
          setInquiries(defaultInquiries);
        }
      } catch (error) {
        toast.error("ERROR FETCHING DATABASE.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authorized]);

  // Handle CMS Content Save
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setSaving(true);
    // Simulated saving delay for premium luxury feel
    setTimeout(() => {
      try {
        localStorage.setItem("kortside_content", JSON.stringify(content));
        toast.success("WEBSITE COPY UPDATED.");
      } catch (err: any) {
        toast.error(err.message || "Failed to save.");
      } finally {
        setSaving(false);
      }
    }, 500);
  };

  const updateContentField = (section: keyof WebsiteContent, field: string, value: string) => {
    if (!content) return;
    setContent({
      ...content,
      [section]: {
        ...content[section],
        [field]: value,
      },
    });
  };

  const handleLogout = () => {
    setAuthorized(false);
    setPasscode("");
    sessionStorage.removeItem("kortside_auth");
    toast.success("LOGGED OUT.");
  };

  // 1. Passcode Screen (Locked State)
  if (!authorized) {
    return (
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 sm:py-32">
        <motion.div
          className="w-full max-w-md text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={fadeUp} className="hairline mx-auto mb-12" />
          <motion.h1
            variants={fadeUp}
            className="font-serif text-[clamp(1.6rem,5vw,2.5rem)] font-normal tracking-[0.24em] text-ivory uppercase"
          >
            DATABASE ACCESS
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 font-sans text-[10px] font-light uppercase tracking-[0.26em] text-ivory/45"
          >
            Enter credentials to unlock secure workspace.
          </motion.p>

          <motion.form variants={fadeUp} onSubmit={handleAuth} className="mt-14 space-y-8">
            <div>
              <label htmlFor="passcode" className="field-label text-center">
                Passcode
              </label>
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="field mt-3 text-center tracking-[0.6em] font-light"
                autoComplete="off"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full border border-ivory/20 px-8 py-3.5 font-sans text-[10px] font-light uppercase tracking-[0.36em] text-ivory transition-all duration-500 hover:border-ivory hover:bg-ivory hover:text-void"
            >
              UNLOCK
            </button>
          </motion.form>

          <motion.div variants={fadeUp} className="mt-14">
            <Link
              to="/"
              className="font-sans text-[9px] font-light uppercase tracking-[0.3em] text-ivory/30 transition-colors duration-500 hover:text-ivory"
            >
              ← RETURN TO WEBSITE
            </Link>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  // 2. Main Dashboard (Authorized State)
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
      <div className="flex flex-col items-start justify-between border-b border-line pb-8 sm:flex-row sm:items-center">
        <div>
          <span className="font-sans text-[10px] font-light uppercase tracking-[0.3em] text-taupe">
            PRIVATE OFFICE
          </span>
          <h1 className="font-serif text-3xl tracking-[0.16em] text-ivory mt-1">
            KORTSIDE CMS & INQUIRIES
          </h1>
        </div>
        <div className="mt-6 flex items-center gap-4 sm:mt-0">
          <Link
            to="/"
            className="border border-ivory/10 px-5 py-2.5 font-sans text-[9px] font-light uppercase tracking-[0.24em] text-ivory transition-colors hover:border-ivory/30"
          >
            PREVIEW SITE
          </Link>
          <button
            onClick={handleLogout}
            className="border border-line bg-void-deep/30 px-5 py-2.5 font-sans text-[9px] font-light uppercase tracking-[0.24em] text-taupe transition-colors hover:text-ivory"
          >
            LOCK DATABASE
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <span className="font-sans text-[11px] font-light uppercase tracking-[0.3em] text-taupe">
            LOADING DATA...
          </span>
        </div>
      ) : (
        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          {/* LEFT: CMS Content Editor */}
          <div className="lg:col-span-5 space-y-12">
            <h2 className="font-serif text-lg tracking-[0.2em] text-ivory uppercase pb-4 border-b border-line">
              Edit Copy
            </h2>

            {content && (
              <form onSubmit={handleSaveContent} className="space-y-10">
                {/* Hero Settings */}
                <div className="space-y-6">
                  <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-taupe">
                    Hero Section
                  </h3>
                  <div>
                    <label className="field-label">Title</label>
                    <input
                      type="text"
                      value={content.hero.title || ""}
                      onChange={(e) => updateContentField("hero", "title", e.target.value)}
                      className="field mt-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="field-label">Subtitle</label>
                    <input
                      type="text"
                      value={content.hero.subtitle || ""}
                      onChange={(e) => updateContentField("hero", "subtitle", e.target.value)}
                      className="field mt-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="field-label">Tagline</label>
                    <input
                      type="text"
                      value={content.hero.tagline || ""}
                      onChange={(e) => updateContentField("hero", "tagline", e.target.value)}
                      className="field mt-2"
                      required
                    />
                  </div>
                </div>

                {/* About Settings */}
                <div className="space-y-6 pt-4 border-t border-line/5">
                  <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-taupe">
                    About Section
                  </h3>
                  <div>
                    <label className="field-label">Title</label>
                    <input
                      type="text"
                      value={content.about.title || ""}
                      onChange={(e) => updateContentField("about", "title", e.target.value)}
                      className="field mt-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="field-label">Description</label>
                    <textarea
                      value={content.about.description || ""}
                      onChange={(e) => updateContentField("about", "description", e.target.value)}
                      className="field mt-2 resize-none"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                {/* Inquiry Welcome Settings */}
                <div className="space-y-6 pt-4 border-t border-line/5">
                  <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-taupe">
                    Welcome Section
                  </h3>
                  <div>
                    <label className="field-label">Title</label>
                    <input
                      type="text"
                      value={content.inquire.title || ""}
                      onChange={(e) => updateContentField("inquire", "title", e.target.value)}
                      className="field mt-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="field-label">Description</label>
                    <textarea
                      value={content.inquire.description || ""}
                      onChange={(e) => updateContentField("inquire", "description", e.target.value)}
                      className="field mt-2 resize-none"
                      rows={2}
                      required
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full border border-ivory/20 px-8 py-3.5 font-sans text-[10px] font-light uppercase tracking-[0.36em] text-ivory transition-all duration-500 hover:border-ivory hover:bg-ivory hover:text-void disabled:opacity-50"
                  >
                    {saving ? "SAVING..." : "SAVE WEBSITE COPY"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: Inquiries Viewer */}
          <div className="lg:col-span-7 space-y-12">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <h2 className="font-serif text-lg tracking-[0.2em] text-ivory uppercase">
                Inbox
              </h2>
              <span className="font-sans text-[9px] bg-line px-2.5 py-1 text-ivory/60 tracking-[0.16em] uppercase">
                {inquiries.length} submissions
              </span>
            </div>

            {inquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-line/20">
                <p className="font-sans text-[10px] font-light tracking-[0.26em] text-taupe uppercase">
                  No inquiries received yet.
                </p>
                <p className="mt-2 font-sans text-[9px] text-ivory/25">
                  Incoming relations will appear in this workspace.
                </p>
              </div>
            ) : (
              <div className="space-y-8 max-h-[80vh] overflow-y-auto pr-2">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="border border-line bg-void-deep/20 p-6 sm:p-8 space-y-6"
                  >
                    <div className="flex flex-col justify-between gap-4 border-b border-line/5 pb-4 sm:flex-row sm:items-start sm:gap-2">
                      <div>
                        <h4 className="font-serif text-base tracking-[0.06em] text-ivory">
                          {inq.name}
                        </h4>
                        <p className="font-sans text-[10px] tracking-[0.08em] text-taupe mt-1 select-all">
                          {inq.email}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end text-left sm:text-right gap-1">
                        <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-ivory/40">
                          Referred by:
                        </span>
                        <span className="font-sans text-[10px] font-medium tracking-[0.08em] text-ivory/80">
                          {inq.referredBy}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-ivory/20 block">
                        Message
                      </span>
                      <p className="font-sans text-xs font-light leading-7 text-ivory/70 whitespace-pre-line tracking-[0.02em]">
                        {inq.message}
                      </p>
                    </div>

                    <div className="text-right pt-2 border-t border-line/5">
                      <span className="font-sans text-[8px] tracking-[0.2em] text-ivory/25 uppercase">
                        {new Date(inq.createdAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
