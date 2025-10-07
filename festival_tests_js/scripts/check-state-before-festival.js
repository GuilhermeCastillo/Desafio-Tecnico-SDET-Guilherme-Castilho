import { NotionAPI } from "../api/notion-api.js";

class TableStateBefore {
  constructor() {
    this.notion = new NotionAPI();
  }

  async showTable() {
    console.log("TABELA DA BASE - ANTES DO FESTIVAL\n");
    console.log("=".repeat(120));

    try {
      const database = await this.notion.queryDatabase();
      const allPokemons = database.results;

      console.log(
        "Nome".padEnd(15) +
          "Espécie".padEnd(12) +
          "Nível".padEnd(8) +
          "Ataque".padEnd(8) +
          "Defesa".padEnd(8) +
          "Stamina".padEnd(10) +
          "Festival".padEnd(10) +
          "ID".padEnd(10)
      );
      console.log("-".repeat(120));

      // Dados dos Pokémon
      allPokemons.forEach((pokemon) => {
        const name = pokemon.properties.Nome?.title[0]?.text.content || "N/A";
        const species =
          pokemon.properties.Pokemon?.rich_text[0]?.text.content || "N/A";
        const level = pokemon.properties["Nível"]?.number || 0;
        const attack = pokemon.properties.Ataque?.number || 0;
        const defense = pokemon.properties.Defesa?.number || 0;
        const stamina = pokemon.properties.Stamina?.number || 0;
        const festival = pokemon.properties["Festival Ativo"]?.checkbox
          ? "V"
          : "F";
        const id = pokemon.id.substring(0, 8);

        console.log(
          name.padEnd(15) +
            species.padEnd(12) +
            level.toString().padEnd(8) +
            attack.toString().padEnd(8) +
            defense.toString().padEnd(8) +
            stamina.toString().padEnd(10) +
            festival.padEnd(10) +
            id.padEnd(10)
        );
      });
    } catch (error) {
      console.error("Erro ao gerar tabela:", error);
    }
  }
}

const table = new TableStateBefore();
table.showTable();
