import { FestivalAPI } from "../api/festival-api.js";
import { NotionAPI } from "../api/notion-api.js";

class StartFestivalAndShowTable {
  constructor() {
    this.festivalAPI = new FestivalAPI();
    this.notionAPI = new NotionAPI();
  }

  async startAndShow() {
    try {
      // 1. Iniciar o festival
      console.log(" Iniciando festival...");
      const festivalResult = await this.festivalAPI.startFestival();
      console.log(" Festival iniciado:", festivalResult);

      // 2. Mostrar tabela do estado atual
      console.log("\nTABELA - DURANTE O FESTIVAL\n");
      console.log("=".repeat(100));

      const database = await this.notionAPI.queryDatabase();
      const allPokemons = database.results;

      console.log(
        "Nome".padEnd(15) +
          "Espécie".padEnd(12) +
          "Nível".padEnd(8) +
          "Ataque".padEnd(8) +
          "Defesa".padEnd(8) +
          "Stamina".padEnd(10) +
          "Festival"
      );
      console.log("-".repeat(100));

      allPokemons.forEach((pokemon) => {
        this.printPokemonRow(pokemon);
      });

      const participants = allPokemons.filter(
        (p) => p.properties["Festival Ativo"]?.checkbox
      );
      console.log("\n" + "=".repeat(100));
      console.log(
        `Total: ${allPokemons.length} | No festival: ${participants.length}`
      );
    } catch (error) {
      console.error(" Erro:", error);
    }
  }

  printPokemonRow(pokemon) {
    const name = pokemon.properties.Nome?.title[0]?.text.content || "N/A";
    const species =
      pokemon.properties.Pokemon?.rich_text[0]?.text.content || "N/A";
    const level = pokemon.properties["Nível"]?.number || 0;
    const attack = pokemon.properties.Ataque?.number || 0;
    const defense = pokemon.properties.Defesa?.number || 0;
    const stamina = pokemon.properties.Stamina?.number || 0;
    const festival = pokemon.properties["Festival Ativo"]?.checkbox ? "V" : "F";

    console.log(
      name.padEnd(15) +
        species.padEnd(12) +
        level.toString().padEnd(8) +
        attack.toString().padEnd(8) +
        defense.toString().padEnd(8) +
        stamina.toString().padEnd(10) +
        festival
    );
  }
}

const starter = new StartFestivalAndShowTable();
starter.startAndShow();
