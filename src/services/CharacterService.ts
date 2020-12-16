import Character from "@/models/character";
import axios, { AxiosInstance, AxiosResponse } from "axios";

class CharacterService {
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

  async get(pageNum: number, pageSize: number): Promise<Character[]> {
    const result = await this.getAll();

    return result.slice((pageNum - 1) * pageSize, pageSize * pageNum);
  }

  async getById(id: number): Promise<Character | null> {
    return (
      await this.operate(
        async () => await this.client.get<Character | null>(`/${id}`)
      )
    ).data;
  }

  groupBy(list: Character[], getKey: (item: Character) => string) {
    const map = new Map<string, Character[]>();

    list.forEach(item => {
      const key = getKey(item);
      const collection = map.get(key);

      if (!collection) map.set(key, [item]);
      else collection.push(item);
    });

    return Array.from(map.entries());
  }

  async getRandomRelatedCharacters(
    currentCharacter: Character,
    getKey: (item: Character) => string,
    relatedItemCount: number
  ): Promise<Character[]> {
    const result = await this.getAll();
    const arr: number[] = [];
    const filteredResult = result.filter(
      e => getKey(e) === getKey(currentCharacter) && e.id != currentCharacter.id
    );

    if (filteredResult.length >= relatedItemCount) {
      while (arr.length < relatedItemCount) {
        const r = Math.floor(Math.random() * filteredResult.length);
        if (arr.indexOf(r) === -1) arr.push(r);
      }
    } else {
      return filteredResult;
    }

    return arr.map(e => filteredResult[e]);
  }

  async operate<T>(fn: () => Promise<AxiosResponse<T>>, customError?: Error) {
    try {
      return await fn();
    } catch (err) {
      if (process.env.NODE_ENV === "production")
        if (customError) throw customError;
        else throw Error("something went wrong");
      else throw err;
    }
  }
}

export default new CharacterService();
