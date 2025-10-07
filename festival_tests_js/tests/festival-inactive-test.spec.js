import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";

test.describe("Teste de Desativação do Festival - Festival End", () => {
  let notionAPI;
  let festivalAPI;
  let originalState = [];

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test("Deve desativar Festival Ativo para TODOS os Pokémon quando festival encerra", async () => {
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
      const finalFestivalActive =
        pokemon.properties["Festival Ativo"]?.checkbox;

      const originalPokemon = originalState.find((p) => p.name === name);

      if (originalPokemon) {
        const expectedFestivalActive = false;
        const actualFestivalActive = finalFestivalActive;
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
      console.log(
        "SUCESSO: Todos os pokémons estão com Festival Ativo = false"
      );
    } else {
      console.log(
        "FALHA: Um ou mais pokémons não estão com Festival Ativo = false"
      );
    }

    expect(allTestsPassed).toBe(true);
  });
});
