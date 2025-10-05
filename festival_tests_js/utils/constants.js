import dotenv from "dotenv";
dotenv.config();

export const CONSTANTS = {
  NOTION_KEY: process.env.NOTION_KEY,
  DATABASE_ID: process.env.DATABASE_ID,
  FESTIVAL_URL: process.env.FESTIVAL_URL,
  FESTIVAL_TOKEN: process.env.FESTIVAL_TOKEN,

  NOTION_HEADERS: {
    Authorization: `Bearer ${process.env.NOTION_KEY}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  },

  FESTIVAL_HEADERS: {
    api_token: process.env.FESTIVAL_TOKEN,
    api_key: process.env.DATABASE_ID,
    "Content-Type": "application/json",
  },

  TEST_POKEMONS: {
    PIDGEY_LOW: {
      name: "Pidgey-Low",
      level: 10,
      attack: 30,
      defense: 30,
      stamina: 30,
      species: "Pidgey",
    },
    PIDGEY_MID: {
      name: "Pidgey-Mid",
      level: 15,
      attack: 35,
      defense: 35,
      stamina: 35,
      species: "Pidgey",
    },
    PIDGEY_HIGH: {
      name: "Pidgey-High",
      level: 35,
      attack: 45,
      defense: 45,
      stamina: 45,
      species: "Pidgey",
    },
    PIKACHU: {
      name: "Pikachu-Test",
      level: 5,
      attack: 40,
      defense: 30,
      stamina: 35,
      species: "Pikachu",
    },
    BULBASAUR: {
      name: "Bulbasaur-Test",
      level: 8,
      attack: 35,
      defense: 40,
      stamina: 45,
      species: "Bulbasaur",
    },
    CHARMANDER: {
      name: "Charmander-Test",
      level: 12,
      attack: 45,
      defense: 32,
      stamina: 39,
      species: "Charmander",
    },
    SQUIRTLE: {
      name: "Squirtle-Test",
      level: 7,
      attack: 33,
      defense: 42,
      stamina: 44,
      species: "Squirtle",
    },
  },

  POKEMONS_TO_CREATE: [],
};
