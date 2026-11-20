#1/usr/bin/env bash

SCRIPT=KeyWin
SRC=~/Projects/KWinScripts
DST=~/.local/share/kwin/scripts

echo SCRIPT=$SCRIPT

journalctl -f QT_CATEGORY=js QT_CATEGORY=kwin_scripting &

while inotifywait -e close_write $SRC/$SCRIPT/contents/code/main.js; do
	echo watch.sh: Change detected, reloading...
	cp $SRC/$SCRIPT/metadata.json $DST/$SCRIPT/metadata.json
	cp $SRC/$SCRIPT/contents/code/main.js $DST/$SCRIPT/contents/code/main.js
	qdbus org.kde.KWin /Scripting unloadScript $SCRIPT
	qdbus org.kde.KWin /Scripting loadScript $SCRIPT
	qdbus org.kde.KWin /Scripting start
	qdbus org.kde.KWin /KWin reconfigure
done
