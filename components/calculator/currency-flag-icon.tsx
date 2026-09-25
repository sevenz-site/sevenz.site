import Image from "next/image";

const FLAG_SRC: Record<"USD" | "EUR" | "VES" | "USDT", string> = {
  USD: "/flags/usd.svg",
  EUR: "/flags/eur.svg",
  VES: "/flags/ves.svg",
  // No es una bandera: el USDT no tiene país. Es la marca de Tether, que es
  // lo que un tendero reconoce en Binance.
  USDT: "/flags/usdt.svg",
};

export function CurrencyFlagIcon({ currency }: { currency: "USD" | "EUR" | "VES" | "USDT" }) {
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
