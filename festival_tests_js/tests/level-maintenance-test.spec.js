import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";

test.describe("Teste de Manutenção do Nível - Festival End", () => {
  let notionAPI;
  let festivalAPI;
  let originalState = [];

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test("Deve manter nível aumentado para TODOS os Pokémon quando festival encerra", async () => {
    console.log("=== FASE 1: ESTADO ANTES DO FESTIVAL ===");
    const databaseBefore = await notionAPI.queryDatabase();
    originalState = databaseBefore.results.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.properties.Nome?.title[0]?.text.content,
      originalLevel: pokemon.properties["Nível"]?.number,
    }));

    console.log(`Total de Pokémon na base: ${originalState.length}`);
    originalState.forEach((p) => {
      console.log(`   ${p.name}: Nível ${p.originalLevel}`);
    });

    console.log("\n=== FASE 2: INICIANDO FESTIVAL ===");
    const startResult = await festivalAPI.startFestival();
    console.log("Resultado do festival start:", startResult);

    console.log("\n=== FASE 3: ENCERRANDO FESTIVAL ===");
    const endResult = await festivalAPI.endFestival();
    console.log("Resultado do festival end:", endResult);

    console.log("\n=== FASE 4: VALIDACAO DOS POKEMONS ===");
    const databaseAfter = await notionAPI.queryDatabase();
    const afterState = databaseAfter.results;

    let allTestsPassed = true;

    afterState.forEach((pokemon) => {
      const name = pokemon.properties.Nome?.title[0]?.text.content;
      const finalLevel = pokemon.properties["Nível"]?.number;

      const originalPokemon = originalState.find((p) => p.name === name);

      if (originalPokemon) {
        const expectedLevel = originalPokemon.originalLevel + 1;
        const actualLevel = finalLevel;
        const testPassed = actualLevel === expectedLevel;

        if (testPassed) {
          console.log(
            `[PASS] ${name}: ${originalPokemon.originalLevel} -> ${actualLevel} (+1 mantido)`
          );
        } else {
          console.log(
            `[FAIL] ${name}: ${originalPokemon.originalLevel} -> ${actualLevel} (expected: ${expectedLevel})`
          );
          allTestsPassed = false;
        }
      }
    });

    console.log("\n=== RESULTADO FINAL ===");
    if (allTestsPassed) {
      console.log(
        "SUCESSO: Todos os pokémons mantiveram o aumento de nível após o festival"
      );
    } else {
      console.log(
        "FALHA: Um ou mais pokémons não mantiveram o aumento de nível após o festival"
      );
    }

    expect(allTestsPassed).toBe(true);
  });
});
