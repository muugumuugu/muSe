import requests
import json
import re
import sys
import urllib.parse
import pandas
import csv


def jprint(obj):
	# create a formatted string of the Python JSON object
	text = json.dumps(obj, sort_keys=True, indent=4)
	print(text)

# http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=b25b959554ed76058ac220b7b2e0a026&format=json&artist=Adnan%20Sami&track=Lift%20Kara%20De
headers = {
    'user-agent': "MUKU"
}

payload = {
    'api_key': "ed54ccf7b2a3087685cb9eaa2017612c",
    'method': 'track.getinfo',
    'format': 'json',
}

def genre(artist,title):
	payload['artist']=urllib.parse.quote(artist)
	payload['track']=urllib.parse.quote(title)
	r = requests.get('https://ws.audioscrobbler.com/2.0/', headers=headers, params=payload)
	try:
		tagarr=r.json()["track"]
		try:
			return(tagarr["toptags"]["tag"][0]["name"])
		except:
			try:
				album=re.sub(r'(.*?)/',"\1",tagarr["album"]["title"]).strip()
				return genreAL(album,artist)
			except:
				return 'noalbumdata'
	except:
		return "unknown"

def genreAL(album,artist):
	payload["method"]="album.getinfo"
	payload['artist']=urllib.parse.quote(artist)
	payload['album']=urllib.parse.quote(album)
	r = requests.get('https://ws.audioscrobbler.com/2.0/', headers=headers, params=payload)
	try:
		return r.json()["album"]["tags"]["tag"][0]["name"]
	except:
		return "unknown-album"

# reading the CSV file
#with open('songs.tsv', mode ='r') as f:
	# reading the CSV file
#	tsv = csv.DictReader(f, delimiter="\t")
#	for line in tsv:
#		artist=re.sub(r'(.*?),.*',r'\1',line["artist"])
#		artist=re.sub(r'(.*?)\(.*',r'\1',artist)
#		artist=re.sub(r'(.*?)\{.*',r'\1',artist)
#		artist=re.sub(r'(.*?)&.*',r'\1',artist)
#		artist=artist.strip()
#		title=line["title"].strip()
		#line["genre"]=genre(artist,title)
#		print(artist + "\t" + title)


#with open('artist-title' , mode ='r') as f:
#	tsv = f.readlines()
#	for line in tsv:
#		dat=line.split("\t")
#		artist=dat[0].strip()
#		track=dat[1].strip()
#		print(genre(artist,track))



with open('test') as f:
	links= f.readlines()
	for link in links:
		link=link.strip()
		r = requests.get(link)
		dat=r.json()
		try:
			track=dat["track"]
		except:
			track=None
		if track==None:
			print("NO TRACK")
		else:
			tags=track["toptags"]
			try:
				taglist=tags["tag"]
				tagstr=""
				if len(taglist)>0:
					for tag in taglist:
						tagstr+=tag["name"]+","
					print(tagstr)
				else:
					try:
						album=re.sub(r"/.*","",track["album"]["title"])
						stripped=re.sub(r'track=.*',"",link)
						alink=stripped+ "album=" + album
						rr = requests.get(alink).json()
						print(albumtag(rr))
					except:
						print("NO ALBUM")

			except:
				try:
					album=re.sub(r"/.*","",track["album"]["title"])
					stripped=re.sub(r'track=.*',"",link)
					alink=stripped+ "album=" + album
					rr = requests.get(alink).json()
					print(albumtag(rr))
				except:
					print("NO ALBUM")


def albumtag(dat):
	tagdef="NO ALBUM TAG"
	try:
		tag=dat["album"]["tags"]["tag"][0]["name"]
		return tag
	except:
		return tagdef
















#EOF
