import { server } from "./app";

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
