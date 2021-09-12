cd ../music/
rm albums.temp
rm songs.temp
rm artists.temp

for f in $(ls */ -d) ; do echo -e "(\n'${f%/}',\n'${f%/}','covers/albumart/${f%}.webp'\n)," >>albums.lst ;done
sed  -i -E -e 's/([A-Z])/ \1/g' albums.lst
sed -i  "s/^'\(.\)/'\U\1/" albums.lst
for d in $(ls */ -d) ; do cd "$d" ; for f in *.mp3; do
 dur=$(mediainfo --Output="General;%Duration%" "$f") ;durn=$(echo $((dur/1000))) ;echo -e "(\n"'"'$d$f'"'",\n"'"'${d%/}'"'",\n"'"'${f%.mp3}'"'",\n"'"'${f%.mp3}'"'",\n"'"'$durn'"'",\n"'"'$d$f'"'"," '"' "misc" '"' ")," "\n" >> ../songs.lst ;done;cd ..; done;
sed  -i -E -e '3~8 s/([A-Z])/ \1/g' songs.lst
sed -i  '3~8 s/^\(.\)/\U\1/' songs.lst
sed  -i -E -e '4~8 s/(.*) _ .*/\1",/' songs.lst
sed  -i -E -e '5~8 s/.* _ (.*)/"\1/' songs.lst
sed  -i -E -e "7~8 s/,$//" songs.lst
echo "delete from albums;INSERT into albums (id,title,artworkPath) VALUES" >albums.temp
cat albums.lst>>albums.temp;
echo ";" >> albums.temp;
echo "delete from songs; INSERT into songs(id,album,artist,title,duration,path,genre) VALUES" >songs.temp
cat songs.lst>>songs.temp;
echo ";" >> songs.temp;
sed -n 4~8p songs.lst  >artists.lst
awk '!a[$0]++' artists.lst > artists.lstfilter
echo "delete from artists;INSERT into artists (id,name) VALUES" >artists.temp
sed -i -E -e 's/(.*),$/(\1,\1),/' artists.lstfilter
cat artists.lstfilter>>artists.temp;
rm albums.lst
rm songs.lst
rm artists.lst
rm artists.lstfilter
cd ../