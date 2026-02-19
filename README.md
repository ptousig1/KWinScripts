# KWinScripts

This is the project where I learn how to write KWin Scripts.

Starting by looking for documentation pages. I found:

	https://develop.kde.org/docs/plasma/kwin/
	https://zeroxoneafour.github.io/kwin-scripting-docs/api-documentation.html
	https://docs.novaflowos.com/start/kde-developer-platform/readme/plasma/kwin/_index

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
	    print("Moving window left")

	    const win = workspace.activeClient;
	    if (!win)
	        return;

	    print("Moving window left")
	    let g = win.geometry;
	    g.x = g.x - 50;
	    win.geometry = g;
	    });
