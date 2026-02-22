let log="KeyWin v0.1.0016: ";
print("Loading KeyWin v0.1.0017...");

// workspace.windowActivated.connect(OnWindowActivated);
registerShortcut("KeyWin Focus Left", "Move focus to window to the left", "Meta+Left", OnFocusLeft);
registerShortcut("KeyWin Focus Right", "Move focus to window to the right", "Meta+Right", OnFocusRight);
registerShortcut("KeyWin Focus Up", "Move focus to window above", "Meta+Up", OnFocusUp);
registerShortcut("KeyWin Focus Down", "Move focus to window to below", "Meta+Down", OnFocusDown);

registerShortcut("KeyWin Move Left", "Move the active window to the left", "Meta+Shift+Left", OnMoveLeft);
registerShortcut("KeyWin Move Right", "Move the active window to the right", "Meta+Shift+Right", OnMoveRight);
registerShortcut("KeyWin Move Up", "Move the active window upward", "Meta+Shift+Up", OnMoveUp);
registerShortcut("KeyWin Move Down", "Move the active window downward", "Meta+Shift+Down", OnMoveDown);

registerShortcut("KeyWin Resize Left", "Reduce the active window size by moving the right edge to the left", "Meta+Ctrl+Left", OnResizeLeft);
registerShortcut("KeyWin Resize Right", "Enlarge the active window size by moving the right edge to the right", "Meta+Ctrl+Right", OnResizeRight);
registerShortcut("KeyWin Resize Up", "Reduce the active window size by moving the bottom edge upward", "Meta+Ctrl+Up", OnResizeUp);
registerShortcut("KeyWin Resize Down", "Enlarge the active window size by moving the bottom edge downward", "Meta+Ctrl+Down", OnResizeDown);

// ------------------------------------------------------------------------------------
/*
let g_panels = new Array();

for(let i=0; i<workspace.stackingOrder.length; i++)
	{
	let win = workspace.stackingOrder[i];
	print("stackingOrder[" + i + "]: " + win.caption);
	AddNewWindow(win);
	}
*/

let g_margin = 5;
let g_screenWidth = workspace.activeScreen.geometry.width;
let g_screenHeight = workspace.activeScreen.geometry.height;
g_screenWidth = g_screenWidth - 2 * g_margin;
g_screenHeight = g_screenHeight - 55;	// Height of the task bar

let g_hStopDelta = g_screenWidth / 8;
let g_vStopDelta = g_screenHeight / 8;

function GetClosestHorizontalStop(x)
	{
	return g_margin + Math.round(x / g_hStopDelta) * g_hStopDelta;
	}

function GetClosestVerticalStop(y)
	{
	return g_margin + Math.round(y / g_vStopDelta) * g_vStopDelta;
	}

function GetSortedWindowList()
	{
	let list = new Array();
	for(let i=0; i<workspace.stackingOrder.length; i++)
		{
		let win = workspace.stackingOrder[i];
		print("stackingOrder[" + i + "]: " + win.caption);
		if (win.normalWindow && win.managed && !win.hidden)
			list.push(win);
		}
	list.sort(function(a,b)
		{
		let cmp = a.frameGeometry.x - b.frameGeometry.x;
		if (cmp == 0)
			cmp = a.frameGeometry.y - b.frameGeometry.y;
//		if (cmp == 0)
//			cmp = a.stackingOrder - b.stackingOrder;
		if (cmp == 0)
			cmp = a.pid - b.pid;
		if (cmp == 0)
			cmp = a.internalId - b.internalId;
		return cmp;
		});
	for(let i=0; i<list.length; i++)
		{
		let win = list[i];
		print("list[" + i + "]: " + win.caption + " (" + win.frameGeometry.x + "," + win.frameGeometry.y + ") pid = " + win.pid);
		}
	return list;
	}

// ------------------------------------------------------------------------------------

function OnWindowActivated(a_window)
    {
    print("OnWindowActivated...");
    print("a_window.caption = " + a_window.caption);
    }

function OnFocusLeft()
	{
    print("OnFocusLeft...");

    const act = workspace.activeWindow;
    if (!act)
    	{
    	print("No active window");
        return;
        }
	print("act: " + act.caption + " (" + act.frameGeometry.x + "," + act.frameGeometry.y + ") pid = " + act.pid);

	let sorted = GetSortedWindowList();
	let index = sorted.indexOf(act);
	index = index - 1;
	if (index < 0)
		{
		print("Reached leftmost window");
		return;
		}
	workspace.activeWindow = sorted[index];
	}

