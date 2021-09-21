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

  mostCommon = []
  for(genreKey in genres){
    mostCommon.push({"name" : genreKey, "count" : genres[genreKey]})
  }
  mostCommon.sort((genreA, genreB) => genreB.count - genreA.count);
  return mostCommon.slice(0,5);
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

  let mostPopular = [];
  for(authorName in authorRanking) {
    mostPopular.push({"name" : authorName, "count" : authorRanking[authorName]});
  }
  mostPopular.sort((authorA, authorB) => authorB.count - authorA.count);
  return mostPopular.slice(0,5);
}

function objectToName(authors, book){
  let authorName = authors.find(author => author.id == book.authorId).name
  let {first, last} = authorName;
  return first + " " + last
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
