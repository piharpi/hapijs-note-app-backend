/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat user baru.
  pgm.sql(
    "INSERT INTO users(id, username, password, fullname) VALUES('old-notes', 'old-notes', 'old-notes', 'old-notes')",
  );

  // mengubah nilai owner pada note yang owner-nya bernilai null
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL");

  // memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus constraint fk_notes.owner_users.id
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // mengubah nilai owner old_notes mendjadi NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

  // menghapus user baru
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};