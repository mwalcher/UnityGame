#pragma strict

import System.Collections.Generic;

private var speed : float = -2;
private var gravity : float = 8;

// Disable Gravity
GetComponent.<Rigidbody>().useGravity = false;


function FixedUpdate(){
	// Locked Z Position
	transform.position.z = 0;

	// Constant Horzontal Movement
	GetComponent.<Rigidbody>().velocity.x = speed;
	
	// Apply New Gravity
	GetComponent.<Rigidbody>().AddForce(new Vector3(0,-gravity*GetComponent.<Rigidbody>().mass,0));
}

function slowDown(){
	speed = -0.5;
}

function returnSpeed(){
	speed = -2;
}