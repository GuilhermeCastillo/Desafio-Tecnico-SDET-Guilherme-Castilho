import { NotionAPI } from "../api/notion-api.js";
import { CONSTANTS } from "../utils/constants.js";

async function setupTestPokemons() {
  const notionAPI = new NotionAPI();

  console.log("Criando pokemons de teste...");

  for (const pokemon of Object.values(CONSTANTS.TEST_POKEMONS)) {
    try {
      console.log(`Criando ${pokemon.name}...`);
      await notionAPI.createPokemon(pokemon);
      console.log(`${pokemon.name} criado`);

      // Aguarda 0.5 segundo entre cada criacao
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.log(`Erro ao criar ${pokemon.name}: ${error.message}`);
    }
  }

  console.log("Finalizado!");
}

setupTestPokemons();
