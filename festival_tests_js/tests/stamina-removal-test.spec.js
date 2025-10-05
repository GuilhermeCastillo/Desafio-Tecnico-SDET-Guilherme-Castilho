import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";
import { CONSTANTS } from "../utils/constants.js";

test.describe("Teste de Remoção de Stamina - Festival End", () => {
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

  test("Deve remover buff de Stamina quando festival encerra", async () => {
    const testPokemon = CONSTANTS.TEST_POKEMONS.PIKACHU;
    const createdPokemon = await notionAPI.createPokemon(testPokemon);
    testPokemonId = createdPokemon.id;

    const originalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const originalStamina = originalPokemon.properties.Stamina.number;

    await festivalAPI.startFestival();
    await festivalAPI.endFestival();

    const finalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const finalStamina = finalPokemon.properties.Stamina.number;

    console.log("Stamina original:", originalStamina);
    console.log("Stamina após end:", finalStamina);

    expect(finalStamina).toBe(originalStamina);
  });
});
