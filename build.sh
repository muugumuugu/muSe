cd ../;
mkdir -p covers;
mkdir -p css;
mkdir -p html;
mkdir -p js;mkdir -p js/vizualizer/vizualizations ;
mkdir -p lyrics;
mkdir -p music ;
mkdir -p playlists;
mkdir -p php;
mkdir -p bash/;
#------------------------------------
cd builds/bash;
for f in *.sh; do cp "$f" "../../bash/$f";done;
#------------------------------------
bash ./vizualizations.sh;
cd ../js/vizualizer/vizualizations;
cp -r  sketchtemplate ../../../../js/vizualizer/vizualizations/sketchtemplate;
cd ../;
cp -r assets ../../../js/vizualizer/assets;
cd ../;
#......
for f in *.js; do uglifyjs "$f" -c -m -o "../../js/$f"; done;
for d in $(ls */ -d); do
	mkdir -p "../../js/$d";
	cd "$d" ; for f in *.js;
	do uglifyjs "$f" -c -m -o "../../../js/$d$f"; done; cd ../;
done;
#_---------------------------------
cd ../css;
for f in *.css; do uglifycss "$f" --output "$f.min"; done;
for f in *.css.min; do mv $f ../../css/${f%.css.min}.css; done;
#---------------------------------
cd ../html;
for f in $(ls  -I index.html); do minify "$f"  > "$f.min"; done;
for f in *.html.min; do mv $f ../../html/${f%.html.min}.html; done;
#------------------------------
cd ../covers/;
for d in */; do
	mkdir -p ../../covers/$d
	cd $d;
	for f in $(ls *.png *.jpg *.jpeg *.bmp) ;do mogrify -format webp "$f" ;done;
	for f in *.webp; do cp "$f" ../../../covers/$d; done;
	cd ../
done;
#---------------------------
cd ../;
cp -r -f ./php ../;
cp -r -f ./ejs ../;
cp -r -f ./go ../;
cp -r -f ./python ../;
#--------------------------------
cp -r -p ./music ../
cp -r -p ./lyrics ../
cp -r -p ./playlists ../
cp -r -p ./musicstash ../
#----------------------------
minify muSeHome.html > ../index.html;
cp muse.png ../;
cp electron-app.js ../;
for f in *.json; do cp "$f" ../;done;
cd ../;
#------------------------
cd bash/;
bash ./collectionupd.sh;
#bash ./updlyrics;
#----------------------------

#You Can Delete Build now;
