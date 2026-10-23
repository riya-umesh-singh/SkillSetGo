import { Link } from "react-router-dom";

const variants = {
  primary: "bg-ink text-white hover:bg-[#2A3136]",
  secondary: "bg-transparent text-ink border border-ink hover:bg-ink hover:text-white",
  ghost: "text-sage-dark hover:text-ink",
  terracotta: "bg-terracotta text-ink hover:bg-[#E5B24E] font-semibold",
};

export default function Button({
  children,
  variant = "primary",
  to,
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  icon: Icon,
  iconPosition = "right",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[3px] px-5 py-2.5 text-[15px] font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
  const cls = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon size={17} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={17} />}
    </>
  );

  if (to) return <Link to={to} className={cls}>{content}</Link>;
  if (href) return <a href={href} className={cls}>{content}</a>;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {content}
    </button>
  );
}
