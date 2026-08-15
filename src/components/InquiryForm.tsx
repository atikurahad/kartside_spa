import { FormEvent, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useMagnetic } from "../hooks/useMagnetic";
import defaultInquiries from "../data/inquiries.json";
import {
  emptyInquiryForm,
  type InquiryFormData,
  type InquiryFormErrors,
} from "../types/inquiry";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: InquiryFormData): InquiryFormErrors {
  const errors: InquiryFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Required.";
  }

  if (!values.email.trim()) {
    errors.email = "Required.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "A valid email is required.";
  }

  if (!values.referredBy.trim()) {
    errors.referredBy = "Required.";
  }

  if (!values.message.trim()) {
    errors.message = "Required.";
  }

  return errors;
}

export function InquiryForm() {
  const [values, setValues] = useState<InquiryFormData>(emptyInquiryForm);
  const [errors, setErrors] = useState<InquiryFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submitBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.32, threshold: 80 });

  const updateField = (field: keyof InquiryFormData, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("PLEASE COMPLETE ALL REQUIRED FIELDS.");
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("INQUIRY RECEIVED.");
    }, 900);
  };

  if (submitted) {
    return <SuccessState />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto w-full max-w-md space-y-8"
    >
      <Field
        id="name"
        label="Name"
        value={values.name}
        error={errors.name}
        autoComplete="name"
        onChange={(value) => updateField("name", value)}
      />
      <Field
        id="email"
        label="Email"
        type="email"
        value={values.email}
        error={errors.email}
        autoComplete="email"
        onChange={(value) => updateField("email", value)}
      />
      <Field
        id="referredBy"
        label="Referred by"
        value={values.referredBy}
        error={errors.referredBy}
        autoComplete="off"
        onChange={(value) => updateField("referredBy", value)}
      />
      <Field
        id="message"
        label="Message"
        as="textarea"
        value={values.message}
        error={errors.message}
        onChange={(value) => updateField("message", value)}
      />

      <div className="form-button-container pt-6 text-center">
        <button
          ref={submitBtnRef}
          type="submit"
          disabled={submitting}
          className="min-w-[14rem] border border-ivory/60 px-10 py-4 font-sans text-[10px] font-light uppercase tracking-[0.36em] text-ivory transition-all duration-500 hover:border-ivory hover:bg-ivory hover:text-void disabled:cursor-wait disabled:opacity-50"
        >
          {submitting ? "SENDING" : "SUBMIT INQUIRY"}
        </button>
      </div>
    </form>
  );
}

function SuccessState() {
  const successRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(successRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      tl.fromTo(
        ".success-hairline",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
        "-=0.3"
      );
      tl.fromTo(
        ".success-title",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
      tl.fromTo(
        ".success-text",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    },
    { scope: successRef }
  );

  return (
    <div
      ref={successRef}
      className="mx-auto flex max-w-md flex-col items-center px-2 text-center"
    >
      <span className="success-hairline hairline mb-10 origin-center" />
      <h2 className="success-title font-serif text-3xl tracking-[0.22em] text-ivory sm:text-4xl">
        RECEIVED.
      </h2>
      <p className="success-text mt-8 font-sans text-xs font-light leading-8 tracking-[0.06em] text-ivory/60 sm:text-sm">
        Your inquiry has been noted. We will be in touch should the relationship
        proceed.
      </p>
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  as?: "input" | "textarea";
  onChange: (value: string) => void;
}

function Field({
  id,
  label,
  value,
  error,
  type = "text",
  autoComplete,
  as = "input",
  onChange,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const describedBy = error ? `${id}-error` : undefined;
  const isFilled = value.length > 0;

  return (
    <div className="form-field relative pt-6">
      {/* Premium Floating Label */}
      <label
        htmlFor={id}
        className={`absolute left-0 top-7 select-none font-sans text-[10px] uppercase tracking-[0.32em] transition-all duration-500 ease-luxe origin-left pointer-events-none ${
          focused || isFilled
            ? "translate-y-[-26px] scale-[0.85] text-taupe"
            : "text-ivory/60"
        }`}
      >
        {label}
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(event) => onChange(event.target.value)}
          className="field mt-2 resize-none border-b border-ivory/10 outline-none"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(event) => onChange(event.target.value)}
          className="field mt-2 border-b border-ivory/10 outline-none"
        />
      )}

      {/* Center-Expanding Underline */}
      <span
        className={`absolute bottom-0 left-0 h-px w-full bg-ivory origin-center scale-x-0 transition-transform duration-700 ease-luxe ${
          focused ? "scale-x-100" : ""
        }`}
      />

      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 font-sans text-[10px] font-light tracking-[0.18em] text-taupe"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
