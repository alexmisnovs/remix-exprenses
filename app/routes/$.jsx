import { json, redirect } from "@remix-run/node";

export function loader({ params }) {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }

  throw json({ message: "Page Not Found" }, { status: 404, statusText: "Not Found" }); // this will render the CatchBounday component
}
