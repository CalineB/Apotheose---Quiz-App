const createSlug = (title: string) => {
  const lowTitle = title.toLowerCase();
  const slug = lowTitle.split(' ').join('-');
  return slug;
};
export default createSlug;
