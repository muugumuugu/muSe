cd js/vizualizations
bash ./build.sh
cd ../
for f in *.js; do uglifyjs "$f" -c -m -o "$f.min"; done
for f in *.js.min; do mv $f ../../js/${f%.js.min}.js; done
cd ../
cd css
for f in *.css; do uglifycss "$f" --output "$f.min"; done
for f in *.css.min; do mv $f ../../css/${f%.css.min}.css; done
cd ../
cd php
for f in *.php; do cp $f ../../php/; done
cd getid3;
for f in *.php; do cp $f ../../../php/getid3/; done
cd ../../
cd html
for f in *.html; do minify "$f"  > "$f.min"; done
for f in *.html.min; do mv $f ../../html/${f%.html.min}.html; done
cd ../