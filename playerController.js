#pragma strict

import System.Collections.Generic;

//private var health : float = 100;
//private var lives : float = 3;
//private var gems : float = 0;

//private var inventory = new Dictionary.<String,boolean>();
//inventory["shield"] = false;
//inventory["hourglass"] = false;
//inventory["bomb"] = false;
//inventory["potion"] = false;

private var speed : float = 3;
private var flyHeight : float = 3;
private var gravity : float = 8;

// Disable Gravity
GetComponent.<Rigidbody>().useGravity = false;

private var playerStatus : playerStatusScript;

function Start() {

    playerStatus = GetComponent(playerStatusScript);
}

function FixedUpdate(){
	// Locked Z Position
	transform.position.z = 0;

	// Constant Horzontal Movement
	GetComponent.<Rigidbody>().velocity.x = speed;
	
	// Apply New Gravity
	GetComponent.<Rigidbody>().AddForce(new Vector3(0,-gravity*GetComponent.<Rigidbody>().mass,0));
	
	// Handle Flying
	if(Input.GetButton("Jump")){
		GetComponent.<Rigidbody>().velocity.y = flyHeight;
	}

	//playerStatus.takeDamage(1f);
	//playerStatus.pickUpGem();
    // on collision with potion obj
	playerStatus.addToInventory("bomb");
}

// onCollision
// and in onCollision, call the appropriate method in the playerStatusScript