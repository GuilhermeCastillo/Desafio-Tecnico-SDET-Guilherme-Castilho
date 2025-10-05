import { NotionAPI } from "../api/notion-api.js";
import { FestivalAPI } from "../api/festival-api.js";
import { CONSTANTS } from "../utils/constants.js";

async function debugTest() {
  const notionAPI = new NotionAPI();
  const festivalAPI = new FestivalAPI();

  console.log("=== TESTE DE DIAGNÓSTICO ===\n");

  try {
    console.log("1. Obtendo schema do banco...");
    const schema = await notionAPI.getDatabaseSchema();
    console.log("✅ Schema obtido com sucesso");
    console.log("Propriedades:", Object.keys(schema.properties));
  } catch (error) {
    console.log("❌ Erro ao obter schema:", error.message);
    return;
  }

  try {
    console.log("\n2. Criando pokémon de teste...");
    const testPokemon = CONSTANTS.TEST_POKEMONS.PIKACHU;
    const created = await notionAPI.createPokemon(testPokemon);
    console.log("Pokémon criado:", created.id);

    console.log("\n3. Verificando pokémon criado...");
    const pokemon = await notionAPI.getPokemonByName(testPokemon.name);
    console.log("Nome:", pokemon.properties.Nome?.title[0]?.text.content);
    console.log("Nível:", pokemon.properties.Nível?.number);
    console.log("Ataque:", pokemon.properties.Ataque?.number);
    console.log("Defesa:", pokemon.properties.Defesa?.number);
    console.log("Stamina:", pokemon.properties.Stamina?.number);
    console.log(
      "Pokemon:",
      pokemon.properties.Pokemon?.rich_text[0]?.text.content
    );
    console.log(
      "Festival Ativo:",
      pokemon.properties["Festival Ativo"]?.checkbox
    );

    console.log("\n4. Iniciando festival...");
    const startResult = await festivalAPI.startFestival();
    console.log("Resposta do festival start:", startResult);

    console.log("\n5. Verificando após festival start...");
    const afterStart = await notionAPI.getPokemonByName(testPokemon.name);
    console.log("Nível após start:", afterStart.properties.Nível?.number);
    console.log("Ataque após start:", afterStart.properties.Ataque?.number);
    console.log("Defesa após start:", afterStart.properties.Defesa?.number);
    console.log("Stamina após start:", afterStart.properties.Stamina?.number);
    console.log(
      "Festival Ativo após start:",
      afterStart.properties["Festival Ativo"]?.checkbox
    );

    console.log("\n6. Encerrando festival...");
    const endResult = await festivalAPI.endFestival();
    console.log("Resposta do festival end:", endResult);

    console.log("\n7. Verificando após festival end...");
    const afterEnd = await notionAPI.getPokemonByName(testPokemon.name);
    console.log("Nível após end:", afterEnd.properties.Nível?.number);
    console.log("Ataque após end:", afterEnd.properties.Ataque?.number);
    console.log("Defesa após end:", afterEnd.properties.Defesa?.number);
    console.log("Stamina após end:", afterEnd.properties.Stamina?.number);
    console.log(
      "Festival Ativo após end:",
      afterEnd.properties["Festival Ativo"]?.checkbox
    );

    console.log("\n8. Limpando pokémon de teste...");
    await notionAPI.deletePokemon(created.id);
    console.log("Pokémon removido");
  } catch (error) {
    console.log("Erro durante o teste:", error.message);
  }
}

debugTest();
