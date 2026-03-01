import { Connection, Mongoose } from 'mongoose';

declare global {
  // Menambahkan mongoose ke dalam scope global
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

// Baris ini penting agar file ini dianggap sebagai modul
export {};