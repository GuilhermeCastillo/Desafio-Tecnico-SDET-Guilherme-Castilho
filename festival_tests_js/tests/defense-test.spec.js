import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";
import { CONSTANTS } from "../utils/constants.js";

test.describe("Teste de Defense - Festival Start", () => {
  let notionAPI;
  let festivalAPI;
  let testPokemonId;

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test.afterEach(async () => {
    // Limpeza
    if (testPokemonId) {
      await notionAPI.deletePokemon(testPokemonId);
    }
  });

  test("Deve aplicar +10 em Defense quando festival inicia", async () => {
    // Arrange - Criar um pokémon
    const testPokemon = CONSTANTS.TEST_POKEMONS.PIKACHU;
    const createdPokemon = await notionAPI.createPokemon(testPokemon);
    testPokemonId = createdPokemon.id;

    // Pegar o pokémon original do banco
    const originalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const originalDefense = originalPokemon.properties.Defesa.number;

    console.log("=== VALORES ORIGINAIS ===");
    console.log("Defense original:", originalDefense);

    // Act - Iniciar festival
    await festivalAPI.startFestival();

    // Assert - Verificar se Defense aumentou +10
    const updatedPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const updatedDefense = updatedPokemon.properties.Defesa.number;

    console.log("=== APÓS FESTIVAL START ===");
    console.log("Defense atual:", updatedDefense);
    console.log("Diferenca:", updatedDefense - originalDefense);

    expect(updatedDefense).toBe(originalDefense + 10);
  });
});
