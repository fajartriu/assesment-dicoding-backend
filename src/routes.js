const {addBookHandler, getAllBooks, getBooksDetail, editBookByIdHandler, deteleBooksByIdHandler} = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksDetail,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler,
  },
  {
    method: "DELETE",
    path: '/books/{bookId}',
    handler: deteleBooksByIdHandler,
  },
];

module.exports = routes


