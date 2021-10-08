import json
import requests
import sys
import re
import urllib.parse
from  get_genre import *
# Opening JSON file
f = open('../dat/genrelookup.json')

# returns JSON object as a dictionary
data = json.load(f)


track=urllib.parse.quote(re.sub(r'.* _ (.*)\.mp3',r"\1",sys.argv[1]).strip())
artists=re.sub(r'^(.*) _ .*',r"\1",sys.argv[1])
artist=urllib.parse.quote(re.sub(r'\(.*','',re.sub('\{.*','',re.sub(r',.*',"",artists))).strip())
try:
	if len(data[sys.argv[1]])>0:
		print(data[sys.argv[1]])
	else:
		print(gettag(tracklink(artist,track)))
except:
	print(gettag(tracklink(artist,track)))