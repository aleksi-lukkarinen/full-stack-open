
function byVotesContent(a, b) {
  if (a.votes > b.votes) return -1
  if (a.votes < b.votes) return 1

  const lcContentA = a.content.toLowerCase()
  const lcContentB = b.content.toLowerCase()
  if (lcContentA < lcContentB) return -1
  if (lcContentA > lcContentB) return 1

  if (a.content < b.content) return -1
  if (a.content > b.content) return 1

  return 0
}


const comparisons = {
  byVotesContent
}

export default comparisons
