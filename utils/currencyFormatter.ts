export type CurrencyCode = "NPR" | "USD" | "EUR";

export const formatCurrency = (
  value: number,
  currency: CurrencyCode = "NPR"
): string => {
  switch (currency) {
    case "USD":
      return `$${value.toLocaleString("en-US")}`;

    case "EUR":
      return `€${value.toLocaleString("de-DE")}`;

    case "NPR":
    default:
      return `Rs ${value.toLocaleString("en-NP")}`;
  }
};
