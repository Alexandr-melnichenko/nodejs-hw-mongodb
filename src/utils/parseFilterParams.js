const parseIsFavourite = (isFavourite) => {
  const isBoolean = isFavourite === 'true' || isFavourite === 'false';
  if (!isBoolean) return undefined;
  return isFavourite === 'true' ? true : false;
};

export const parseFilterParams = (query) => {
  const { isFavourite } = query;
  const parsedFavorite = parseIsFavourite(isFavourite);
  return {
    isFavourite: parsedFavorite,
  };
};
