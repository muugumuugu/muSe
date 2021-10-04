import json
import requests
import sys
import re
from  get_genre import *
import random
# Opening JSON file
f = open('../../python/list-genres.json')

# returns JSON object as a dictionary
data = json.load(f)


track=re.sub(r'.* _ (.*)\.mp3',r"\1",sys.argv[1]).strip().replace(" " ,"%20")
artists=re.sub(r'^(.*) _ .*',r"\1",sys.argv[1])
artist=re.sub(r'\(.*','',re.sub('\{.*','',re.sub(r',.*',"",artists))).strip().replace(" " ,"%20")
try:
	if len(data[sys.argv[1]])>0:
		print(random.choice(data[sys.argv[1]]))
	else:
		print(gettag(tracklink(artist,track)))
except:
	print(gettag(tracklink(artist,track)))