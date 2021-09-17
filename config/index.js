const USER_DB = process.env.MONGO_INITDB_ROOT_USERNAME;
const PASS_DB = process.env.MONGO_INITDB_ROOT_PASSWORD;

//export const mongoUrl = `mongodb://${USER_DB}:${PASS_DB}@db:27017/venemed?authSource=admin`;
export const mongoUrl = `mongodb://${USER_DB}:${PASS_DB}@venemed.vidaplatform.com:27017/venemed?authSource=admin`;
