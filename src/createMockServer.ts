import { createServer } from "miragejs";
import seachResults from "./search-result.json";

export const createMockServer = () => {
  return createServer({
    routes() {
      this.urlPrefix = "https://api.openweathermap.org";
      this.get("/geo/1.0/direct", () => {
        return seachResults;
      });
    },
  });
};
