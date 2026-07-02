import RegisterForm from "@/components/sections/register/RegisterForm";

export const metadata = {
  title: "Register",
  description:
    "Reserve your spot at Camp2Code. Fill in your details and complete registration via WhatsApp.",
};

export default function RegisterPage() {
  return (
    <main>
      <RegisterForm />
    </main>
  );
}
