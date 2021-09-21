function findAccountById(accounts, id) {
  return accounts.find(account => id == account.id);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => accountA.name.last >= accountB.name.last ? 1 : -1);
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    book.borrows.filter((borrower) => (borrower.id === account.id ? acc++ : false));
    return acc;
  }, 0)

  // return books.reduce((acc, book) => {
  //   acc += book.borrows.reduce((acc2, borrower) => {
  //     if(borrower.id == account.id) acc2 += 1;
  //     return acc2;
  //   }, 0);
  //   return acc;
  // }, 0)
}

function getBooksPossessedByAccount(account, books, authors) {
  let result = [];
  books.forEach(book => {
    if(!book.borrows[0].returned && account.id == book.borrows[0].id) {
      let author = authors.find(author => author.id == book.authorId);
      let match = {...book, author};
      result.push(match);
    }
  })
  return result;

  // let checkOuts = books.filter(book => book.borrows[0].returned && borrower.id == account.id);
  // return checkOuts.map(book => {
  //   let author = authors.find(author => author.id == book.authorId);
  //   checkOut = {...book, author};
  //   return checkOut;
  // })
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
