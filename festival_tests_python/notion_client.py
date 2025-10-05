import requests
import os

NOTION_KEY = os.getenv("NOTION_KEY")
DATABASE_ID = os.getenv("DATABASE_ID")


HEADERS = {
    "Authorization": f"Bearer {NOTION_KEY}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
}


def list_pokemons():
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    res = requests.post(url, headers=HEADERS)
    res.raise_for_status()
    return res.json()


def create_pokemon(
    nome: str, nivel: int, ataque: int, defesa: int, stamina: int, especie: str
):
    url = "https://api.notion.com/v1/pages"
    data = {
        "parent": {"database_id": DATABASE_ID},
        "properties": {
            "Nome": {"title": [{"text": {"content": nome}}]},
            "Nível": {"number": nivel},
            "Ataque": {"number": ataque},
            "Defesa": {"number": defesa},
            "Stamina": {"number": stamina},
            "Pokemon": {"rich_text": [{"text": {"content": especie}}]},
            "Festival Ativo": {"checkbox": False},
        },
    }
    res = requests.post(url, headers=HEADERS, json=data)
    res.raise_for_status()
    return res.json()
