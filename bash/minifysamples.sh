cd ../dat/samples
rename 's/\.mp3//' *
rename 's/sample_//' *
for f in *.mp3; do lame -b32 "$f" "$f.min";done;
rm *.mp3
rename 's/\.min//' *