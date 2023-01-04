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

export async function action({ request }) {
  // const url = new URL(request.url);
  // console.log(url);
  const searchParams = new URL(request.url).searchParams;

  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  // validate the user data
  const credentials = Object.fromEntries(formData);
  console.log(credentials);
  if (authMode === "login") {
    // login logic
  } else {
    //signup logic
  }
  return null;
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: authStyles,
    },
  ];
}
