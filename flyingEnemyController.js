#pragma strict

import System.Collections.Generic;

private var speed : float = -2;
private var player : GameObject;
private var target : Transform;
private var turnSpeed : float = 5.0f;
private var _dir : Vector3;

function Start(){
	player = GameObject.Find("Player");
	target = player.transform;
}

function Update () {
     //if(target){
     //   _dir = target.position - GetComponent.<Rigidbody>().position;
     //   _dir.Normalize();
     //   transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(_dir), turnSpeed * Time.deltaTime);
     //}
}

function FixedUpdate(){
	// Constant Horzontal Movement
	GetComponent.<Rigidbody>().velocity.x = speed;

	// Follow Player
	//GetComponent.<Rigidbody>().AddForce(_dir * speed);
	transform.position = new Vector3(transform.position.x, player.transform.position.y, 0);
	//transform.position = new Vector3.MoveTowards(transform.position, target.position, speed * Time.deltaTime);
}

function slowDown(){
	speed = -0.5;
}

function returnSpeed(){
	speed = -2;
}