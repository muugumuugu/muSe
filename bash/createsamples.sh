cd ../dat
find ./music -name "*.mp3" >lst
while read line; do
subs1=$(sed -e 's|/|_|g' <<<"$line");
subs2=$(sed -e 's|^.*music_||' <<<"$subs1");
f="data/sample_$subs2";
mp3splt "$line" 00.00.40 00.10.00 -o "$f";
done < lst
# move all sample_* files into dat/sample folder