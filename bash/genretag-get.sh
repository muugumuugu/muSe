for f in */*.mp3 ; do echo "$f" >> genres; id3v2 -l "$f" | grep -i "content type" | sed "s/^.*: //" | sed "s/ (.*$//" >>genres ;done;
sed -i -E 's/^(.*mp3)$/\n\1/' genres;
sed  -E -z 's/mp3\n(\w)/mp3 , \1/g' genres >copt
sed -i -E 's/^.*mp3$//' copt;
sed -i  -E -z 's/\n+/\n/g' copt;
rm genres
mv copt genres.csv