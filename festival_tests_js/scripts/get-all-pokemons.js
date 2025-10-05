import { NotionAPI } from "../api/notion-api.js";

async function testQuery() {
  const notionAPI = new NotionAPI();
  const result = await notionAPI.queryDatabase();
  console.log("Resultado:", result);
  console.log(`Total de pokémons: ${result.results?.length || 0}`);
}

testQuery();
