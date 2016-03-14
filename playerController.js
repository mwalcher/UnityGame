#pragma strict

import System.Collections.Generic;

private var speed : float;
private var flyHeight : float = 3;
private var gravity : float;
public static var start : boolean;

// Disable Gravity
GetComponent.<Rigidbody>().useGravity = false;

private var playerStatus : playerStatusScript;
private var flyScript : flyingEnemyController;


function Start() {
    playerStatus = GameObject.FindGameObjectWithTag("GameController").GetComponent(playerStatusScript);
    speed = 0;
    gravity = 0;
    start = false;
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
		if(!start){

			if(GameState.getCurLevel() == "Terra"){
				speed = 4;
			}else if(GameState.getCurLevel() == "Polaris"){
				speed = 5;
			}else if(GameState.getCurLevel() == "Vulcan"){
				speed = 6;
			}else{
				speed = 4;
			}

			gravity = 8;
			start = true;
		}
		GetComponent.<Rigidbody>().velocity.y = flyHeight;
	}
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
		Destroy(other.gameObject);
		//Debug.Log("shield was picked up");
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

	//Terrain Collider
	if(other.tag == "terrain"){
		if(!playerStatus.isInvincible()){
			playerStatus.takeDamage(10);
			//Debug.Log("Player took Damage");
		}else if(playerStatus.shieldOn()){
			Destroy(GameObject.FindGameObjectWithTag("shieldBubble"));
			playerStatus.shieldBreak();
		}
	}

	//Flying Enemies
	if(other.tag == "flyEnemy"){
		if(!playerStatus.isInvincible()){
			playerStatus.takeDamage(20);
			Destroy(other.gameObject);
			//Debug.Log("Player took Damage");
		}else if(playerStatus.shieldOn()){
			Destroy(GameObject.FindGameObjectWithTag("shieldBubble"));
			Destroy(other.gameObject);
			playerStatus.shieldBreak();
		}
	}

	//Ground Enemies
	if(other.tag == "grdEnemy"){
		if(!playerStatus.isInvincible()){
			playerStatus.takeDamage(30);
			var childs : int = other.transform.parent.childCount;
			// Debug.Log(other.transform.parent.childCount);
			for (var i = childs-1; i>=0; i--) {
				Destroy(other.transform.parent.GetChild(i).gameObject);
			}
			Destroy(other.gameObject);
			//Debug.Log("Player took Damage");
		}else if(playerStatus.shieldOn()){
			Destroy(GameObject.FindGameObjectWithTag("shieldBubble"));
			Destroy(other.gameObject);
			playerStatus.shieldBreak();
		}
	}

}