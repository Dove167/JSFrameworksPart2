import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Contact - Awesome Portfolio",
  description: "Get in touch with me. Send a message and I'll get back to you as soon as possible.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Get In Touch
        </h1>
        <p className="text-sm text-muted-foreground">
          Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.
        </p>
      </header>

      <div className="mt-6">
        <ContactForm />
      </div>
    </section>
  );
}