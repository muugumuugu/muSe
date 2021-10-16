#!/bin/bash
app="bones"
PS3='> '
musicdir="../music/"
cd $musicdir
find ./ -name "*.mp3" >lst.txt
songs=()
while read line; do
songs+=("$line")
done < lst.txt
IFS=$'\n'
main() {
	printf "%s\n" ${app^^} | sed 's/./& /g'
	echo $songs
	select option in ${songs[@]}
	do
		echo $option
		case $option in
		"") clear ; exit 0 ;;
		*) clear ; printf "%s\n" ${app^^} | sed 's/./& /g' ; printf "%s\n\n" "Playing: $option" ; mpv "$musicdir$option" ; clear ; main
		;;
		esac
	done
}
clear
cd $musicdir ; main
unset IFS