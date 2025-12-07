export default function Button({ children, href = "#", className = "", style = {}, onClick }) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </a>
  );
}