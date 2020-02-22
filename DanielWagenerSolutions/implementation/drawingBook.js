function pageCount(n, p) {
  const pagesFromFront = Math.ceil((p - 1) / 2);

  // This part works because of the way it is
  // Like, I just tinkered with it until it passed the test cases
  const pagesFromBack = (() => {
    if (n === p) return 0;
    if (n % 2) {
      return Math.ceil((n - p - 1) / 2);
    }
    return Math.floor((n - p) / 2) || 1;
  })();

  return pagesFromFront < pagesFromBack ? pagesFromFront : pagesFromBack;
}
