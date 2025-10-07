import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";
import { CONSTANTS } from "../utils/constants.js";

test.describe("Evolução do Pidgey - Regras Oficiais", () => {
  let notionAPI;
  let festivalAPI;
  let testPokemons = [];

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test.afterEach(async () => {
    // Cleanup - remove todos os pokémons de teste
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

  // Teste 1 CORRIGIDO: Pidgey level 15 -> DEVE evoluir para Pidgeotto
  test("Pidgey level 15 deve evoluir para Pidgeotto", async () => {
    test.setTimeout(60000);

    const pidgeyData = {
      ...CONSTANTS.TEST_POKEMONS.PIDGEY_MID,
      level: 15,
    };

    console.log("Criando Pidgey nivel 15...");
    const createdPokemon = await notionAPI.createPokemon(pidgeyData);
    testPokemons.push({ pageId: createdPokemon.id, name: pidgeyData.name });

    const originalPokemon = await notionAPI.getPokemonByName(pidgeyData.name);
    const originalSpecies =
      originalPokemon.properties.Pokemon.rich_text[0].text.content;
    const originalLevel = originalPokemon.properties.Nível.number;

    console.log("Iniciando festival...");
    await festivalAPI.startFestival();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const evolvedPokemon = await notionAPI.getPokemonByName(pidgeyData.name);
    const evolvedSpecies =
      evolvedPokemon.properties.Pokemon.rich_text[0].text.content;
    const evolvedLevel = evolvedPokemon.properties.Nível.number;

    // CORREÇÃO: Level 15 + 1 = 16 -> ATINGE nivel para Pidgeotto
    expect(evolvedSpecies).toBe("Pidgeotto");
    expect(evolvedLevel).toBe(16);
  });

  // Teste 2: Pidgey level 16 -> evolui para Pidgeotto
  test("Pidgey level 16 deve evoluir para Pidgeotto", async () => {
    test.setTimeout(60000);

    const pidgeyData = {
      ...CONSTANTS.TEST_POKEMONS.PIDGEY_MID,
      level: 16,
    };

    console.log("Criando Pidgey nivel 16...");
    const createdPokemon = await notionAPI.createPokemon(pidgeyData);
    testPokemons.push({ pageId: createdPokemon.id, name: pidgeyData.name });

    const originalPokemon = await notionAPI.getPokemonByName(pidgeyData.name);
    const originalSpecies =
      originalPokemon.properties.Pokemon.rich_text[0].text.content;
    const originalLevel = originalPokemon.properties.Nível.number;

    console.log("Iniciando festival...");
    await festivalAPI.startFestival();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const evolvedPokemon = await notionAPI.getPokemonByName(pidgeyData.name);
    const evolvedSpecies =
      evolvedPokemon.properties.Pokemon.rich_text[0].text.content;
    const evolvedLevel = evolvedPokemon.properties.Nível.number;

    // Level 16 + 1 = 17 -> ATINGE nivel para Pidgeotto
    expect(evolvedSpecies).toBe("Pidgeotto");
    expect(evolvedLevel).toBe(17);
  });

  // Teste 3 CORRIGIDO: Pidgey level 35 -> DEVE evoluir para Pidgeot
  test("Pidgey level 35 deve evoluir para Pidgeot", async () => {
    test.setTimeout(60000);

    const pidgeyData = {
      ...CONSTANTS.TEST_POKEMONS.PIDGEY_HIGH,
      level: 35,
    };

    console.log("Criando Pidgey nivel 35...");
    const createdPokemon = await notionAPI.createPokemon(pidgeyData);
    testPokemons.push({ pageId: createdPokemon.id, name: pidgeyData.name });

    console.log("Iniciando festival...");
    await festivalAPI.startFestival();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const evolvedPokemon = await notionAPI.getPokemonByName(pidgeyData.name);
    const evolvedSpecies =
      evolvedPokemon.properties.Pokemon.rich_text[0].text.content;
    const evolvedLevel = evolvedPokemon.properties.Nível.number;

    // CORREÇÃO: Level 35 + 1 = 36 -> ATINGE nivel para Pidgeot
    expect(evolvedSpecies).toBe("Pidgeot");
    expect(evolvedLevel).toBe(36);
  });

  // Teste 4: Pidgey level 36 -> evolui para Pidgeot
  test("Pidgey level 36 deve evoluir para Pidgeot", async () => {
    test.setTimeout(60000);

    const pidgeyData = {
      ...CONSTANTS.TEST_POKEMONS.PIDGEY_HIGH,
      level: 36,
    };

    console.log("Criando Pidgey nivel 36...");
    const createdPokemon = await notionAPI.createPokemon(pidgeyData);
    testPokemons.push({ pageId: createdPokemon.id, name: pidgeyData.name });

    console.log("Iniciando festival...");
    await festivalAPI.startFestival();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const evolvedPokemon = await notionAPI.getPokemonByName(pidgeyData.name);
    const evolvedSpecies =
      evolvedPokemon.properties.Pokemon.rich_text[0].text.content;
    const evolvedLevel = evolvedPokemon.properties.Nível.number;

    // Level 36 + 1 = 37 -> ATINGE nivel para Pidgeot
    expect(evolvedSpecies).toBe("Pidgeot");
    expect(evolvedLevel).toBe(37);
  });

  // Teste 5: Pidgey level 14 -> nao evolui
  test("Pidgey level 14 nao deve evoluir", async () => {
    test.setTimeout(60000);

    const pidgeyData = {
      ...CONSTANTS.TEST_POKEMONS.PIDGEY_LOW,
      level: 14,
    };

    console.log("Criando Pidgey nivel 14...");
    const createdPokemon = await notionAPI.createPokemon(pidgeyData);
    testPokemons.push({ pageId: createdPokemon.id, name: pidgeyData.name });

    console.log("Iniciando festival...");
    await festivalAPI.startFestival();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const afterFestivalPokemon = await notionAPI.getPokemonByName(
      pidgeyData.name
    );
    const currentSpecies =
      afterFestivalPokemon.properties.Pokemon.rich_text[0].text.content;
    const currentLevel = afterFestivalPokemon.properties.Nível.number;

    // Level 14 + 1 = 15 -> NAO atinge nivel minimo
    expect(currentSpecies).toBe("Pidgey");
    expect(currentLevel).toBe(15);
  });

  // Teste 6: Pidgey level 34 -> evolui para Pidgeotto
  test("Pidgey level 34 deve evoluir para Pidgeotto", async () => {
    test.setTimeout(60000);

    const pidgeyData = {
      ...CONSTANTS.TEST_POKEMONS.PIDGEY_MID,
      level: 34,
    };

    console.log("Criando Pidgey nivel 34...");
    const createdPokemon = await notionAPI.createPokemon(pidgeyData);
    testPokemons.push({ pageId: createdPokemon.id, name: pidgeyData.name });

    console.log("Iniciando festival...");
    await festivalAPI.startFestival();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const evolvedPokemon = await notionAPI.getPokemonByName(pidgeyData.name);
    const evolvedSpecies =
      evolvedPokemon.properties.Pokemon.rich_text[0].text.content;
    const evolvedLevel = evolvedPokemon.properties.Nível.number;

    // Level 34 + 1 = 35 -> ATINGE nivel para Pidgeotto
    expect(evolvedSpecies).toBe("Pidgeotto");
    expect(evolvedLevel).toBe(35);
  });

  // Teste 7: Pidgeotto nao evolui para Pidgeot
  test("Pidgeotto nao deve evoluir para Pidgeot", async () => {
    test.setTimeout(60000);

    const pidgeottoData = {
      name: "Pidgeotto Test",
      species: "Pidgeotto",
      level: 35,
      attack: 60,
      defense: 55,
      stamina: 50,
    };

    console.log("Criando Pidgeotto nivel 35...");
    const createdPokemon = await notionAPI.createPokemon(pidgeottoData);
    testPokemons.push({ pageId: createdPokemon.id, name: pidgeottoData.name });

    console.log("Iniciando festival...");
    await festivalAPI.startFestival();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const afterFestivalPokemon = await notionAPI.getPokemonByName(
      pidgeottoData.name
    );
    const currentSpecies =
      afterFestivalPokemon.properties.Pokemon.rich_text[0].text.content;
    const currentLevel = afterFestivalPokemon.properties.Nível.number;

    // Pidgeotto NAO evolue - so Pidgey tem evolucao
    expect(currentSpecies).toBe("Pidgeotto");
    expect(currentLevel).toBe(36);
  });

  // Teste 8: Pidgeot mantem evolucao
  test("Pidgeot deve manter evolucao", async () => {
    test.setTimeout(60000);

    const pidgeotData = {
      name: "Pidgeot Test",
      species: "Pidgeot",
      level: 40,
      attack: 80,
      defense: 75,
      stamina: 70,
    };

    console.log("Criando Pidgeot nivel 40...");
    const createdPokemon = await notionAPI.createPokemon(pidgeotData);
    testPokemons.push({ pageId: createdPokemon.id, name: pidgeotData.name });

    console.log("Iniciando festival...");
    await festivalAPI.startFestival();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const afterFestivalPokemon = await notionAPI.getPokemonByName(
      pidgeotData.name
    );
    const currentSpecies =
      afterFestivalPokemon.properties.Pokemon.rich_text[0].text.content;
    const currentLevel = afterFestivalPokemon.properties.Nível.number;

    // Pidgeot mantem a evolucao, so ganha nivel
    expect(currentSpecies).toBe("Pidgeot");
    expect(currentLevel).toBe(41);
  });
});
