const { nanoid } = require('nanoid')
const books = require('./books')

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading, } = request.payload;

  const id = nanoid(16);
  // const finished = ;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400);
    return response;
  }
  
  const newBook = {
    id, 
    name, 
    year, 
    author, 
    summary, 
    publisher, 
    pageCount, 
    readPage, 
    finished: pageCount === readPage, 
    reading, 
    insertedAt, 
    updatedAt
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  })

  response.code(500)
  return response
}

const getAllBooks = (request, h) => {
  const {name, reading, finished} = request.query;
  let filtered = books;

  if (name){
    filtered = filtered.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading){
    filtered = filtered.filter((book) => book.reading === Boolean(+reading));
  }

  if (finished){
    filtered = filtered.filter((book) => book.finished === Boolean(+finished))
  }
  
  const response = h.response({
    status: 'success',
    data: {
      books: filtered.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      })),
    },
  });
  response.code(200)
  return response;
}


const getBooksDetail = (request, h) =>{
  const {bookId} = request.params;
  const book = books.filter((b) => b.id === bookId)[0];

  if(book !== undefined){
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  });

  response.code(404);
  return response;
}

const editBookByIdHandler = (request, h) =>{
  const {bookId} = request.params;
  
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
  
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400);
    return response;
  }
  
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1){
    books[index] = {
      ...books[index],
      name, 
      year, 
      author, 
      summary, 
      publisher, 
      pageCount, 
      readPage, 
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}

const deteleBooksByIdHandler = (request, h) => {
  const {bookId} = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if(index !== -1){
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}


module.exports = { addBookHandler, getAllBooks, getBooksDetail, editBookByIdHandler, deteleBooksByIdHandler};