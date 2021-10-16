import requests

for i in range(82):
	response = requests.get("https://random-words-api.vercel.app/word")
	print(response.json()[0]["word"])