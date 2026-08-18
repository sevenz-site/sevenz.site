import Image from "next/image";

export function ProductShot({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div className={`w-full overflow-hidden rounded-xl border shadow-sm ${className ?? ""}`}>
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
    </div>
  );
}
