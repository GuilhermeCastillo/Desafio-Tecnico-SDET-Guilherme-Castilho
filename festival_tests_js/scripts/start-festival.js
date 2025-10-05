import { FestivalAPI } from "../api/festival-api.js";

async function startFestival() {
  console.log("INICIANDO FESTIVAL DOS PÁSSAROS...\n");

  const festivalAPI = new FestivalAPI();

  console.log("INICIANDO FESTIVAL...");
  const festivalResult = await festivalAPI.startFestival();
  console.log("Festival iniciado com sucesso!");
  console.log("Resposta:", festivalResult);
}

startFestival();
