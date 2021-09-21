function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => book.borrows[0].returned ? acc : acc + 1, 0);
}

function getMostCommonGenres(books) {
  let genres = books.reduce((acc, book) => {
    acc[book.genre];
    if(!acc[book.genre]){
      acc[book.genre] = 1;
      return acc;
    }
    acc[book.genre] ++;
    return acc;
  }, {})

  genresKeys = Object.keys(genres);
  genres = genresKeys.map(genreKey => {return {"name" : genreKey, "count" : genres[genreKey]}});
  genres.sort((genreA, genreB) => genreB.count - genreA.count);

  return genres.slice(0,5);
  // {historical : 3, fiction : 1, Thiller : 2}
  // [historical, fiction, Thriller]
  //     V           V         V  
  // [{name: historical, counts: 3}, ]
}

function getMostPopularBooks(books) {
  books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length);
  return books.slice(0,5).map(book => { return {"name" : book.title, "count" : book.borrows.length}});
}

function getMostPopularAuthors(books, authors) {
  let authorRanking = books.reduce((acc, book) => {
    let authorName = objectToName(authors, book);
    if(!acc[book.authorId]){
      acc[authorName] = book.borrows.length;
      return acc;
    }
    acc[authorName] += book.borrows.length;
    return acc;
  }, {})

  rankKeys = Object.keys(authorRanking);
  authorRanking = rankKeys.map(authorName => {return {"name" : authorName, "count" : authorRanking[authorName]}});
  authorRanking.sort((authorA, authorB) => authorB.count - authorA.count);

  return authorRanking.slice(0,5);
}

function objectToName(authors, book){
  let authorName = authors.find(author => author.id == book.authorId).name
  return authorName.first + " " + authorName.last
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
