export function reducer(state, action) {
  switch (action.type) {
    case "scrapedData":
      let scrapedData = action.payload;
      state.scrapedData = scrapedData;
      return { ...state };
    default:
      throw new Error();
  }
}
