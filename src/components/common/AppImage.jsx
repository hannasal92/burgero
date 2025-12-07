export default function AppImage({
  src,
  alt = "",
  className = "",
  width,
  height,
  style = {},
  onClick
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={style}
      onClick={onClick}
      loading="lazy"
    />
  );
}