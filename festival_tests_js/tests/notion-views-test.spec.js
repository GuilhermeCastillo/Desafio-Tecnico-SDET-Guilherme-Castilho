import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";
import { CONSTANTS } from "../utils/constants.js";

test.describe("Testes de Views e Filtros do Notion", () => {
  let notionAPI;
  let festivalAPI;
  let testPokemons = [];

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test.beforeEach(async () => {
    const testPokemonsList = [
      CONSTANTS.TEST_POKEMONS.PIDGEY_LOW,
      CONSTANTS.TEST_POKEMONS.PIDGEY_MID,
      CONSTANTS.TEST_POKEMONS.PIKACHU,
      CONSTANTS.TEST_POKEMONS.BULBASAUR,
    ];

    for (const pokemon of testPokemonsList) {
      const created = await notionAPI.createPokemon(pokemon);
      testPokemons.push({ pageId: created.id, name: pokemon.name });
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  });

  test.afterEach(async () => {
    for (const pokemon of testPokemons) {
      if (pokemon.pageId) {
        await notionAPI.deletePokemon(pokemon.pageId);
      }
    }
    testPokemons = [];
  });

  test("Deve filtrar apenas Pidgeys usando filtro de espécie", async () => {
    test.setTimeout(60000);

    console.log("=== TESTE: FILTRO POR ESPÉCIE PIDGEY ===");

    const pidgeysResult = await notionAPI.getAllPidgeysWithFilter();

    console.log(
      `Total de pokémons no banco: ${
        pidgeysResult.results.length + testPokemons.length
      }`
    );
    console.log(
      `Pidgeys encontrados no filtro: ${pidgeysResult.results.length}`
    );

    for (const pokemon of pidgeysResult.results) {
      const species = pokemon.properties.Pokemon.rich_text[0].text.content;
      console.log(
        `Pokémon no filtro: ${pokemon.properties.Nome.title[0].text.content} - ${species}`
      );
      expect(species).toBe("Pidgey");
    }

    expect(pidgeysResult.results.length).toBeGreaterThanOrEqual(2);
  });

  test("Deve ordenar pokémons por nível de forma crescente", async () => {
    test.setTimeout(60000);

    console.log("=== TESTE: ORDENAÇÃO POR NÍVEL CRESCENTE ===");

    const sortedResult = await notionAPI.getPokemonsSortedByLevel();

    console.log("Pokémons ordenados por nível (crescente):");
    let previousLevel = -1;

    for (const pokemon of sortedResult.results) {
      const name = pokemon.properties.Nome.title[0].text.content;
      const level = pokemon.properties.Nível.number;
      const species = pokemon.properties.Pokemon.rich_text[0].text.content;

      console.log(`- ${name} (${species}) - Nível ${level}`);

      if (previousLevel !== -1) {
        expect(level).toBeGreaterThanOrEqual(previousLevel);
      }
      previousLevel = level;
    }
  });

  test("Deve ordenar pokémons por nível de forma decrescente", async () => {
    test.setTimeout(60000);

    console.log("=== TESTE: ORDENAÇÃO POR NÍVEL DECRESCENTE ===");

    const sortedResult = await notionAPI.getPokemonsSortedByLevelDesc();

    console.log("Pokémons ordenados por nível (decrescente):");
    let previousLevel = 1000;

    for (const pokemon of sortedResult.results) {
      const name = pokemon.properties.Nome.title[0].text.content;
      const level = pokemon.properties.Nível.number;
      const species = pokemon.properties.Pokemon.rich_text[0].text.content;

      console.log(`- ${name} (${species}) - Nível ${level}`);

      if (previousLevel !== 1000) {
        expect(level).toBeLessThanOrEqual(previousLevel);
      }
      previousLevel = level;
    }
  });
});
