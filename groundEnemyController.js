#pragma strict

import System.Collections.Generic;

var anim: Animator;
private var player : GameObject;
private var target : Vector3;
private var enemy : Vector3;
private var distance : float;
private var attack : String;
private var trigger : boolean;
private var idle : boolean;

private var playerStatus : playerStatusScript;

function Start(){
	player = GameObject.Find("Player");
	anim = GetComponent("Animator");
	playerStatus = GameObject.FindGameObjectWithTag("GameController").GetComponent(playerStatusScript);

	trigger = true;

	if(this.name == "Plant"){
		attack = "Attack";
	}else if(this.name == "Beast"){
		attack = "ClapAttack";
	}else if(this.name == "Monster"){
		attack = "BiteAttack";
	}
}

function FixedUpdate(){

	// Follow Player
	target = player.transform.position;
    enemy = transform.position;
    distance = enemy.x - target.x;

    if(this.distance < 10 && this.distance > 0 && trigger && !playerStatus.isFocused()){
    	Attack();
    	//Debug.Log("Attack");
    }else if(this.distance < 0 && !idle){
    	Idle();
    	//Debug.Log("Idle");
    }

}

function Attack(){
	trigger = false;
	InvokeRepeating("attackAnim", .01, 2.0);
}

function attackAnim(){
	//Debug.Log("Attack Animation");
	anim.Play(attack, -1, 0.0f);
}

function Idle(){
	idle = true;
	CancelInvoke();
	anim.Play("Idle", -1, 0.0f);
}

function Die(){
	anim.Play("Die", -1, 0.0f);
	yield WaitForSeconds(1);
	Destroy(gameObject);
}