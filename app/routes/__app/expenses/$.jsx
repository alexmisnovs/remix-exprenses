import { json, redirect } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import { FaExclamationCircle } from "react-icons/fa";

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
  const catchResponse = useCatch();
  const message = catchResponse.data?.message || "Data not found";
  return (
    <main>
      <div className="error">
        <div className="icon">
          <FaExclamationCircle />
        </div>
        <h2>{catchResponse.statusText}</h2>
        <p>{message}</p>
      </div>
    </main>
  );
}

// will catxh all unhandled errors
export function ErrorBoundary({ error }) {
  return (
    <main>
      <div className="error">
        <div className="icon">
          <FaExclamationCircle />
        </div>
        <h2>Something's off..</h2>
        <p>{error.message}</p>
      </div>
    </main>
  );
}
