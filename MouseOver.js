#pragma strict


public var GUI :  GameObject;
private var ScreenSelection :  ScreenSelectionGUI;
public var lightObj : Light;
public var myText : Text;
private var startingColor;


function Start () {
	startingColor = myText.color;
	ScreenSelection = GUI.GetComponent.<ScreenSelectionGUI>();
}

function OnMouseEnter() {
	if(!ScreenSelectionGUI.isActive()){
		myText.color = new Color(255,255,255,1);
		lightObj.enabled = true;
	}
}

function OnMouseExit() {
	if(!ScreenSelectionGUI.isActive()){
		lightObj.enabled = false;
		myText.color = startingColor;
	}
}