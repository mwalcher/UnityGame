#pragma strict

import System.Collections.Generic;

var anim: Animator;
private var player : GameObject;
private var target : Vector3;
private var enemy : Vector3;
public var distance : float;
private var speed : float;
private var slow : boolean;
private var startPosY : float;

private var playerStatus : playerStatusScript;

function Start(){
	player = GameObject.Find("Player");
	anim = GetComponent("Animator");
	playerStatus = GameObject.FindGameObjectWithTag("GameController").GetComponent(playerStatusScript);

	speed = 0;
	slow = false;

	startPosY = transform.position.y;
}

function FixedUpdate(){

	// Constant Horzontal Movement
	if(this.distance < 50 && playerController.start && !slow){
    	speed = -2;
    }

	GetComponent.<Rigidbody>().velocity.x = speed;
	transform.position.y = startPosY;

	// Follow Player
	target = player.transform.position;
    enemy = transform.position;
    distance = enemy.x - target.x;
    var step = 1.5 * Time.deltaTime;

    if(this.distance < 20 && this.distance > 0 && !playerStatus.isFocused()){
    	transform.position = Vector3.MoveTowards(transform.position, target, step);
    }
}

function slowDown(){
	slow = true;
	speed = -0.5;
}

function returnSpeed(){
	slow = false;
	speed = -2;
}

function Die(){
	speed = 0;
	anim.Play("Die", -1, 0.0f);
	yield WaitForSeconds(1);
	Destroy(gameObject);
}