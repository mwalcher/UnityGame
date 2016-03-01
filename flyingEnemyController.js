#pragma strict

import System.Collections.Generic;

private var speed : float = -2;
private var player : GameObject;
private var target : Vector3;
private var enemy : Vector3;
private var distance : float;
private var dir : float;

function Start(){
	player = GameObject.Find("Player");
}

function FixedUpdate(){
	// Constant Horzontal Movement
	GetComponent.<Rigidbody>().velocity.x = speed;

	// Follow Player
	target = player.transform.position;
    enemy = transform.position;
    distance = enemy.x - target.x;
    dir = enemy.y - target.y;

    if(this.distance < 20 && this.distance > 0){
    	transform.rotation.x = -dir/10;
    	transform.rotation.y = 0.75;
    	transform.rotation.z = 0;
    }else if(this.distance < 0){
    	transform.rotation.x = 0;
    	transform.rotation.y = 0.75;
    	transform.rotation.z = 0;
    }
}

function slowDown(){
	speed = -0.5;
}

function returnSpeed(){
	speed = -2;
}