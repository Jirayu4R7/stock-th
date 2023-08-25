export function currency(_value) {
  const currencyTHLocale = Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  });

  return currencyTHLocale.format(_value);
}

export function displayNumber(_value) {
  const currencyTHLocale = Intl.NumberFormat("th-TH");
  return currencyTHLocale.format(_value);
}
