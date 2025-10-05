import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";
import { CONSTANTS } from "../utils/constants.js";

test.describe("Teste de Attack - Festival Start", () => {
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

  test("Deve aplicar +10 em Attack quando festival inicia", async () => {
    // Arrange - Criar um pokémon
    const testPokemon = CONSTANTS.TEST_POKEMONS.PIKACHU;
    const createdPokemon = await notionAPI.createPokemon(testPokemon);
    testPokemonId = createdPokemon.id;

    // Pegar o pokémon original do banco
    const originalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const originalAttack = originalPokemon.properties.Ataque.number;

    console.log("=== VALORES ORIGINAIS ===");
    console.log("Attack original:", originalAttack);

    // Act - Iniciar festival
    await festivalAPI.startFestival();

    // Assert - Verificar se Attack aumentou +10
    const updatedPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const updatedAttack = updatedPokemon.properties.Ataque.number;

    console.log("=== APÓS FESTIVAL START ===");
    console.log("Attack atual:", updatedAttack);
    console.log("Diferenca:", updatedAttack - originalAttack);

    expect(updatedAttack).toBe(originalAttack + 10);
  });
});
