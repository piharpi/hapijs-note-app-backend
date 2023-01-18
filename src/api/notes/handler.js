// const { nanoid } = require('nanoid');
// const notes = require('../../services/inMemory/notesService');

// const addNoteHandler = (request, h) => {
//   const id = nanoid(16);
//   const { title, tags, body } = request.payload;
//   const createdAt = new Date().toISOString();
//   const updatedAt = new Date().toISOString();

//   const newNote = {
//     id,
//     title,
//     tags,
//     body,
//     createdAt,
//     updatedAt,
//   };

//   notes.push(newNote);

//   const isSuccess = notes.filter((note) => note.id === id).length > 0;

//   if (isSuccess) {
//     return h
//       .response({
//         status: 'success',
//         message: 'Catatan berhasil ditambahkan',
//         data: {
//           noteId: id,
//         },
//       })
//       .code(201);
//   }

//   return h
//     .response({
//       status: 'failed',
//       message: 'Catatan gagal ditambahkan',
//     })
//     .code(500);
// };

// const getAllNotesHandler = () => ({
//   status: 'success',
//   data: {
//     notes,
//   },
// });

// const getNoteByIdHandler = (request, h) => {
//   const { id } = request.params;

//   const note = notes.find((n) => n.id === id);

//   if (note) {
//     return {
//       status: 'success',
//       data: {
//         note,
//       },
//     };
//   }

//   return h
//     .response({
//       status: 'failed',
//       message: 'Catatan tidak ditemukan',
//     })
//     .code(404);
// };

// const editNoteByIdHandler = (request, h) => {
//   const { id } = request.params;
//   const note = notes.find((n) => n.id === id);
//   const indexNote = notes.indexOf(note);

//   const {
//     title = note.title,
//     body = note.body,
//     tags = note.tags,
//   } = request.payload;
//   const updatedAt = new Date().toISOString();

//   if (note) {
//     notes[indexNote] = {
//       ...notes[indexNote],
//       title,
//       body,
//       tags,
//       updatedAt,
//     };

//     return h
//       .response({
//         status: 'success',
//         message: 'Catatan berhasil diperbarui',
//       })
//       .code(200);
//   }

//   return h
//     .response({
//       status: 'failed',
//       message: 'Gagal memperbaharui catatan, Id tidak ditemukan',
//     })
//     .code(404);
// };

// const deleteNoteByIdHandler = (request, h) => {
//   const { id } = request.params;

//   const noteIndex = notes.findIndex((n) => n.id === id);

//   if (noteIndex !== -1) {
//     notes.splice(noteIndex);
//     return { status: 'success', message: 'Catatan berhasil dihapus' };
//   }

//   return h
//     .response({
//       status: 'failed',
//       message: 'Catatan gagal dihapus, Id tidak ditemukan',
//     })
//     .code(404);
// };

// module.exports = {
//   addNoteHandler,
//   getAllNotesHandler,
//   getNoteByIdHandler,
//   editNoteByIdHandler,
//   deleteNoteByIdHandler,
// };


class NotesHandler {
  constructor(service, h) {
    this._service = service;
  };

  postNoteHandler(request) {
    
    try {
      const {title = 'untitled', body, tags} = request.payload;
      
      const noteId = this._service.addNoteHandler(title, body, tags);

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });

      response.code(201);
      return response;
    } catch(error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(400);
      return response;
    }
  }

  getNotesHandler() {
    const notes = this._service.getNotes();
    return {
      status: 'success',
      data : {
        notes,
      },
    };
  }

  getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const note = this._service.getNoteById(id);
  
      return {
        status: 'success',
        data : {
          note
        },
      };
    } catch (err) {
      const response = h.response({
        status: 'fail',
        message: err.message,
      });

      response.code(404);
      return response;
    }

  }

  putNoteHandler(request) {
    try {
      
      const { id } = request.params;

      this._service.putNote(id, request.payload);

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(404);
      return response;
    }
  }

  deleteNoteByIdHandler(request) {
    try {
      const { id } = request.params;
      this._service.deleteNoteById(id);

      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(404);
      return response;
    }
  }
}

module.exports = NotesHandler;