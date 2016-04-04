#pragma strict

import System.Collections.Generic;

public var successFlashMessage : GameObject;

private var speed : float;
private var flyHeight : float = 3;
private var gravity : float;
public static var start : boolean;
public static var dead : boolean;
public static var done : boolean;

// Disable Gravity
GetComponent.<Rigidbody>().useGravity = false;

private var playerStatus : playerStatusScript;
private var flyScript : flyingEnemyController;


function Start() {
    playerStatus = GameObject.FindGameObjectWithTag("GameController").GetComponent(playerStatusScript);
    speed = 0;
    gravity = 0;
    start = false;
    dead = false;
    done = false;
    successFlashMessage.SetActive(false);
}

function setDead(value : boolean) {
	dead = value;
	speed = 0;
	gravity = 0;
	//Debug.Log("DEAD IS " + dead);
}

function FixedUpdate(){
	// Locked Z Position
	transform.position.z = 0;

	if(done){
		GetComponent.<Rigidbody>().velocity.y = 0;
	}

	// Constant Horzontal Movement
	GetComponent.<Rigidbody>().velocity.x = speed;
	
	// Apply New Gravity
	GetComponent.<Rigidbody>().AddForce(new Vector3(0,-gravity*GetComponent.<Rigidbody>().mass,0));
	
	if(!dead) {
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
}

function OnTriggerEnter(other:Collider){

	//Health Pickup
	if(other.tag == "health"){
		playerStatus.fullHealth();
		other.GetComponent.<AudioSource>().Play();
		other.GetComponent.<Renderer>().enabled = false;
		Destroy(other.gameObject);
		//Debug.Log("health was picked up");
	}

	//Gems Pickup
	if(other.tag == "gems"){
		playerStatus.pickUpGem();
		other.GetComponent.<AudioSource>().Play();
		other.GetComponent.<Renderer>().enabled = false;
		Destroy(other.gameObject, 1);
		//Debug.Log("Gem was collected, current gems = " + gems);
	}

	//Sheild Pickup
	if(other.tag == "shield"){
		playerStatus.addToInventory("shield");
		other.GetComponent.<AudioSource>().Play();
		other.GetComponent.<Renderer>().enabled = false;
		yield WaitForSeconds (5);
		Destroy(other.gameObject);
		//Debug.Log("shield was picked up");
	}

	//Bomb Pickup
	if(other.tag == "bomb"){
		playerStatus.addToInventory("bomb");
		other.GetComponent.<AudioSource>().Play();
		other.GetComponent.<Renderer>().enabled = false;
		yield WaitForSeconds (5);
		//other.GetComponent.<AudioSource>().Play();
		//other.GetComponent.<Renderer>().enabled = false;
		Destroy(other.gameObject);
		//Debug.Log("Bomb was picked up");
	}

	//Potion Pickup
	if(other.tag == "potion"){
		playerStatus.addToInventory("potion");
		other.GetComponent.<AudioSource>().Play(2);
		other.GetComponent.<Renderer>().enabled = false;
		Destroy(other.gameObject);
		//Debug.Log("Potion was picked up");
		//GetComponent.<Renderer>().material.color.a = 0.5;
	}

	//Hourglass Pickup
	if(other.tag == "hourglass"){
		playerStatus.addToInventory("hourglass");
		other.GetComponent.<AudioSource>().Play();
		other.GetComponent.<Renderer>().enabled = false;
		yield WaitForSeconds (5);
		//GameObject.FindGameObjectWithTag("hourglass").GetComponent.<AudioSource>().Play;
		Destroy(other.gameObject);
		//Debug.Log("Hourglass has been picked up");
	}

	//Ring Pickup
	if(other.tag == "ring"){
		Destroy(other.gameObject);
		other.GetComponent.<AudioSource>().Play();
		other.GetComponent.<Renderer>().enabled = false;
		//GameObject.FindGameObjectWithTag("ring").GetComponent.<AudioSource>().Play;
		GameState.newRing(GameState.getCurLevel());
		done = true;
		speed = 0;
		gravity = 0;
		successFlashMessage.SetActive(true);
		yield WaitForSeconds(2);

		if(GameState.getTerraRing() && GameState.getPolarisRing() && GameState.getVulcanRing()){
			Application.LoadLevel("Win");
		}else{
			GameState.clearCheckpoints();
			GameState.setStartPos(Vector3.zero);
			GameState.setLastGemCount();
			Application.LoadLevel("characterSelection");
		}

		//Debug.Log(GameState.getCurLevel() + " Ring collected");
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

	//Water Collider
	if(other.tag == "water"){
		if(!playerStatus.isInvincible()){
			playerStatus.takeDamage(10);
			GetComponent.<Rigidbody>().velocity.y = flyHeight;
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