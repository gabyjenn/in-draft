export const POSTS_QUERY = `
  *[_type == "post"] | order(sortOrder asc) {
    _id,
    titleEn,
    titleKo,
    date,
    sortOrder,
    category,
    bodyEn,
    bodyKo
  }
`