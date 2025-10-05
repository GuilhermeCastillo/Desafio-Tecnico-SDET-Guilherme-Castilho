import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";
import { CONSTANTS } from "../utils/constants.js";

test.describe("Teste de Remoção de Defense - Festival End", () => {
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

  test("Deve remover buff de Defense quando festival encerra", async () => {
    // Arrange
    const testPokemon = CONSTANTS.TEST_POKEMONS.PIKACHU;
    const createdPokemon = await notionAPI.createPokemon(testPokemon);
    testPokemonId = createdPokemon.id;

    const originalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const originalDefense = originalPokemon.properties.Defesa.number;

    await festivalAPI.startFestival();
    await festivalAPI.endFestival();

    // Assert
    const finalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const finalDefense = finalPokemon.properties.Defesa.number;

    console.log("Defense original:", originalDefense);
    console.log("Defense após end:", finalDefense);

    expect(finalDefense).toBe(originalDefense);
  });
});
