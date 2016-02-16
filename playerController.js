#pragma strict

import System.Collections.Generic;

private var health : float = 100;
private var lives : float = 3;
private var gems : float = 0;

private var inventory = new Dictionary.<String,boolean>();
inventory["shield"] = false;
inventory["hourglass"] = false;
inventory["bomb"] = false;
inventory["potion"] = false;

//Shield Bubble Variables
var ShieldActive : boolean;
var playerHolder : GameObject;
playerHolder = GameObject.Find("Player");

private var speed : float = 3;
private var flyHeight : float = 3;
private var gravity : float = 8;

// Disable Gravity
GetComponent.<Rigidbody>().useGravity = false;

private var playerStatus : playerStatusScript;

function Start() {
    playerStatus = GameObject.FindGameObjectWithTag("GameController").GetComponent(playerStatusScript);
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
}

function shieldProtect(){
	var player : GameObject = Instantiate(Resources.Load("shieldBubble")) as GameObject;
	player.transform.parent = playerHolder.transform;
	player.transform.localPosition = new Vector3(0,1,0);
}

function OnTriggerEnter(other:Collider){

	//Health Pickup
	if(other.tag == "health"){
		playerStatus.fullHealth();
		Destroy(other.gameObject);
		//Debug.Log("health was picked up");
	}

	//Gems Pickup
	if(other.tag == "gems"){
		playerStatus.pickUpGem();
		Destroy(other.gameObject);
		//Debug.Log("Gem was collected, current gems = " + gems);
	}

	//Sheild Pickup
	if(other.tag == "shield"){
		playerStatus.addToInventory("shield");
		//Debug.Log("shield was picked up");

		if(ShieldActive == false){
			shieldProtect();
			Destroy(other.gameObject);
		}else{
			Destroy(other.gameObject);
		}
	}

	//Bomb Pickup
	if(other.tag == "bomb"){
		playerStatus.addToInventory("bomb");
		Destroy(other.gameObject);
		//Debug.Log("Bomb was picked up");
	}

	//Potion Pickup
	if(other.tag == "potion"){
		playerStatus.addToInventory("potion");
		Destroy(other.gameObject);
		//Debug.Log("Potion was picked up");
		//GetComponent.<Renderer>().material.color.a = 0.5;
	}

	//Hourglass Pickup
	if(other.tag == "hourglass"){
		playerStatus.addToInventory("hourglass");
		Destroy(other.gameObject);
		//Debug.Log("Hourglass has been picked up");
	}

}