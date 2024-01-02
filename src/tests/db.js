import mongoose from "mongoose";

const DB_URI = process.env.DB_URI_TEST;

const connect = () => {
  mongoose.Promise = Promise;
  mongoose.connect(DB_URI);
};

const disconnect = (done) => {
  mongoose.disconnect(done);
};

export { connect, disconnect };
