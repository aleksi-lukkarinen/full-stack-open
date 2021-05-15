
function byLikesTitlesAuthors(a, b) {
  if (a.likes > b.likes) return -1
  if (a.likes < b.likes) return 1

  const lcTitleA = a.title.toLowerCase()
  const lcTitleB = b.title.toLowerCase()
  if (lcTitleA < lcTitleB) return -1
  if (lcTitleA > lcTitleB) return 1

  const authorA = a.author.toLowerCase()
  const authorB = b.author.toLowerCase()
  if (authorA < authorB) return -1
  if (authorA > authorB) return 1

  if (a.title < b.title) return -1
  if (a.title > b.title) return 1

  return 0
}


const comparisons = {
  byLikesTitlesAuthors
}

export default comparisons
