cd ../playlists/;
touch cat.txt;
for f in *.m3u; do touch "../covers/playlisticons/${f%.m3u}.webp"; read -r line < $f; echo -E "$f~$line">>cat.txt  ;done;
sed -i -E  's/(.*)\.m3u~#EXTM3U : (.*)/playlistinfos["\1"]="\2";/' cat.txt;
mv -f cat.txt ../js/playlists.js;
cd ../;
