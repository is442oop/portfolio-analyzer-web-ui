export const formatUsd = (amount: number) => {
    return Number.isNaN(amount)
        ? 0
        : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
          }).format(amount);
};

export const formatPercentage = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

export const formatNumber = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

export const formatUsdWatchlist = (amount: number) => {
    let formattedAmount = amount;
    let finalformattedAmount;
    let format = "";
    if (amount >= 1e9) {
        formattedAmount = Number((amount / 1e9).toFixed(2));
        format = " B";
    } else if (amount >= 1e6) {
        formattedAmount = Number((amount / 1e6).toFixed(2));
        format = " M";
    }
    finalformattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(formattedAmount);

    finalformattedAmount = finalformattedAmount + format;
    return finalformattedAmount;
};

export const formatAvatarFallback = (email: string) => {
    if (email) return email.substring(0, 2).toUpperCase();
};
