import spotipy
import random
import time
from spotipy.oauth2 import SpotifyClientCredentials #To access authorised Spotify data4
import pandas as pd

client_id = 'e562158bbbae46c8a88fe3aed2725952'
client_secret = '1c1e62b9cd8a462e822e647e4e5dbe31'
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
sp.trace=False

f1=open('uri2')
s_list=[]
for line in f1.readlines():
	s_list.append(line.strip())
print(s_list)

#put uri to dataframe
df = pd.DataFrame(s_list)
df.columns = ['URI']

for i in range(0,df.shape[0]):
	time.sleep(random.uniform(1, 2))
	URI = df.URI[i]
	print(URI)
	features = sp.audio_features([URI])
	print(features)
	df.loc[i,'acousticness'] = features[0]['mode']
	df.loc[i,'danceability'] = features[0]['danceability']
	df.loc[i,'energy'] = features[0]['energy']
	df.loc[i,'key'] = features[0]['key']
	df.loc[i,'liveness'] = features[0]['liveness']
	df.loc[i,'loudness'] = features[0]['loudness']
	df.loc[i,'mode'] = features[0]['mode']
	df.loc[i,'speechiness'] = features[0]['speechiness']
	df.loc[i,'tempo'] = features[0]['tempo']
	df.loc[i,'valence'] = features[0]['valence']
	df.loc[i,'instrumentalness']=features[0]['instrumentalness']

df.to_csv('example.tsv', sep="\t")