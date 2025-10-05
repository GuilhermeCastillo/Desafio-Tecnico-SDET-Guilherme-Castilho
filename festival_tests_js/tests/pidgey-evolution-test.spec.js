import { test, expect } from "@playwright/test";
import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";
import { CONSTANTS } from "../utils/constants.js";

test.describe("Testes de Evolução do Pidgey", () => {
  let notionAPI;
  let festivalAPI;
  let testPokemons = [];

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test.afterEach(async () => {
    for (const pokemon of testPokemons) {
      if (pokemon.pageId) {
        await notionAPI.deletePokemon(pokemon.pageId);
      }
    }
    testPokemons = [];
  });

  test("Pidgey nível 15 deve evoluir para Pidgeotto quando festival inicia", async () => {
    test.setTimeout(60000);

    const pidgeyMid = CONSTANTS.TEST_POKEMONS.PIDGEY_MID;
    console.log("Criando Pidgey nível 15...");
    const createdPokemon = await notionAPI.createPokemon(pidgeyMid);
    testPokemons.push({ pageId: createdPokemon.id, name: pidgeyMid.name });

    const originalPokemon = await notionAPI.getPokemonByName(pidgeyMid.name);
    const originalSpecies =
      originalPokemon.properties.Pokemon.rich_text[0].text.content;
    const originalLevel = originalPokemon.properties.Nível.number;

    console.log("Espécie original:", originalSpecies);
    console.log("Nível original:", originalLevel);

    console.log("Iniciando festival...");
    await festivalAPI.startFestival();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const evolvedPokemon = await notionAPI.getPokemonByName(pidgeyMid.name);
    const evolvedSpecies =
      evolvedPokemon.properties.Pokemon.rich_text[0].text.content;
    const evolvedLevel = evolvedPokemon.properties.Nível.number;

    console.log("Espécie após evolução:", evolvedSpecies);
    console.log("Nível após evolução:", evolvedLevel);

    expect(evolvedSpecies).toBe("Pidgeotto");
    expect(evolvedLevel).toBe(originalLevel + 1);
  });

  test("Pidgey nível 35 deve evoluir para Pidgeot quando festival inicia", async () => {
    test.setTimeout(60000);

    const pidgeyHigh = CONSTANTS.TEST_POKEMONS.PIDGEY_HIGH;
    console.log("Criando Pidgey nível 35...");
    const createdPokemon = await notionAPI.createPokemon(pidgeyHigh);
    testPokemons.push({ pageId: createdPokemon.id, name: pidgeyHigh.name });

    const originalPokemon = await notionAPI.getPokemonByName(pidgeyHigh.name);
    const originalSpecies =
      originalPokemon.properties.Pokemon.rich_text[0].text.content;
    const originalLevel = originalPokemon.properties.Nível.number;

    console.log("Espécie original:", originalSpecies);
    console.log("Nível original:", originalLevel);

    console.log("Iniciando festival...");
    await festivalAPI.startFestival();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const evolvedPokemon = await notionAPI.getPokemonByName(pidgeyHigh.name);
    const evolvedSpecies =
      evolvedPokemon.properties.Pokemon.rich_text[0].text.content;
    const evolvedLevel = evolvedPokemon.properties.Nível.number;

    console.log("Espécie após evolução:", evolvedSpecies);
    console.log("Nível após evolução:", evolvedLevel);

    expect(evolvedSpecies).toBe("Pidgeot");
    expect(evolvedLevel).toBe(originalLevel + 1);
  });

  test("Pidgey nível 10 NÃO deve evoluir quando festival inicia", async () => {
    test.setTimeout(60000);

    const pidgeyLow = CONSTANTS.TEST_POKEMONS.PIDGEY_LOW;
    console.log("Criando Pidgey nível 10...");
    const createdPokemon = await notionAPI.createPokemon(pidgeyLow);
    testPokemons.push({ pageId: createdPokemon.id, name: pidgeyLow.name });

    const originalPokemon = await notionAPI.getPokemonByName(pidgeyLow.name);
    const originalSpecies =
      originalPokemon.properties.Pokemon.rich_text[0].text.content;
    const originalLevel = originalPokemon.properties.Nível.number;

    console.log("Espécie original:", originalSpecies);
    console.log("Nível original:", originalLevel);

    console.log("Iniciando festival...");
    await festivalAPI.startFestival();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const afterFestivalPokemon = await notionAPI.getPokemonByName(
      pidgeyLow.name
    );
    const currentSpecies =
      afterFestivalPokemon.properties.Pokemon.rich_text[0].text.content;
    const currentLevel = afterFestivalPokemon.properties.Nível.number;

    console.log("Espécie após festival:", currentSpecies);
    console.log("Nível após festival:", currentLevel);

    expect(currentSpecies).toBe("Pidgey");
    expect(currentLevel).toBe(originalLevel + 1);
  });
});
