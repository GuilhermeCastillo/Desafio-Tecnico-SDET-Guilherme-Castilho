import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";
import { CONSTANTS } from "../utils/constants.js";

test.describe("Teste de Ativação do Festival", () => {
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

  test("Deve ativar o campo Festival Ativo quando festival inicia", async () => {
    // Arrange - Criar um pokémon
    const testPokemon = CONSTANTS.TEST_POKEMONS.PIKACHU;
    const createdPokemon = await notionAPI.createPokemon(testPokemon);
    testPokemonId = createdPokemon.id;

    // Pegar o pokémon original do banco
    const originalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const originalFestivalActive =
      originalPokemon.properties["Festival Ativo"].checkbox;

    console.log("=== VALORES ORIGINAIS ===");
    console.log("Festival Ativo original:", originalFestivalActive);

    // Act - Iniciar festival
    await festivalAPI.startFestival();

    // Assert - Verificar se Festival Ativo foi ativado
    const updatedPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const updatedFestivalActive =
      updatedPokemon.properties["Festival Ativo"].checkbox;

    console.log("=== APÓS FESTIVAL START ===");
    console.log("Festival Ativo atual:", updatedFestivalActive);

    expect(updatedFestivalActive).toBe(true);
  });
});
