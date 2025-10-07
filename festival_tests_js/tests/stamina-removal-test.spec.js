import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";

test.describe("Teste de Remoção de Stamina - Festival End", () => {
  let notionAPI;
  let festivalAPI;
  let originalState = [];

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test("Deve remover buff de Stamina quando festival encerra", async () => {
    // FASE 1: Capturar estado ANTES do festival
    console.log("=== FASE 1: ESTADO ANTES DO FESTIVAL ===");
    const databaseBefore = await notionAPI.queryDatabase();
    originalState = databaseBefore.results.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.properties.Nome?.title[0]?.text.content,
      originalStamina: pokemon.properties.Stamina?.number,
    }));

    console.log(`Total de Pokémon na base: ${originalState.length}`);
    originalState.forEach((p) => {
      console.log(`   ${p.name}: Stamina ${p.originalStamina}`);
    });

    // FASE 2: Iniciar festival
    console.log("\n=== FASE 2: INICIANDO FESTIVAL ===");
    const startResult = await festivalAPI.startFestival();
    console.log("Resultado do festival start:", startResult);

    // FASE 3: Encerrar festival
    console.log("\n=== FASE 3: ENCERRANDO FESTIVAL ===");
    const endResult = await festivalAPI.endFestival();
    console.log("Resultado do festival end:", endResult);

    // FASE 4: Verificar estado APÓS o festival
    console.log("\n=== FASE 4: VALIDACAO DOS POKEMONS ===");
    const databaseAfter = await notionAPI.queryDatabase();
    const afterState = databaseAfter.results;

    let allTestsPassed = true;

    afterState.forEach((pokemon) => {
      const name = pokemon.properties.Nome?.title[0]?.text.content;
      const finalStamina = pokemon.properties.Stamina?.number;

      const originalPokemon = originalState.find((p) => p.name === name);

      if (originalPokemon) {
        const expectedStamina = originalPokemon.originalStamina; // Stamina deve voltar ao original
        const actualStamina = finalStamina;
        const testPassed = actualStamina === expectedStamina;

        if (testPassed) {
          console.log(
            `[PASS] ${name}: ${actualStamina} (voltou ao valor original)`
          );
        } else {
          console.log(
            `[FAIL] ${name}: ${originalPokemon.originalStamina} -> ${actualStamina} (expected: ${expectedStamina})`
          );
          allTestsPassed = false;
        }
      }
    });

    console.log("\n=== RESULTADO FINAL ===");
    if (allTestsPassed) {
      console.log(
        "SUCESSO: Todos os pokémons voltaram ao Stamina original após o festival"
      );
    } else {
      console.log(
        "FALHA: Um ou mais pokémons não voltaram ao Stamina original após o festival"
      );
    }

    expect(allTestsPassed).toBe(true);
  });
});
