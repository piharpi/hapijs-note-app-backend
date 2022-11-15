const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const id = nanoid(16);
  const { title, tags, body } = request.payload;
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId: id,
        },
      })
      .code(201);
  }

  return h
    .response({
      status: 'failed',
      message: 'Catatan gagal ditambahkan',
    })
    .code(500);
};

const getAllNottesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.find((n) => n.id === id);

  if (note) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  return h
    .response({
      status: 'failed',
      message: 'Catatan tidak ditemukan',
    })
    .code(404);
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.find((n) => n.id === id);
  const indexNote = notes.indexOf(note);

  const {
    title = note.title,
    body = note.body,
    tags = note.tags,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  if (note) {
    notes[indexNote] = {
      ...notes[indexNote],
      title,
      body,
      tags,
      updatedAt,
    };

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      })
      .code(200);
  }

  return h
    .response({
      status: 'success',
      message: 'Gagal memperbaharui catatan, Id tidak ditemukan',
    })
    .code(404);
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const noteIndex = notes.findIndex((n) => n.id === id);

  if (noteIndex !== -1) {
    notes.splice(noteIndex);
    return { status: 'success', message: 'Catatan berhasil dihapus' };
  }

  return h
    .response({
      status: 'failed',
      message: 'Catatan gagal dihapus, Id tidak ditemukan',
    })
    .code(404);
};

module.exports = {
  addNoteHandler,
  getAllNottesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
