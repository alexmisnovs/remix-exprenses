import {
  Form,
  Link,
  useSearchParams,
  useTransition as useNavigation,
  useActionData,
} from "@remix-run/react";
import { FaLock, FaUserPlus } from "react-icons/fa";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const authMode = searchParams.get("mode") || "login";

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const submitButtonCaption = authMode === "login" ? "Login" : "Signup";
  const toggleBtnCaption =
    authMode === "login" ? "Signup for a new Account" : "Already have an account? Login";

  const validationErrors = useActionData();
  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">{authMode === "login" ? <FaLock /> : <FaUserPlus />}</div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Authenticating.." : submitButtonCaption}
        </button>
        <Link to={authMode === "login" ? "?mode=signup" : "?mode=login"}>{toggleBtnCaption}</Link>
      </div>
    </Form>
  );
}

export default AuthForm;
