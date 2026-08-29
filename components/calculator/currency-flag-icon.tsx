import Image from "next/image";

const FLAG_SRC: Record<"USD" | "EUR", string> = {
  USD: "/flags/usd.svg",
  EUR: "/flags/eur.svg",
};

export function CurrencyFlagIcon({ currency }: { currency: "USD" | "EUR" }) {
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
