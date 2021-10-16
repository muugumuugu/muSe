cd "../music/$1";
for f in *.mp3 ;do link=$(sed -E -e "s|(.*) _ (.*)\.mp3|<li><a href='\1 _ \2.mp3'>\2</a><details><summary>by</summary>\1</details></li>|" <<<"$f"); echo  "$link\n" >> cat.txt; done;
ttemp="${PWD##*/}";
printf -v content "%q"
tt=$(sed -E -e 's/([A-Z])/ \1/g' <<<"${ttemp}");
t=$(perl -ne 'print ucfirst' <<<"${tt}");
th=$(echo "${t^^}");
page="<!doctype html><html lang='en'>\n<head><meta charset='utf-8'>\n<title>$th</title>\n<link rel='stylesheet' href='/styles/home.css'></head>\n<body><header><h1>$t</h1></header>\n<ul>$(cat cat.txt)\n</ul>\n</body></html>";
echo -e "$page" > index.html;
rm cat.txt;
cd ../../;