cd ../dump
for d in $(ls -d */); do
	album="../music/$d"
	if [ ! -d "$album" ]; then
		mkdir -p ../dat/music/$d
		mkdir -p ../music/$d
		mkdir -p ../musicstash/forMP3player/$d
		#ls $d |sort -R |tail -1 |while read f; do
			#echo $f;
			#eyeD3 --write-images=$d "$d$f"  #writes covers from id3 tags
			#ffmpeg -i "$d$f" "$d.jpg"
		python ../python/big.py --limit 1 -o "$d" -s "$d Music ALbum Artist"

		#done;
		  # Control will enter here if $DIRECTORY doesn't exist.
	fi
	cd $d;
	for f in *.mp3; do
		gen=$(python ../../python/dump_genre.py "$f")
		echo  '"'"../music/$d$f"'":' '"'"$gen"'",' >> "../../dat/dumps-genre.json"
		echo  '"'"../music/$d$f"'"%' '"'"$gen"'",' >> "../../dat/dumps-genre.csv"
		cp "$f" "../../dat/music/$d" -f
		lame -b64 "$f" "$f.min" ;
		rename 's/\.min//' * -f;
		cp "$f" ../../music/$d -f
		mv "$f" "../../musicstash/forMP3player/$d$f.min" -f
		cd ../../musicstash/forMP3player/$d
		rename 's/(.*) _ (.*)\.mp3\.min/$2 _ $1.mp3/' * -f
		lame -b32 "$f" "$f.min" ;
		rename 's/\.min//' * -f;
		cd ../../../dump/$d
	done;
	mogrify -thumbnail 500x500! -format webp *.jpg *.bmp *.jpeg *.png
	rm *.jpg *.png *.jpeg
	rename "s|.*\.webp|${d%/}.webp|" *.webp
	mv "${d%/}.webp" ../../covers/albumart
	cd ../
	rm -r "$d"
done;
cd ../bash
bash ./collectionupd.sh