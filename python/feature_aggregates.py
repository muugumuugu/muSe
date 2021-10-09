import numpy as np
import pandas as pd
#----------------
df= pd.read_csv("../dat/mp3-features.csv")
df.set_index('file_name',inplace=True)
weighted1= (df["signal_mean"]+0.5*df["signal_std"] + df["signal_skew"] + df["signal_kurtosis"] +df["tempo"]) * (df["mfccs_mean"]+0.5*df["mfccs_std"]) * (df["chroma_stft_mean"]+0.5*df["chroma_stft_std"])*(10**-4)

weighted2=(df["spectral_centroid_mean"]+0.5*df["spectral_centroid_std"]) * (df["spectral_bandwidth_2_mean"]+0.5*df["spectral_bandwidth_2_std"] +  df["spectral_bandwidth_3_mean"]+0.5*df["spectral_bandwidth_3_std"] +  df["spectral_bandwidth_4_mean"]+0.5*df["spectral_bandwidth_4_std"]) * (df["spectral_contrast_mean"]+0.5*df["spectral_contrast_std"]) * (df["spectral_rolloff_mean"]+0.5*df["spectral_rolloff_std"])*(10**-12)

dff=pd.DataFrame(index=df.index)
dff['spectral']=weighted1
dff['signal']=weighted2

dff=(dff-dff.min())/(dff.max()-dff.min())
print(dff)
dff.to_csv('../dat/agg-features-norm.csv')