import { Link } from "react-router-dom";

export default function Button({ children, to = "#", className = "", style = {}, onClick }) {
  return (
    <Link
      to={to}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}