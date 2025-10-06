test.describe("Teste de Desativação do Festival - Festival End", () => {
  let notionAPI;
  let festivalAPI;
  let testPokemonId;

  test.beforeAll(async () => {
    notionAPI = new NotionAPI();
    festivalAPI = new FestivalAPI();
  });

  test.afterEach(async () => {
    if (testPokemonId) {
      await notionAPI.deletePokemon(testPokemonId);
    }
  });

  test("Deve desativar Festival Ativo quando festival encerra", async () => {
    const testPokemon = CONSTANTS.TEST_POKEMONS.PIKACHU;
    const createdPokemon = await notionAPI.createPokemon(testPokemon);
    testPokemonId = createdPokemon.id;

    await festivalAPI.startFestival();
    await festivalAPI.endFestival();

    const finalPokemon = await notionAPI.getPokemonByName(testPokemon.name);
    const festivalActive = finalPokemon.properties["Festival Ativo"].checkbox;

    console.log("Festival Ativo após end:", festivalActive);

    expect(festivalActive).toBe(false);
  });
});
