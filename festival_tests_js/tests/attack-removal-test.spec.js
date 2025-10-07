import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";

test.describe("Teste de Remoção de Attack - Festival End", () => {
  let notionAPI;
  let festivalAPI;
  let originalState = [];

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test("Deve remover buff de Attack quando festival encerra", async () => {
    console.log("=== FASE 1: ESTADO ANTES DO FESTIVAL ===");
    const databaseBefore = await notionAPI.queryDatabase();
    originalState = databaseBefore.results.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.properties.Nome?.title[0]?.text.content,
      originalAttack: pokemon.properties.Ataque?.number,
    }));

    console.log(`Total de Pokémon na base: ${originalState.length}`);
    originalState.forEach((p) => {
      console.log(`   ${p.name}: Attack ${p.originalAttack}`);
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
      const finalAttack = pokemon.properties.Ataque?.number;

      const originalPokemon = originalState.find((p) => p.name === name);

      if (originalPokemon) {
        const expectedAttack = originalPokemon.originalAttack;
        const actualAttack = finalAttack;
        const testPassed = actualAttack === expectedAttack;

        if (testPassed) {
          console.log(
            `[PASS] ${name}: ${actualAttack} (manteve o valor original)`
          );
        } else {
          console.log(
            `[FAIL] ${name}: ${originalPokemon.originalAttack} -> ${actualAttack} (expected: ${expectedAttack})`
          );
          allTestsPassed = false;
        }
      }
    });

    console.log("\n=== RESULTADO FINAL ===");
    if (allTestsPassed) {
      console.log(
        "SUCESSO: Todos os pokémons mantiveram o Attack original após o festival"
      );
    } else {
      console.log(
        "FALHA: Um ou mais pokémons não mantiveram o Attack original após o festival"
      );
    }

    expect(allTestsPassed).toBe(true);
  });
});
