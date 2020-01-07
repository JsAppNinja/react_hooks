// @TODO currency conversion, manage symbols
export function formatCurrency(price) {
  const dollarAmount = price / 100;
  return `$${dollarAmount.toFixed(2)}`;
}
