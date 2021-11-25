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
};

export default config;
