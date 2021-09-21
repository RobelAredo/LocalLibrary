function findAuthorById(authors, id) {
  return authors.find(author => author.id == id);
}
function findBookById(books, id) {
  return books.find(book => book.id == id);
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce((acc, book) => {
    if(book.borrows.every(borrowed => borrowed.returned)){
      acc[1].push(book);
      return acc;
    }
    acc[0].push(book);
    return acc;
  }, [[],[]])
}

function getBorrowersForBook(book, accounts) {
  return book.borrows.slice(0,10).map(borrowed => {
    let {returned} = borrowed;
    return {...accounts.find(account => account.id == borrowed.id), returned};
  });
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
