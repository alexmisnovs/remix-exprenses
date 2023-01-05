import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";
import { validateCredentials } from "~/data/validation.server";
import { signup } from "~/data/auth.server";
import { redirect } from "react-router";

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
  try {
    validateCredentials(credentials);
  } catch (err) {
    return err; // to use it with the useActionData hook
  }

  try {
    if (authMode === "login") {
      // login logic
    } else {
      //signup logic
      await signup(credentials);
      // console.log(result);
      return redirect("/expenses");
    }
  } catch (error) {
    if (error.status === 422) {
      console.log("got to catch");

      return { credentials: error.message };
    }
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
