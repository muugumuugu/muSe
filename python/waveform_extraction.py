#!/usr/bin/env python
# coding: utf-8



import os
from scipy.io.wavfile import read #import the required function from the module
from matplotlib import pyplot as plt
import numpy as np


sample_DIR = '../dat/waves/'
sample_files = os.listdir(sample_DIR)
for f in sample_files:
	try:
		samplerate, data = read(sample_DIR+ f)
		times = np.arange(len(data))/float(samplerate)
		plt.figure(figsize=(40, 4))
		plt.fill_between(times, data[:,0], data[:,1], color='k')
		plt.xlim(times[0], times[-1])
		plt.xlabel('time (s)')
		plt.ylabel('amplitude')
		plt.savefig(f+'.png', dpi=100)
		plt.close()
	except:
		try:
			samplerate, data = read(sample_DIR+ f)
			times = np.arange(len(data))/float(samplerate)
			plt.figure(figsize=(40, 4))
			plt.fill_between(times, data[0:], data[0:], color='k')
			plt.xlim(times[0], times[-1])
			plt.xlabel('time (s)')
			plt.ylabel('amplitude')
			plt.savefig(f+'.png', dpi=100)
			plt.close()
		except:
			print(sample_DIR+f)