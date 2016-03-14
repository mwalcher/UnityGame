#pragma strict

import System.Collections.Generic;

var anim: Animator;
private var player : GameObject;
private var target : Vector3;
private var enemy : Vector3;
public var distance : float;
private var dir : float;
private var speed : float;

private var playerStatus : playerStatusScript;

function Start(){
	player = GameObject.Find("Player");
	anim = GetComponent("Animator");
	playerStatus = GameObject.FindGameObjectWithTag("GameController").GetComponent(playerStatusScript);

	speed = 0;
}

function FixedUpdate(){
	// Constant Horzontal Movement
	GetComponent.<Rigidbody>().velocity.x = speed;

	// Follow Player
	target = player.transform.position;
    enemy = transform.position;
    distance = enemy.x - target.x;
    dir = enemy.y - target.y;

    if(this.distance < 50 && playerController.start){
    	speed = -2;
    }

    if(this.distance < 20 && this.distance > 0 && !playerStatus.isFocused()){
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
	speed = -1;
}

function returnSpeed(){
	speed = -2;
}

function Die(){
	speed = 0;
	anim.Play("Die", -1, 0.0f);
	yield WaitForSeconds(1);
	Destroy(gameObject);
}