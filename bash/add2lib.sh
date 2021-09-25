for f in *.mp3; do lame -b64 "$f" "$f.min";done;
d=$(sed -e "s/.*\///" <<< "$PWD")
for f in *.mp3.min; do mv "$f" "../../musicstash/muse-min/$d/${f%.min}" ;done;
