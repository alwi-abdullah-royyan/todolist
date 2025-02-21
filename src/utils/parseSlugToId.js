export const parseSlugToId = (slug) => {
  if (!slug) return null;

  const [id] = slug.split("-");
  const numericId = Number(id);

  return isNaN(numericId) ? null : numericId;
};
