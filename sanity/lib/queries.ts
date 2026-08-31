export const POSTS_QUERY = `
  *[_type == "post"] | order(date desc) {
    _id,
    titleEn,
    titleKo,
    date,
    category,
    bodyEn,
    bodyKo
  }
`