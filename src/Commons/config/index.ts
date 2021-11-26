import dotenv from 'dotenv';

dotenv.config();

const config = {
  dynamodb: {
    tables: {
      users: {
        NAME: process.env.USERS_TABLE,
        index: {
          BY_USERNAME: process.env.USERS_BY_USERNAME_INDEX,
        },
      },
    },
  },
  token: {
    jwt: {
      SECRET_NAME: process.env.TOKEN_JWT_SECRET_NAME,
      SECRET_FIELD: process.env.TOKEN_JWT_SECRET_FIELD,
      EXPIRES_TIME: process.env.TOKEN_JWT_EXPIRES_TIME,
    },
  },
};

export default config;
