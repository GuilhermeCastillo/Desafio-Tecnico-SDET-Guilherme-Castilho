import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";

test.describe("Evolução do Pidgey - Teste Completo", () => {
  let notionAPI;
  let festivalAPI;
  let testPokemons = [];

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test.afterEach(async () => {
    // Cleanup
    for (const pokemon of testPokemons) {
      if (pokemon.pageId) {
        try {
          await notionAPI.deletePokemon(pokemon.pageId);
        } catch (error) {
          console.log(`Erro ao deletar ${pokemon.name}:`, error.message);
        }
      }
    }
    testPokemons = [];
  });

  test("Teste de evolução para TODOS os Pidgeys da base", async () => {
    test.setTimeout(60000);

    // FASE 1: Capturar estado ANTES do festival
    console.log("=== FASE 1: ESTADO ANTES DO FESTIVAL ===");
    const databaseBefore = await notionAPI.queryDatabase();
    const allPidgeys = databaseBefore.results.filter((pokemon) =>
      pokemon.properties.Pokemon?.rich_text[0]?.text.content.includes("Pidge")
    );

    const originalState = allPidgeys.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.properties.Nome?.title[0]?.text.content,
      originalSpecies: pokemon.properties.Pokemon?.rich_text[0]?.text.content,
      originalLevel: pokemon.properties["Nível"]?.number,
    }));

    console.log(`Total de Pidgeys na base: ${originalState.length}`);
    originalState.forEach((p) => {
      console.log(
        `   ${p.name}: ${p.originalSpecies} Nível ${p.originalLevel}`
      );
    });

    // FASE 2: Iniciar festival
    console.log("\n=== FASE 2: INICIANDO FESTIVAL ===");
    const festivalResult = await festivalAPI.startFestival();
    console.log("Resultado do festival:", festivalResult);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // FASE 3: Verificar evoluções APÓS o festival
    console.log("\n=== FASE 3: VALIDACAO DAS EVOLUCOES ===");
    const databaseAfter = await notionAPI.queryDatabase();
    const afterState = databaseAfter.results.filter((pokemon) =>
      pokemon.properties.Pokemon?.rich_text[0]?.text.content.includes("Pidge")
    );

    let allTestsPassed = true;

    afterState.forEach((pokemon) => {
      const name = pokemon.properties.Nome?.title[0]?.text.content;
      const currentSpecies =
        pokemon.properties.Pokemon?.rich_text[0]?.text.content;
      const currentLevel = pokemon.properties["Nível"]?.number;

      const originalPokemon = originalState.find((p) => p.name === name);

      if (originalPokemon) {
        const newLevel = originalPokemon.originalLevel + 1;
        let expectedSpecies = originalPokemon.originalSpecies;

        if (originalPokemon.originalSpecies === "Pidgey") {
          if (newLevel >= 36) {
            expectedSpecies = "Pidgeot";
          } else if (newLevel >= 16) {
            expectedSpecies = "Pidgeotto";
          }
          // Se newLevel < 16, mantém Pidgey
        }
        // Pidgeotto e Pidgeot não evoluem mais

        const speciesTestPassed = currentSpecies === expectedSpecies;
        const levelTestPassed = currentLevel === newLevel;
        const testPassed = speciesTestPassed && levelTestPassed;

        if (testPassed) {
          console.log(
            `[PASS] ${name}: ${originalPokemon.originalSpecies} N${originalPokemon.originalLevel} -> ${currentSpecies} N${currentLevel}`
          );
        } else {
          console.log(
            `[FAIL] ${name}: ${originalPokemon.originalSpecies} N${originalPokemon.originalLevel} -> ${currentSpecies} N${currentLevel}`
          );
          console.log(`       Esperado: ${expectedSpecies} N${newLevel}`);
          allTestsPassed = false;
        }
      }
    });

    console.log("\n=== RESULTADO FINAL ===");
    if (allTestsPassed) {
      console.log(
        "SUCESSO: Todas as evoluções de Pidgey ocorreram corretamente"
      );
    } else {
      console.log(
        "FALHA: Uma ou mais evoluções de Pidgey não ocorreram corretamente"
      );
    }

    expect(allTestsPassed).toBe(true);
  });
});
