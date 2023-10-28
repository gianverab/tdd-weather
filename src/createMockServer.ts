import { createServer } from "miragejs";
import seachResults from "./api/search-result.json";
import weather from "./api/weather.json";

export const createMockServer = () => {
  return createServer({
    routes() {
      this.urlPrefix = "https://api.openweathermap.org";
      this.get("/geo/1.0/direct", () => {
        return seachResults;
      });
      this.get("/data/2.5/weather", () => {
        return weather;
      });
    },
  });
};