function OnFocusRight()
	{
    print("OnFocusRight...");

    const act = workspace.activeWindow;
    if (!act)
    	{
    	print("No active window");
        return;
        }
	print("act: " + act.caption + " (" + act.frameGeometry.x + "," + act.frameGeometry.y + ") pid = " + act.pid);

	let sorted = GetSortedWindowList();
	let index = sorted.indexOf(act);
	index = index + 1;
	if (index >= sorted.length)
		{
		print("Reached rightmost window");
		return;
		}
	workspace.activeWindow = sorted[index];
	}

function OnFocusUp()
	{
    print("OnFocusUp...");
	}

function OnFocusDown()
	{
    print("OnFocusDown...");
	}

function OnMoveLeft()
	{
    print("OnMoveLeft...");

    const win = workspace.activeWindow;
    if (!win)
    	{
    	print("No active window");
        return;
        }

	let g = win.frameGeometry;
	let x = GetClosestHorizontalStop(g.x);
	x = x - g_hStopDelta;

    print("Moving to " + x + ", " + g.y);
    win.frameGeometry = { x: x, y: g.y, height: g.height, width: g.width };
    print("Window moved.");
	}

function OnMoveRight()
	{
    print("OnMoveRight...");

    const win = workspace.activeWindow;
    if (!win)
    	{
    	print("No active window");
        return;
        }

	let g = win.frameGeometry;
	let x = GetClosestHorizontalStop(g.x);
	x = x + g_hStopDelta;

    print("Moving to " + x + ", " + g.y);
    win.frameGeometry = { x: x, y: g.y, height: g.height, width: g.width };
    print("Window moved.");
	}

function OnMoveUp()
	{
    print("OnMoveUp...");

    const win = workspace.activeWindow;
    if (!win)
    	{
    	print("No active window");
        return;
        }

	let g = win.frameGeometry;
	let y = GetClosestVerticalStop(g.y);
	y = y - g_vStopDelta;

    print("Moving to " + g.x + ", " + y);
    win.frameGeometry = { x: g.x, y: y, height: g.height, width: g.width };
    print("Window moved.");
	}

function OnMoveDown()
	{
    print("OnMoveDown...");

    const win = workspace.activeWindow;
    if (!win)
    	{
    	print("No active window");
        return;
        }

	let g = win.frameGeometry;
	let y = GetClosestVerticalStop(g.y);
	y = y + g_vStopDelta;

    print("Moving to " + g.x + ", " + y);
    win.frameGeometry = { x: g.x, y: y, height: g.height, width: g.width };
    print("Window moved.");
	}

function OnResizeLeft()
	{
    print("OnResizeLeft...");

    const win = workspace.activeWindow;
    if (!win)
    	{
    	print("No active window");
        return;
        }

	let g = win.frameGeometry;
	let x = g.x + g.width;
	x = GetClosestHorizontalStop(x);
	x = x - g_hStopDelta;
	let w = x - g.x;

    win.frameGeometry = { x: g.x, y: g.y, height: g.height, width: w };
	}

function OnResizeRight()
	{
    print("OnResizeRight...");

    const win = workspace.activeWindow;
    if (!win)
    	{
    	print("No active window");
        return;
        }

	let g = win.frameGeometry;
	let x = g.x + g.width;
	x = GetClosestHorizontalStop(x);
	x = x + g_hStopDelta;
	let w = x - g.x;

    win.frameGeometry = { x: g.x, y: g.y, height: g.height, width: w };
	}

function OnResizeUp()
	{
    print("OnResizeUp...");

    const win = workspace.activeWindow;
    if (!win)
    	{
    	print("No active window");
        return;
        }

	let g = win.frameGeometry;
	print("g = " + g);
	let y = g.y + g.height;
	print("y = " + y);
	y = GetClosestVerticalStop(y);
	print("y = " + y);
	y = y - g_vStopDelta;
	print("y = " + y);
	let h = y - g.y;
	print("h = " + h);

    win.frameGeometry = { x: g.x, y: g.y, height: h, width: g.width };
    print("Window moved.");
	}

function OnResizeDown()
	{
    print("OnResizeDown...");

    const win = workspace.activeWindow;
    if (!win)
    	{
    	print("No active window");
        return;
        }

	let g = win.frameGeometry;
	print("g = " + g);
	let y = g.y + g.height;
	print("y = " + y);
	y = GetClosestVerticalStop(y);
	print("y = " + y);
	y = y + g_vStopDelta;
	print("y = " + y);
	let h = y - g.y;
	print("h = " + h);

    win.frameGeometry = { x: g.x, y: g.y, height: h, width: g.width };
    print("Window moved.");
	}

print("Loaded.");
