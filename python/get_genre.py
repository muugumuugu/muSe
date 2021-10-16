import requests
import re
import random
import json
def tracklink(artist,track):
	return "http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=b25b959554ed76058ac220b7b2e0a026&format=json&artist=" + artist + "&track" + track

def gettag(link):
	r = requests.get(link)
	dat=r.json()
	try:
		track=dat["track"]
	except:
		track=None
	if track==None:
		return("NO TRACK")
	else:
		tags=track["toptags"]
		try:
			taglist=tags["tag"]
			tagstr=[]
			if len(taglist)>0:
				for tag in taglist:
					tagstr.append(tag["name"])
				return(random.choice(tagstr))
			else:
				try:
					album=re.sub(r"/.*","",track["album"]["title"])
					stripped=re.sub(r'track=.*',"",link)
					alink=stripped+ "album=" + album
					alink=re.sub("track","album",alink)
					rr = requests.get(alink).json()
					return(albumtag(rr))
				except:
					return("NO ALBUM")

		except:
			try:
				album=re.sub(r"/.*","",track["album"]["title"])
				stripped=re.sub(r'track=.*',"",link)
				alink=stripped+ "album=" + album
				rr = requests.get(alink).json()
				return(albumtag(rr))
			except:
				return("NO ALBUM")


def albumtag(dat):
	tagdef="NO ALBUM TAG"
	try:
		return dat["album"]["tags"]["tag"][0]["name"]
	except:
		return tagdef
