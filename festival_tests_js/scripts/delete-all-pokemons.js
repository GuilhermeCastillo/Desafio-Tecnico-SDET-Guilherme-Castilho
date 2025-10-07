import { NotionAPI } from "../api/notion-api.js";

async function deleteAllPokemons() {
  console.log("Iniciando limpeza de TODOS os pokémons...\n");

  const notionAPI = new NotionAPI();
  let deletedCount = 0;
  let errorCount = 0;

  try {
    console.log("Buscando todos os pokémons...");
    const database = await notionAPI.queryDatabase();
    const allPokemons = database.results;

    console.log(`Total de pokémons encontrados: ${allPokemons.length}`);

    if (allPokemons.length === 0) {
      console.log("Nenhum pokémon para deletar.");
      return;
    }

    console.log("Iniciando deleção...");

    for (const pokemon of allPokemons) {
      try {
        const pokemonName =
          pokemon.properties.Nome?.title[0]?.text.content || "Sem nome";
        const pokemonId = pokemon.id;

        console.log(`Deletando: ${pokemonName} (${pokemonId})`);

        const result = await notionAPI.deletePokemon(pokemonId);

        if (result.archived) {
          console.log(`Deletado: ${pokemonName}`);
          deletedCount++;
        } else {
          console.log(`Não foi possível arquivar: ${pokemonName}`);
          errorCount++;
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Erro ao deletar ${pokemonName}:`, error.message);
        errorCount++;
      }
    }

    console.log("RELATÓRIO FINAL:");
    console.log(`Deletados com sucesso: ${deletedCount}`);
    console.log(`Erros: ${errorCount}`);
    console.log(`Total processado: ${allPokemons.length}`);
  } catch (error) {
    console.error("Erro geral:", error);
  }
}

deleteAllPokemons();
