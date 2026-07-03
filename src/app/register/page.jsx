import RegisterForm from "@/components/sections/register/RegisterForm";

export const metadata = {
  title: "Register",
  description:
    "Reserve your spot at Camp2Code. Fill in your details and complete registration via WhatsApp.",
  alternates: { canonical: "/register" },
  openGraph: {
    title: "Register for Camp2Code",
    description:
      "Reserve your spot for the next cohort. Fill in your details and complete registration via WhatsApp.",
    url: "/register",
  },
};

export default function RegisterPage() {
  return (
    <main>
      <RegisterForm />
    </main>
  );
}
