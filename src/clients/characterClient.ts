import Character from "@/models/character";
import { ProductionError } from "@/utils/errors/productionError";
import axios, { AxiosInstance, AxiosResponse } from "axios";

class CharacterClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://finalspaceapi.com/api/v0/character",
      headers: { accept: "application/json" }
    });
  }

  async getAll(): Promise<Character[]> {
    return (
      await this.operate(async () => await this.client.get<Character[]>(""))
    ).data;
  }

  async operate<T>(fn: () => Promise<AxiosResponse<T>>, customError?: Error) {
    try {
      return await fn();
    } catch (err) {
      if (customError) throw customError;
      else if (process.env.NODE_ENV === "production")
        throw new ProductionError();
      else throw err;
    }
  }
}

const characterClient = new CharacterClient();

export default characterClient;
