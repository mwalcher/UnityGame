#pragma strict

import System.Collections.Generic;

private var health : float = 100;
private var lives : float = 3;
private var gems : float = 0;


//Shield Bubble Variables
//var playerHolder : GameObject = GameObject.Find("Player");
//var shieldBubble : String = "shieldBubble";
//private var ShieldActive : boolean;

private var inventory = new Dictionary.<String,boolean>();
inventory["shield"] = false;
inventory["hourglass"] = false;
inventory["bomb"] = false;
inventory["potion"] = false;

private var speed : float = 3;
private var flyHeight : float = 3;
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
	
	// Handle Flying
	if(Input.GetButton("Jump")){
		GetComponent.<Rigidbody>().velocity.y = flyHeight;
	}

}

function OnTriggerEnter(other:Collider){

	//Health Pickup
	if(other.tag == "health" && health < 100){
		health++;
		Debug.Log("health was picked up");
		Destroy(other.gameObject);
	}else if(other.tag == "health" && health >= 100){
		health = 100;
		Debug.Log("You Health was 100, object was destroy");
		Destroy(other.gameObject);
	}

	//Gems Pickup
	if(other.tag == "gems"){
		gems++;
		Destroy(other.gameObject);
		Debug.Log("Gem was collected, current gems = " + gems);
	}

	//Sheild Pickup
	if(other.tag == "shield"){
		//if(ShieldActive == false)
		//{
			//shieldProtect();
			Destroy(other.gameObject);
			Debug.Log("shield was picked up");
		//}

		//else if(ShieldActive == true)
		//{
			//Destroy(other.gameObject);
		//}
	}

	//Bomb Pickup
	if(other.tag == "bomb"){
		Destroy(other.gameObject);
		Debug.Log("Bomb was picked up");
	}

	//Potion Pickup
	if(other.tag == "potion"){
		Destroy(other.gameObject);
		Debug.Log("Potion was picked up");
		//GetComponent.<Renderer>().material.color.a = 0.5;
	}

	//Hourglass Pickup
	if(other.tag == "hourglass"){
		Destroy(other.gameObject);
		Debug.Log("Hourglass has been picked up");
	}

}

/*function shieldProtect()
{
	var player : GameObject = Instantiate(Resources.Load(shieldBubble)) as GameObject;
	player.transform.parent = playerHolder.transform;
	player.transform.localPosition = new Vector3(0,0,0);
}*/