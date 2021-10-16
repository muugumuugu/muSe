cd ../music/
rm albums.temp
rm songs.temp
rm artists.temp
#----------------------------------------------------------------------------------
for f in $(ls */ -d) ; do
albumNameTemp=$(sed  -E -e 's/([A-Z])/ \1/g' <<<"$f")
albumName="${albumNameTemp^}"
echo -e "(\n'${f%/}',\n'${albumName%/}','../../covers/albumart/${f%/}.webp'\n)," >>albums.lst ;done
#------------------------------------------------------------------------------------
genres=();
IFS='%';
while  read -r sname genre
do
	genres+=($genre)
done < "../dat/genres.csv"
unset IFS;
#
i=0
for d in $(ls */ -d | sort ) ; do cd "$d" ;
	for f in $(ls *.mp3 | sort) ; do
		#gen=$(id3v2 -l "$f" | grep -i "content type" | sed "s/^.*: //" | sed "s/ (.*$//")
		ff="../music/$d$f"
		gen=${genres[$i]};
		#gen=$(python ../../python/genrelookup.py "$ff")  --->loading json again and again is easting lots of memory an time
		dur=$(mediainfo --Output="General;%Duration%" "$f") ;durn=$(echo $((dur/1000))) ;
		echo -e "(\n"'"'$d$f'"'",\n"'"'${d%/}'"'",\n"'"'${f%.mp3}'"'",\n"'"'${f%.mp3}'"'",\n"'"'$durn'"'",\n"'"'$d$f'"'"," '"'$gen'"' ")," "\n" >> ../songs.lst ;
		let i++
	done;
cd ..; done;
#
sed  -i -E -e '4~8 s/(.*) _ .*/\1",/' songs.lst
sed  -i -E -e '5~8 s/.* _ (.*)/"\1/' songs.lst
sed  -i -E -e "7~8 s/,$//" songs.lst
#------------------------------------------------------------------------------
echo "delete from albums;INSERT into albums (id,title,artworkPath) VALUES" >albums.temp
cat albums.lst>>albums.temp;
echo ";" >> albums.temp;
#--------------------------
echo "delete from songs; INSERT into songs(id,album,artist,title,duration,path,genre) VALUES" >songs.temp
cat songs.lst>>songs.temp;
echo ";" >> songs.temp;
#---------------------------
sed -n 4~8p songs.lst  >artists.lst
awk '!a[$0]++' artists.lst > artists.lstfilter
echo "delete from artists;INSERT into artists (id,name) VALUES" >artists.temp
sed -i -E -e 's/(.*),$/(\1,\1),/' artists.lstfilter
cat artists.lstfilter>>artists.temp;
#_--------------------------
rm albums.lst
rm songs.lst
rm artists.lst
rm artists.lstfilter
cd ../
echo $SECONDS