#pragma strict

import UnityEngine.UI;

// health slider
public var mySlider : UnityEngine.UI.Slider;
public var gemSlider : UnityEngine.UI.Slider;

// lives images
public var heartImage1 : UnityEngine.UI.RawImage;
public var heartImage2 : UnityEngine.UI.RawImage;
public var heartImage3 : UnityEngine.UI.RawImage;

public var healthText : UnityEngine.UI.Text;
public var livesText : UnityEngine.UI.Text;

// powerup images and texture references
public var powerUpContainer : UnityEngine.UI.RawImage;
public var powerUpImage : UnityEngine.UI.RawImage;

public var potionTexture : UnityEngine.Texture;
public var bombTexture : UnityEngine.Texture;
public var shieldTexture : UnityEngine.Texture;
public var hourglassTexture : UnityEngine.Texture;

// inventory references
private var numberOfLives : int = 3;
private var numberOfGems : int = 0;
private var totalNumberOfGems : int = 50;
private var totalHealth : int = 100;

private var inventory = new Dictionary.<String,boolean>();
private var inventoryNames = new Array ("shield","hourglass","bomb","potion");
private var hasItem : boolean = false;

private var deadLifeColour = new Color(83f/255, 83f/255, 83f/255, 1);
private var aliveLifeColour = new Color(255, 255, 255, 1);
private var emptyPowerUp = new Color(30,30,30, 0.1);
private var fullPowerUp = new Color(255,255,255,1);
private var clearPowerUp = new Color(255,255,255,0);

//Powerup Variables
private var invincible : boolean;
private var focused : boolean;

// Shield
private var ShieldActive : boolean;
private var playerHolder : GameObject;
playerHolder = GameObject.Find("Player");

// Potion 
public var playerMeshRenderer : SkinnedMeshRenderer;
public var whiteTexture : Texture;
public var regularTexture : Texture;

//Enemy Scripts
private var flyScript : flyingEnemyController;
private var grdScript : groundEnemyController;

function Start () {
	//setting powerup values to false

    inventory["shield"] = false;
    inventory["hourglass"] = false;
    inventory["bomb"] = false;
    inventory["potion"] = false;

    powerUpContainer.color = emptyPowerUp;
    mySlider.value = 100;
    healthText.text = mySlider.value + " / " + totalHealth;
}

function Update () {
	if(Input.GetKeyUp("z")){
		if(inventory["shield"]){
			shieldProtect();
			inventory["shield"] = false;
			clearInventory();
		}else if(inventory["hourglass"]){
			hourglassActive();
			inventory["hourglass"] = false;
			clearInventory();
		}else if(inventory["bomb"]){
			bombEnemies();
			inventory["bomb"] = false;
			clearInventory();
		}else if(inventory["potion"]){
			potionAlpha();
			inventory["potion"] = false;
			clearInventory();
		}
	}
}


// if there is nothing in the powerup change the colour of the box
// replace powerup image on gui based on what string is passed in
public function addToInventory(object : String) {

	for(var i : int = 0; i < inventoryNames.length; i++){
		if(inventory[inventoryNames[i]]){
			hasItem = true;
		}
    }

    if(!hasItem){
    	powerUpContainer.color = fullPowerUp;

	    if(object == "potion") {
	        powerUpImage.texture = potionTexture;
	        powerUpImage.color = fullPowerUp;
	    }

	    else if(object == "bomb") {
	        powerUpImage.texture = bombTexture;
	        powerUpImage.color = fullPowerUp;
	    }
	    else if(object == "shield") {
	        powerUpImage.texture = shieldTexture;
	        powerUpImage.color = fullPowerUp;
	    }
	    else if(object == "hourglass") {
	        powerUpImage.texture = hourglassTexture;
	        powerUpImage.color = fullPowerUp;
	    }
	        
	    // set inventory object to true
	    inventory[object] = true;
	    // Debug.Log("Adding " + object + " to inventory");
    }

}

public function clearInventory() {
    hasItem = false;
    powerUpContainer.color = emptyPowerUp;
	powerUpImage.color = clearPowerUp;
}

