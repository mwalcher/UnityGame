#pragma strict

private var target : GameObject;

function Start(){
	target = GameObject.Find("Succubus");
}

function Update(){
	transform.position.x = target.transform.position.x+3.5;
	transform.position.y = target.transform.position.y+.5;
}