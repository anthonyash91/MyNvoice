export function shortenNum(num) {
  if (num < 1e6)
    return num?.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  // if (num < 1e6) return num.toFixed(2);

  let letter = [
      { v: 1e3, s: 'k+' },
      { v: 1e6, s: 'm+' },
      { v: 1e9, s: 'b+' },
      { v: 1e12, s: 't+' },
      { v: 1e15, s: 'q+' }
    ],
    t;

  for (t = letter.length - 1; t > 0 && !(num >= letter[t].v); t--);

  return (
    (num / letter[t].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
    letter[t].s
  );
}
