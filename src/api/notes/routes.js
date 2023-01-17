const {
  addNoteHandler,
  getAllNottesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

// const routes = [
//   {
//     method: 'POST',
//     path: '/notes',
//     handler: addNoteHandler,
//   },
//   {
//     method: 'GET',
//     path: '/notes',
//     handler: getAllNottesHandler,
//   },
//   {
//     method: 'GET',
//     path: '/notes/{id}',
//     handler: getNoteByIdHandler,
//   },
//   {
//     method: 'PUT',
//     path: '/notes/{id}',
//     handler: editNoteByIdHandler,
//   },
//   {
//     method: 'DELETE',
//     path: '/notes/{id}',
//     handler: deleteNoteByIdHandler,
//   },
// ];

const routes = (handler) => [
    {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler,  // postNoteHandler hanya menerima dan menyimpan "satu" note.
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getAllNotesHandler, // getNotesHandler mengembalikan "banyak" note.
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler, // getNoteByIdHandler mengembalikan "satu" note.
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler, // putNoteByIdHandler hanya menerima dan mengubah "satu" note.
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler, // deleteNoteByIdHandler hanya menghapus "satu" note.
  },
];


module.exports = routes;
