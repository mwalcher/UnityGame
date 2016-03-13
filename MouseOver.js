#pragma strict


public var GUI :  GameObject;
private var ScreenSelectionGUI :  ScreenSelectionGUI;
public var lightObj : Light;
public var myText : Text;
private var startingColor;


function Start () {
	startingColor = myText.color;
	ScreenSelectionGUI = GUI.GetComponent.<ScreenSelectionGUI>();
}

function Update () {

}

function OnMouseEnter() {
	//Debug.Log('mouseover');
	myText.color = new Color(255,255,255,1);

	lightObj.enabled = true;

}

function OnMouseExit() {
	//Debug.Log('mouseout');

	lightObj.enabled = false;
	myText.color = startingColor;
}
