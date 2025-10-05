export class TestHelpers {
  static validateBuffIncrease(originalPokemon, currentPokemon) {
    return {
      attackIncreased:
        currentPokemon.properties.Ataque.number ===
        originalPokemon.properties.Ataque.number + 10,
      defenseIncreased:
        currentPokemon.properties.Defesa.number ===
        originalPokemon.properties.Defesa.number + 10,
      staminaIncreased:
        currentPokemon.properties.Stamina.number ===
        originalPokemon.properties.Stamina.number + 10,
      levelIncreased:
        currentPokemon.properties.Nível.number ===
        originalPokemon.properties.Nível.number + 1,
      festivalActive: currentPokemon.properties["Festival Ativo"].checkbox,
    };
  }

  static validateBuffRemoval(originalPokemon, afterEndPokemon) {
    const originalAttack = originalPokemon.properties.Ataque.number;
    const originalDefense = originalPokemon.properties.Defesa.number;
    const originalStamina = originalPokemon.properties.Stamina.number;
    const originalLevel = originalPokemon.properties.Nível.number;

    const finalAttack = afterEndPokemon.properties.Ataque.number;
    const finalDefense = afterEndPokemon.properties.Defesa.number;
    const finalStamina = afterEndPokemon.properties.Stamina.number;
    const finalLevel = afterEndPokemon.properties.Nível.number;

    return {
      attackRestored: finalAttack === originalAttack,
      defenseRestored: finalDefense === originalDefense,
      staminaRestored: finalStamina === originalStamina,
      levelMaintained: finalLevel === originalLevel + 1,
      festivalInactive: !afterEndPokemon.properties["Festival Ativo"].checkbox,

      details: {
        original: {
          attack: originalAttack,
          defense: originalDefense,
          stamina: originalStamina,
          level: originalLevel,
        },
        final: {
          attack: finalAttack,
          defense: finalDefense,
          stamina: finalStamina,
          level: finalLevel,
        },
        attackDifference: finalAttack - originalAttack,
        defenseDifference: finalDefense - originalDefense,
        staminaDifference: finalStamina - originalStamina,
      },
    };
  }
}
