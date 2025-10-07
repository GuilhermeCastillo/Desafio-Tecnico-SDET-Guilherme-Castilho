import { CONSTANTS } from "../utils/constants.js";

export class NotionAPI {
  constructor() {
    this.baseURL = "https://api.notion.com/v1";
    this.headers = CONSTANTS.NOTION_HEADERS;
  }

  async queryDatabase() {
    const response = await fetch(
      `${this.baseURL}/databases/${CONSTANTS.DATABASE_ID}/query`,
      {
        method: "POST",
        headers: this.headers,
      }
    );
    return await response.json();
  }

  async getDatabaseSchema() {
    const response = await fetch(
      `${this.baseURL}/databases/${CONSTANTS.DATABASE_ID}`,
      {
        method: "GET",
        headers: this.headers,
      }
    );
    return await response.json();
  }

  async createPokemon(pokemonData) {
    const data = {
      parent: { database_id: CONSTANTS.DATABASE_ID },
      properties: {
        Nome: { title: [{ text: { content: pokemonData.name } }] },
        Nível: { number: pokemonData.level },
        Ataque: { number: pokemonData.attack },
        Defesa: { number: pokemonData.defense },
        Stamina: { number: pokemonData.stamina },
        Pokemon: { rich_text: [{ text: { content: pokemonData.species } }] },
        "Festival Ativo": { checkbox: false },
      },
    };

    const response = await fetch(`${this.baseURL}/pages`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async updatePokemon(pageId, properties) {
    const data = { properties };

    const response = await fetch(`${this.baseURL}/pages/${pageId}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async deletePokemon(pageId) {
    const data = { archived: true };

    const response = await fetch(`${this.baseURL}/pages/${pageId}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async getAllPokemons() {
    try {
      const response = await fetch(
        `${this.baseURL}/databases/${process.env.NOTION_DATABASE_ID}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error(`Erro Notion API: ${response.status}`);

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Erro ao buscar pokémons:", error);
      return this.getMockPokemons();
    }
  }

  getMockPokemons() {
    // Mock para teste
    return [
      {
        properties: {
          Nome: { title: [{ text: { content: "PIKACHU" } }] },
          "Festival Ativo": { checkbox: false },
        },
      },
      {
        properties: {
          Nome: { title: [{ text: { content: "CHARIZARD" } }] },
          "Festival Ativo": { checkbox: false },
        },
      },
    ];
  }
  async getPokemonByName(name) {
    const database = await this.queryDatabase();
    return database.results.find(
      (pokemon) => pokemon.properties.Nome?.title[0]?.text.content === name
    );
  }

  async getAllPidgeys() {
    const database = await this.queryDatabase();
    return database.results.filter(
      (pokemon) =>
        pokemon.properties.Pokemon?.rich_text[0]?.text.content === "Pidgey"
    );
  }

  async getDatabaseViews() {
    const response = await fetch(
      `${this.baseURL}/databases/${CONSTANTS.DATABASE_ID}`,
      {
        method: "GET",
        headers: this.headers,
      }
    );
    const database = await response.json();
    return database.views || [];
  }

  async queryDatabaseWithFilter(filter) {
    const response = await fetch(
      `${this.baseURL}/databases/${CONSTANTS.DATABASE_ID}/query`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ filter }),
      }
    );
    return await response.json();
  }

  async queryDatabaseWithSorts(sorts) {
    const response = await fetch(
      `${this.baseURL}/databases/${CONSTANTS.DATABASE_ID}/query`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ sorts }),
      }
    );
    return await response.json();
  }

  // Filtro específico para Pidgeys
  async getAllPidgeysWithFilter() {
    const filter = {
      property: "Pokemon",
      rich_text: {
        equals: "Pidgey",
      },
    };
    return await this.queryDatabaseWithFilter(filter);
  }

  // Ordenação por nível (crescente)
  async getPokemonsSortedByLevel() {
    const sorts = [
      {
        property: "Nível",
        direction: "ascending",
      },
    ];
    return await this.queryDatabaseWithSorts(sorts);
  }

  // Ordenação por nível (decrescente)
  async getPokemonsSortedByLevelDesc() {
    const sorts = [
      {
        property: "Nível",
        direction: "descending",
      },
    ];
    return await this.queryDatabaseWithSorts(sorts);
  }
}
