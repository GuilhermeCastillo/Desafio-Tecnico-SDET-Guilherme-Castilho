import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";
import { CONSTANTS } from "../utils/constants.js";

test.describe("Teste de Stamina - Festival Start", () => {
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

  test("Deve aplicar +10 em Stamina quando festival inicia", async () => {
    // Arrange - Criar um pokémon
    const testPokemon = CONSTANTS.TEST_POKEMONS.PIKACHU;
    const createdPokemon = await notionAPI.createPokemon(testPokemon);
    testPokemonId = createdPokemon.id;

    // Pegar o pokémon original do banco
    const originalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const originalStamina = originalPokemon.properties.Stamina.number;

    console.log("=== VALORES ORIGINAIS ===");
    console.log("Stamina original:", originalStamina);

    // Act - Iniciar festival
    await festivalAPI.startFestival();

    // Assert - Verificar se Stamina aumentou +10
    const updatedPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const updatedStamina = updatedPokemon.properties.Stamina.number;

    console.log("=== APÓS FESTIVAL START ===");
    console.log("Stamina atual:", updatedStamina);
    console.log("Diferenca:", updatedStamina - originalStamina);

    expect(updatedStamina).toBe(originalStamina + 10);
  });
});
