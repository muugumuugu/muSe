cd ../music;
mtemp=$(ls */ -d );
for d in $mtemp; do titletemp=$(sed -E "s/([A-Z])/ \1/g" <<<${d%/}); title=$(perl -ne 'print ucfirst' <<<"${titletemp}");  echo "<li><a href='$d'>$title</a></li>">>cat.txt; done;
main="$(cat cat.txt)";
rm cat.txt;
pagetop="<!doctype html>\n<html>\n<head>\n<meta charset='utf-8'>\n<meta name='viewport' content='width=device-width'>\n<title>music stash/</title>\n<link rel='icon' href='../muse.png'>\n<link rel='stylesheet' href='/styles/home.css'>\n<style>\n	html,body{height:100%;}\n	main{height:74%;}\n	ul.flexnone{margin:0px; padding:0px;overflow-x:auto; height:100%!important;overflow-y:auto;}\n	li {width:245px!important;}\n	li:before{content:'\\\01D11E\\\0020\\\0020'}\n	h1{font-size:24px;padding:0px;margin:0px;}\n</style>\n</head>\n<body>\n<header>\n<h1>music stash/</h1>\n<audio style='width:98%' controls src='dream.mp3'></audio>\n</header>\n<main>\n<ul class='flexnone'>\n"
pagebottom="</ul>\n</main>\n<hr>\n<center><a class='btn' style='font-size:12px; height:14px;' href='folderTemplate/'>template directory</a></center>\n<footer style=' margin-top:4px;background:rgba(0,0,0,0.1)'>\n<center><a style='color:#b5e853' href='../index.html'>muSe Home</a></center>\n</footer>\n</body></html>";
echo -e "$pagetop $main $pagebottom" >index.html;
for d in $(ls */ -d) ; do cd ../bash ;bash ./albumupdate.sh "$d"; cd ../music;done;
cd ../bash;
bash ./jukeupdate.sh;
bash ./addpl.sh;