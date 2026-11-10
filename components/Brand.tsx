import Image from "next/image";

export default function Brand() {
  return (
    <div className="brand">
      <Image
        src="/logo.png"
        alt="MathVenture"
        width={42}
        height={42}
        className="brand__logo"
        priority
      />
      <div className="brand__text">
        <div className="brand__name">MathVenture</div>
        <div className="brand__sub">Admin Panel</div>
      </div>
    </div>
  );
}
