const { hostname, host } = window.location
export const isProduction = hostname === "top.amsterdam.nl"
export const isAcc = hostname === "acc.straatnotes.amsterdam.nl"
export const isDevelopment = hostname === "localhost"
export const forceAcc = host === "localhost:3001"
