import pandas as pd
import numpy as np

dff=pd.read_csv("../dat/tags.tsv",sep="\t")
df=pd.DataFrame(columns=["fname","genre"])
df["fname"]=dff["folder"]+dff["file"]
df["genre"]=dff["genre"]
df.to_csv('genres.csv',sep='\t',index=False,header=False)