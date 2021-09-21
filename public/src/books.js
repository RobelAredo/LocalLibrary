function findAuthorById(authors, id) {
  return findObjectId(authors, id);
}
function findBookById(books, id) {
  return findObjectId(books, id);
}

function findObjectId(objects, id) {
  return objects.find(object => object.id == id);
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
  findObjectId,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
