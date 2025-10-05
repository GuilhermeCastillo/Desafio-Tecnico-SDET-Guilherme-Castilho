import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";
import { CONSTANTS } from "../utils/constants.js";

test.describe("Teste de Manutenção do Nível - Festival End", () => {
  let notionAPI;
  let festivalAPI;
  let testPokemonId;

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test.afterEach(async () => {
    if (testPokemonId) {
      await notionAPI.deletePokemon(testPokemonId);
    }
  });

  test("Deve manter nível aumentado quando festival encerra", async () => {
    const testPokemon = CONSTANTS.TEST_POKEMONS.PIKACHU;
    const createdPokemon = await notionAPI.createPokemon(testPokemon);
    testPokemonId = createdPokemon.id;

    const originalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const originalLevel = originalPokemon.properties.Nível.number;

    await festivalAPI.startFestival();
    await festivalAPI.endFestival();

    const finalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const finalLevel = finalPokemon.properties.Nível.number;

    console.log("Nível original:", originalLevel);
    console.log("Nível após end:", finalLevel);

    expect(finalLevel).toBe(originalLevel + 1);
  });
});
