# KWinScripts

This is the project where I learn how to write KWin Scripts.

Starting by looking for documentation pages. I found:

	https://develop.kde.org/docs/plasma/kwin/api/
	https://zeroxoneafour.github.io/kwin-scripting-docs/api-documentation.html
	https://docs.novaflowos.com/start/kde-developer-platform/readme/plasma/kwin/_index
	https://github.com/peterfajdiga/kwin4_effect_geometry_change

Trying out the Plasma Desktop Scripting Console:

	plasma-interactiveconsole --kwin &

I wrote this script and the windowActivated part works, but registerShortcut is not
responding to any key presses. The key press is sent to the application instead.

	print("Hello, World!");

	workspace.windowActivated.connect(function(client)
	    {
	    print("windowActivated: " + client.caption)
	    });

	registerShortcut("MoveWindowLeft", "Move window left to next snap point", "Meta+Shift+Left", function()
	    {
	    print("Moving window left");

	    const win = workspace.activeClient;
	    if (!win)
	        return;

	    print("Moving window left")
	    let g = win.geometry;
	    g.x = g.x - 50;
	    win.geometry = g;
	    });

Turns out plasma-interactiveconsole is not a very good tool for iterative development.
I will create an actual KWin Script directory structure to run my code.
But first, I create a github repo to hold this and future scripts.

To join an existing directory to a new empty github repo is done like this:

	cd ~/Projects/Foobar
	git init
	git remote add origin https://github.com/ptousig1/Foobar
	git add .
	git status
	git commit -m "Initial commit"
	git push -u origin main

At this point, I have a metadata.json and a main.js.
To reload all scripts:

	qdbus org.kde.KWin /KWin reconfigure

To automatically reconfigure on every save:

	#1/usr/bin/env bash

	journalctl -f QT_CATEGORY=js QT_CATEGORY=kwin_scripting &

	while inotifywait -e close_write ~/Projects/KWinScripts/KeyWin/contents/code/main.js; do
		echo watch.sh: Change detected, reloading...
		cp ~/Projects/KWinScripts/KeyWin/metadata.json ~/.local/share/kwin/scripts/KeyWin/metadata.json
		cp ~/Projects/KWinScripts/KeyWin/contents/code/main.js ~/.local/share/kwin/scripts/KeyWin/contents/code/main.js
		qdbus org.kde.KWin /Scripting unloadScript KeyWin
		qdbus org.kde.KWin /Scripting loadScript KeyWin
		qdbus org.kde.KWin /Scripting start
		qdbus org.kde.KWin /KWin reconfigure
		echo watch.sh: Reloaded.
	done

To edit the global shortcut keys:

	micro ~/.config/kglobalshortcutsrc

I found a promising script written by Peter Fajdiga that animates windows as they move.
It appears to have been written for KWin 4 and then adapted to KWin 5, but it does not
appear to work in KWin 6. I tried tweaking it to make it work, but to no avail.

I will now try to just invoke the animation code he uses in my own script, just to see
if the API is even still there and working.






# EOF
