cd ../dat/
rm "clusters.json"
cd waveforms/
for d in $(ls -d */ | sort); do
	echo '"'"$d"'"'":[" >> ../clusters.json
	cd $d;
	pl=();
	for f in *.png;do
		pl+=('"'"${f%.png}"'"')
		mv "$f" "../"
	done;
	IFS=","
	echo "${pl[*]}" >> ../../clusters.json
	echo "]," >> ../../clusters.json
	unset IFS;
	cd ../
	rm "$d" -r
done;