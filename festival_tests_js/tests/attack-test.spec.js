import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";

test.describe("Teste de Attack - Festival Completo", () => {
  let notionAPI;
  let festivalAPI;
  let originalState = [];

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test("Deve aplicar +10 em Attack para TODOS os Pokémon quando festival inicia", async () => {
    // FASE 1: Capturar estado ANTES do festival
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

    // FASE 2: Iniciar festival
    console.log("\n=== FASE 2: INICIANDO FESTIVAL ===");
    const festivalResult = await festivalAPI.startFestival();
    console.log("Resultado do festival:", festivalResult);

    // FASE 3: Verificar estado DURANTE o festival
    console.log("\n=== FASE 3: VALIDACAO DOS POKEMONS ===");
    const databaseDuring = await notionAPI.queryDatabase();
    const duringState = databaseDuring.results;

    let allTestsPassed = true;

    duringState.forEach((pokemon) => {
      const name = pokemon.properties.Nome?.title[0]?.text.content;
      const currentAttack = pokemon.properties.Ataque?.number;

      const originalPokemon = originalState.find((p) => p.name === name);

      if (originalPokemon) {
        const expectedAttack = originalPokemon.originalAttack + 10;
        const actualAttack = currentAttack;
        const testPassed = actualAttack === expectedAttack;

        if (testPassed) {
          console.log(
            `[PASS] ${name}: ${originalPokemon.originalAttack} -> ${actualAttack} (+10)`
          );
        } else {
          console.log(
            `[FAIL] ${name}: ${originalPokemon.originalAttack} -> ${actualAttack} (expected: ${expectedAttack})`
          );
          allTestsPassed = false;
        }
      }
    });

    // Assert final
    console.log("\n=== RESULTADO FINAL ===");
    if (allTestsPassed) {
      console.log(
        "SUCESSO: Todos os pokémons receberam +10 de Attack corretamente"
      );
    } else {
      console.log(
        "FALHA: Um ou mais pokémons não receberam o aumento correto de Attack"
      );
    }

    expect(allTestsPassed).toBe(true);
  });
});
