for f in *.mp3; do lame -b64 "$f" "$f.min"; done;
d="$(sed -e "s/.*\///" <<< "$PWD")"
for f in *.mp3.min; do
f2=$(sed -E 's/(.*) _ (.*)\.mp3\.min/\2 _ \1.mp3/' <<< "$f");
cp "$f" "../../musicstash/forMP3player/$d/$f2";
mv "$f" "../../musicstash/muse-min/$d/${f%.min}" ;
done;