//increase gems by one, if at 50 add a life
public function pickUpGem() {
    numberOfGems++;
    gemSlider.value++;
    
    if(numberOfGems == 50) {
        numberOfGems = 0;
        gemSlider.value = 0;
        addLife();
    }

    // update GUI text
    livesText.text = numberOfGems + " / " + totalNumberOfGems;
}

// decrease the slider value by the damage amount passed in, if slider value is zero, remove a life
public function fullHealth() {
    mySlider.value = 100;
    healthText.text = mySlider.value + " / " + totalHealth;
}

// decrease the slider value by the damage amount passed in, if slider value is zero, remove a life
public function takeDamage(damage : float) {
    mySlider.value = mySlider.value - damage;
    healthText.text = mySlider.value + " / " + totalHealth;

    if(mySlider.value <= 0) {       
        removeLife();
    }
}

    // increase number of lives by one
    // change the colour of the heart image on the GUI based on number of lives
private function addLife() {
    if(numberOfLives<3) {
        numberOfLives++;
        if(numberOfLives==1){
            heartImage1.color= aliveLifeColour;
        }
        else if(numberOfLives == 2) {
            heartImage2.color = aliveLifeColour;
        }
        else if(numberOfLives == 3) {
            heartImage3.color = aliveLifeColour;
        }
    }
}

    // if number of lives is 0, end game,
    // otherwise, update the GUI hearts to reflect number of lives
    // decrease number of lives
    // set slider value back to 100
private function removeLife() {
	numberOfLives--;

    if(numberOfLives == 0) {
        gameOver();
        return;
    } else if(numberOfLives == 1) {
        heartImage2.color = deadLifeColour;
    } else if(numberOfLives == 2) {
        heartImage3.color = deadLifeColour;
    }

    fullHealth();
}

public function gameOver() {
    Debug.Log("GameOver");
}

// Item Functions

function shieldProtect(){
	var player : GameObject = Instantiate(Resources.Load("shieldBubble")) as GameObject;
	player.transform.parent = playerHolder.transform;
	player.transform.localPosition = new Vector3(0,1,0);
	invincible = true;
}

function bombEnemies(){
	//Debug.Log("Bomb Active");

	for(var flyEnemy : GameObject in GameObject.FindGameObjectsWithTag("flyEnemyCont")){
        flyEnemy.GetComponent(flyingEnemyController).Die();
    }

    for(var grdEnemy : GameObject in GameObject.FindGameObjectsWithTag("grdEnemyCont")){
        grdEnemy.GetComponent(groundEnemyController).Die();
    }
}

function hourglassActive(){
	focused = true;
	for(var flyEnemy : GameObject in GameObject.FindGameObjectsWithTag("flyEnemyCont")){
        flyEnemy.GetComponent(flyingEnemyController).slowDown();
    }
	Debug.Log("Hourglass Active");
	Invoke("hourglassEnd", 10);
}

function hourglassEnd(){
	focused = false;
	for(var flyEnemy : GameObject in GameObject.FindGameObjectsWithTag("flyEnemyCont")){
        flyEnemy.GetComponent(flyingEnemyController).returnSpeed();
    }
	Debug.Log("No More Hourglass");
}

function potionAlpha(){
	//Debug.Log("Potion Alpha");
	invincible = true;
	var diffuseShader : Shader;
	diffuseShader = Shader.Find("Unlit/Transparent");
	playerMeshRenderer.material.shader = diffuseShader;
	playerMeshRenderer.material.mainTexture = whiteTexture;
	Invoke("potionEnd", 10);
}

function potionEnd(){
	//Debug.Log("No More Potion");
	invincible = false;
	var diffuseShader : Shader;
	diffuseShader = Shader.Find("Unlit/Texture");
	playerMeshRenderer.material.shader = diffuseShader;
	playerMeshRenderer.material.mainTexture = regularTexture;
}

function isInvincible(){
	return invincible;
}

function isFocused(){
	return focused;
}