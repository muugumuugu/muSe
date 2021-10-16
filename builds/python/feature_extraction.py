import os
import numpy as np
import scipy
import librosa


sample_DIR = '../dat/samples/'
sample_files = os.listdir(sample_DIR)

col_names =['file_name', 'signal_mean', 'signal_std', 'signal_skew', 'signal_kurtosis', 'tempo',
             'spectral_centroid_mean', 'spectral_centroid_std',
             'spectral_bandwidth_2_mean', 'spectral_bandwidth_2_std',
             'spectral_bandwidth_3_mean', 'spectral_bandwidth_3_std',
             'spectral_bandwidth_4_mean', 'spectral_bandwidth_4_std',
             'spectral_contrast_mean', 'spectral_contrast_std',
             'spectral_rolloff_mean', 'spectral_rolloff_std',
             'mfccs_mean','mfccs_std',
             'chroma_stft_mean','chroma_stft_std']

basic=[]
for f in sample_files:

	try:

        # Read sample-file
		y, sr = librosa.load(sample_DIR+f,sr=22050)
		feature_list = [f]
		feature_list.append(np.mean(abs(y)))
		feature_list.append(np.std(y))
		feature_list.append(scipy.stats.skew(abs(y)))
		feature_list.append(scipy.stats.kurtosis(y))
		tempo = librosa.beat.tempo(y, sr=sr)
		feature_list.append(np.mean(tempo))

		spectral_centroids = librosa.feature.spectral_centroid(y+0.01, sr=sr)[0]
		feature_list.append(np.mean(spectral_centroids))
		feature_list.append(np.std(spectral_centroids))
		spectral_bandwidth_2 = librosa.feature.spectral_bandwidth(y+0.01, sr=sr, p=2)[0]
		spectral_bandwidth_3 = librosa.feature.spectral_bandwidth(y+0.01, sr=sr, p=3)[0]
		spectral_bandwidth_4 = librosa.feature.spectral_bandwidth(y+0.01, sr=sr, p=4)[0]
		feature_list.append(np.mean(spectral_bandwidth_2))
		feature_list.append(np.std(spectral_bandwidth_2))
		feature_list.append(np.mean(spectral_bandwidth_3))
		feature_list.append(np.std(spectral_bandwidth_3))
		feature_list.append(np.mean(spectral_bandwidth_3))
		feature_list.append(np.std(spectral_bandwidth_3))

		spectral_contrast = librosa.feature.spectral_contrast(y, sr=sr, n_bands = 1, fmin = 200.0)
		feature_list.append(np.mean(spectral_contrast))
		feature_list.append(np.std(spectral_contrast))

		spectral_rolloff = librosa.feature.spectral_rolloff(y+0.01, sr=sr, roll_percent = 0.85)[0]
		feature_list.append(np.mean(spectral_rolloff))
		feature_list.append(np.std(spectral_rolloff))

		mfccs = librosa.feature.mfcc(y, sr=sr, n_mfcc=1)[0]
		feature_list.append(np.mean(mfccs))
		feature_list.append(np.std(mfccs))

		chroma_stft = librosa.feature.chroma_stft(y, sr=sr, n_chroma=1)[0]
		feature_list.append(np.mean(chroma_stft))
		feature_list.append(np.std(chroma_stft))
		feature_list[1:] = np.round(feature_list[1:], decimals=3)
	except:
		pass
	basic.append(feature_list)
arr2D=np.array(basic)
np.savetxt('features.csv', arr2D, delimiter=',', fmt='%s', header=','.join(map(str,col_names)))
