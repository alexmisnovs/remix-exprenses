import { FaExclamationCircle } from "react-icons/fa";

function Error({ title, message }) {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {message}
    </div>
  );
}

export default Error;
