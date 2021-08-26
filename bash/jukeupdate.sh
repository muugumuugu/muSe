cd ../music;
ls -R  */*.mp3 >pl.temp;
sed -E 's|(.*)/(.*) _ (.*)\.mp3|#EXTINF: \3 #spacer /home/muku/Desktop/muSe/music/\1/\2 _ \3.mp3|' -i pl.temp;
sort pl.temp > jukebox.m3u;
rm pl.temp;
sed -E 's| #spacer |\n|' -i jukebox.m3u;
sed  '1i\#EXTM3U : JukeBox\' -i jukebox.m3u;
mv jukebox.m3u ../playlists;
cd ../;