import { json, redirect } from "@remix-run/node";
import { useCatch, Link } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";

// without the actual component it will only output jason from the response
export default function CatchAll() {
  return <></>;
}

export async function loader({ params }) {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }

  const message = `Sorry we can't find this page | ${params["*"]}`;

  throw json({ message }, { status: 404, statusText: "Not Found" }); // this will render the CatchBounday component
}

export function CatchBoundary() {
  const { data } = useCatch();
  const message = data?.message || "Data not found";
  return (
    <main>
      <MainHeader />
      <p className="info-message">{message}</p>
      <p className="info-message">
        Back to <Link to="/">Home</Link>
      </p>
    </main>
  );
}
