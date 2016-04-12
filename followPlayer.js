#pragma strict

private var target : GameObject;

function Start(){
	target = GameObject.Find("Player");
}

function Update(){
	transform.position.x = target.transform.position.x+2.5;
	transform.position.y = target.transform.position.y+.5;
}