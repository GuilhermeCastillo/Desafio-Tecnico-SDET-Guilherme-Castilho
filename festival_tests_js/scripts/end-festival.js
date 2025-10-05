import { FestivalAPI } from "../api/festival-api.js";

async function endFestival() {
  console.log("FECHANDO FESTIVAL DOS PÁSSAROS...\n");

  const festivalAPI = new FestivalAPI();

  console.log("FECHANDO FESTIVAL...");
  const festivalResult = await festivalAPI.endFestival();
  console.log("Festival fechado com sucesso!");
  console.log("Resposta:", festivalResult);
}

endFestival();
