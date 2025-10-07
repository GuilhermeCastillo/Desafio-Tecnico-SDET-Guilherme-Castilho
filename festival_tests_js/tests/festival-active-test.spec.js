import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";

test.describe("Teste de Ativação do Festival", () => {
  let notionAPI;
  let festivalAPI;
  let originalState = [];

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test("Deve ativar o campo Festival Ativo para TODOS os Pokémon quando festival inicia", async () => {
    console.log("=== FASE 1: ESTADO ANTES DO FESTIVAL ===");
    const databaseBefore = await notionAPI.queryDatabase();
    originalState = databaseBefore.results.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.properties.Nome?.title[0]?.text.content,
      originalFestivalActive: pokemon.properties["Festival Ativo"]?.checkbox,
    }));

    console.log(`Total de Pokémon na base: ${originalState.length}`);
    originalState.forEach((p) => {
      console.log(`   ${p.name}: Festival Ativo ${p.originalFestivalActive}`);
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
      const currentFestivalActive =
        pokemon.properties["Festival Ativo"]?.checkbox;

      const originalPokemon = originalState.find((p) => p.name === name);

      if (originalPokemon) {
        const expectedFestivalActive = true;
        const actualFestivalActive = currentFestivalActive;
        const testPassed = actualFestivalActive === expectedFestivalActive;

        if (testPassed) {
          console.log(
            `[PASS] ${name}: Festival Ativo = ${actualFestivalActive}`
          );
        } else {
          console.log(
            `[FAIL] ${name}: Festival Ativo = ${actualFestivalActive} (expected: ${expectedFestivalActive})`
          );
          allTestsPassed = false;
        }
      }
    });

    console.log("\n=== RESULTADO FINAL ===");
    if (allTestsPassed) {
      console.log("SUCESSO: Todos os pokémons estão com Festival Ativo = true");
    } else {
      console.log(
        "FALHA: Um ou mais pokémons não estão com Festival Ativo = true"
      );
    }

    expect(allTestsPassed).toBe(true);
  });
});
