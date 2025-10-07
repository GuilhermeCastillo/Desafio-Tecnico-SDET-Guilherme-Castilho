import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";

test.describe("Teste de Defense - Festival Start", () => {
  let notionAPI;
  let festivalAPI;
  let originalState = [];

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test("Deve aplicar +10 em Defense para TODOS os Pokémon quando festival inicia", async () => {
    console.log("=== FASE 1: ESTADO ANTES DO FESTIVAL ===");
    const databaseBefore = await notionAPI.queryDatabase();
    originalState = databaseBefore.results.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.properties.Nome?.title[0]?.text.content,
      originalDefense: pokemon.properties.Defesa?.number,
    }));

    console.log(`Total de Pokémon na base: ${originalState.length}`);
    originalState.forEach((p) => {
      console.log(`   ${p.name}: Defense ${p.originalDefense}`);
    });

    console.log("\n=== FASE 2: INICIANDO FESTIVAL ===");
    const festivalResult = await festivalAPI.startFestival();
    console.log("Resultado do festival:", festivalResult);

    console.log("\n=== FASE 3: VALIDACAO DOS POKEMONS ===");
    const databaseDuring = await notionAPI.queryDatabase();
    const duringState = databaseDuring.results;

    let allTestsPassed = true;

    duringState.forEach((pokemon) => {
      const name = pokemon.properties.Nome?.title[0]?.text.content;
      const currentDefense = pokemon.properties.Defesa?.number;

      const originalPokemon = originalState.find((p) => p.name === name);

      if (originalPokemon) {
        const expectedDefense = originalPokemon.originalDefense + 10;
        const actualDefense = currentDefense;
        const testPassed = actualDefense === expectedDefense;

        if (testPassed) {
          console.log(
            `[PASS] ${name}: ${originalPokemon.originalDefense} -> ${actualDefense} (+10)`
          );
        } else {
          console.log(
            `[FAIL] ${name}: ${originalPokemon.originalDefense} -> ${actualDefense} (expected: ${expectedDefense})`
          );
          allTestsPassed = false;
        }
      }
    });

    console.log("\n=== RESULTADO FINAL ===");
    if (allTestsPassed) {
      console.log(
        "SUCESSO: Todos os pokémons receberam +10 de Defense corretamente"
      );
    } else {
      console.log(
        "FALHA: Um ou mais pokémons não receberam o aumento correto de Defense"
      );
    }

    expect(allTestsPassed).toBe(true);
  });
});
