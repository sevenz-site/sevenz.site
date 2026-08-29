import Image from "next/image";

const FLAG_SRC: Record<"USD" | "EUR" | "VES", string> = {
  USD: "/flags/usd.svg",
  EUR: "/flags/eur.svg",
  VES: "/flags/ves.svg",
};

export function CurrencyFlagIcon({ currency }: { currency: "USD" | "EUR" | "VES" }) {
  return (
    <Image
      src={FLAG_SRC[currency]}
      alt=""
      width={16}
      height={16}
      className="inline-block size-4 shrink-0 rounded-full"
    />
  );
}
