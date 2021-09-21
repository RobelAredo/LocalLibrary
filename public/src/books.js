const {findAccountById} = require("./accounts.js")

function findAuthorById(authors, id) {
  return findObjectById(authors, id);
}
function findBookById(books, id) {
  return findObjectById(books, id);
}

function findObjectById(objects, id) {
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
  const matchAccount = findObjectById;
  return book.borrows.slice(0,10).map(borrowed => {
    let {returned, id} = borrowed;
    return {...matchAccount(accounts, id), returned};
  });
}

module.exports = {
  findAuthorById,
  findBookById,
  findObjectById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
