#pragma strict

import System.Collections.Generic;

public var successFlashMessage : GameObject;

private var speed : float;
private var flyHeight : float = 3;
private var gravity : float;
public static var start : boolean;
public static var dead : boolean;
public static var done : boolean;
public var pickupSound : AudioSource;

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
	done = true;
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
		pickupSound.Play();
		Destroy(other.gameObject);
	}

	//Gems Pickup
	if(other.tag == "gems"){
		playerStatus.pickUpGem();
		pickupSound.Play();
		Destroy(other.gameObject);
	}

	//Sheild Pickup
	if(other.tag == "shield"){
		playerStatus.addToInventory("shield");
		pickupSound.Play();
		Destroy(other.gameObject);
	}

	//Bomb Pickup
	if(other.tag == "bomb"){
		playerStatus.addToInventory("bomb");
		pickupSound.Play();
		Destroy(other.gameObject);
	}

	//Potion Pickup
	if(other.tag == "potion"){
		playerStatus.addToInventory("potion");
		pickupSound.Play();
		Destroy(other.gameObject);
	}

	//Hourglass Pickup
	if(other.tag == "hourglass"){
		playerStatus.addToInventory("hourglass");
		pickupSound.Play();
		Destroy(other.gameObject);
	}

	//Ring Pickup
	if(other.tag == "ring"){
		Destroy(other.gameObject);
		pickupSound.Play();
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

	}

	//Terrain Collider
	if(other.tag == "terrain"){
		if(!playerStatus.isInvincible()){
			playerStatus.takeDamage(10);
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
		}else if(playerStatus.shieldOn()){
			Destroy(GameObject.FindGameObjectWithTag("shieldBubble"));
			playerStatus.shieldBreak();
		}
	}

	//Flying Enemies
	if(other.tag == "flyEnemy"){
		if(!playerStatus.isInvincible()){
			playerStatus.takeDamage(20);
			other.enabled = false;
			other.gameObject.GetComponentInParent(flyingEnemyController).takeDamage();
		}else if(playerStatus.shieldOn()){
			Destroy(GameObject.FindGameObjectWithTag("shieldBubble"));
			other.enabled = false;
			other.gameObject.GetComponentInParent(flyingEnemyController).takeDamage();
			playerStatus.shieldBreak();
		}
	}

	//Ground Enemies
	if(other.tag == "grdEnemy"){
		if(!playerStatus.isInvincible()){
			playerStatus.takeDamage(30);
			//var childs : int = other.transform.parent.childCount;
			// Debug.Log(other.transform.parent.childCount);
			//for (var i = childs-1; i>=0; i--) {
				//Destroy(other.transform.parent.GetChild(i).gameObject);
			//}
			other.enabled = false;
			other.gameObject.GetComponentInParent(groundEnemyController).takeDamage();
		}else if(playerStatus.shieldOn()){
			Destroy(GameObject.FindGameObjectWithTag("shieldBubble"));
			other.enabled = false;
			other.gameObject.GetComponentInParent(groundEnemyController).takeDamage();
			playerStatus.shieldBreak();
		}
	}

}