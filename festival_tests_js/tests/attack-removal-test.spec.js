import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";
import { CONSTANTS } from "../utils/constants.js";

test.describe("Teste de Remoção de Attack - Festival End", () => {
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

  test("Deve remover buff de Attack quando festival encerra", async () => {
    const testPokemon = CONSTANTS.TEST_POKEMONS.PIKACHU;
    const createdPokemon = await notionAPI.createPokemon(testPokemon);
    testPokemonId = createdPokemon.id;

    const originalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const originalAttack = originalPokemon.properties.Ataque.number;

    await festivalAPI.startFestival();
    const afterStartPokemon = await notionAPI.getPokemonByName(
      testPokemon.name
    );
    const attackAfterStart = afterStartPokemon.properties.Ataque.number;

    console.log("=== VALORES ===");
    console.log("Attack original:", originalAttack);
    console.log("Attack após start:", attackAfterStart);

    await festivalAPI.endFestival();

    // Assert - Verificar se Attack voltou ao original
    const finalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const finalAttack = finalPokemon.properties.Ataque.number;

    console.log("Attack após end:", finalAttack);
    console.log("Diferenca do original:", finalAttack - originalAttack);

    expect(finalAttack).toBe(originalAttack);
  });
});
