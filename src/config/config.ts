import dotenv from "dotenv";

const paths = {
  dev: ".env",
  test: ".env.test",
};

const path = paths[process.env.NODE_ENV];

dotenv.config({ path });
