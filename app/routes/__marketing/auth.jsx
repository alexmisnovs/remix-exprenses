import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";

export default function authPage() {
  return (
    <main id="content">
      <h1>Auth</h1>
      <AuthForm />
    </main>
  );
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: authStyles,
    },
  ];
}
