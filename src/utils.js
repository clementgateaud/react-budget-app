export const currencyFormatter = new Intl.NumberFormat("en-us", {
  currency: "usd",
  style: "currency",
  minimumFractionDigits: 0,
});