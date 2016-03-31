#pragma strict

import UnityEngine.UI;
public var loseLifeOverlay : GameObject;

// animator
private var anim: Animator;


//light
public var directionalLight : Light;

// health slider
public var mySlider : UnityEngine.UI.Slider;
public var gemSlider : UnityEngine.UI.Slider;

// lives images
public var heartImage1 : UnityEngine.UI.RawImage;
public var heartImage2 : UnityEngine.UI.RawImage;
public var heartImage3 : UnityEngine.UI.RawImage;
public var heartImage4 : UnityEngine.UI.RawImage;
private var heartsContainer : Transform;
heartsContainer = GameObject.Find('HeartsContainer').transform;
private var initialHeartsPosition : float;
public var healthText : UnityEngine.UI.Text;
public var livesText : UnityEngine.UI.Text;

// powerup images and texture references
public var powerUpContainer : UnityEngine.UI.RawImage;
public var powerUpImage : UnityEngine.UI.RawImage;
public var powerUpDescription: UnityEngine.UI.Text;

public var potionTexture : UnityEngine.Texture;
public var bombTexture : UnityEngine.Texture;
public var shieldTexture : UnityEngine.Texture;
public var hourglassTexture : UnityEngine.Texture;

// checkpoint references
public var checkpoint1 : UnityEngine.UI.RawImage;
public var checkpoint2 : UnityEngine.UI.RawImage;
public var emptyCheckpoint : UnityEngine.Texture;
public var fullCheckpoint : UnityEngine.Texture;

// inventory references
private var numberOfLives : int;
private var numberOfGems : int;
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
private var shieldActive : boolean;
private var playerHolder : GameObject;
playerHolder = GameObject.Find("Player");

// Potion 
public var playerMeshRenderer : SkinnedMeshRenderer;
public var whiteTexture : Texture;
public var regularTexture : Texture;

//Enemy Scripts
private var flyScript : flyingEnemyController;
private var grdScript : groundEnemyController;

private var playerControllerScript : playerController;

function Start () {

	// heartsContainer = GameObject.Find('HeartsContainer').transform;
	var initialHeartsPosition = heartsContainer.position.x;

	// heartsContainer.position.x = initialHeartsPosition-50;

	// Debug.Log(move.position);
	loseLifeOverlay.SetActive(false);
	heartImage4.enabled=false;

	if(GameState.getCurLevel() == "Terra"){
		anim = GameObject.Find("Flora").GetComponent("Animator");
	}else if(GameState.getCurLevel() == "Polaris"){
		anim = GameObject.Find("Aurora").GetComponent("Animator");
	}else if(GameState.getCurLevel() == "Vulcan"){
		anim = GameObject.Find("Hestia").GetComponent("Animator");
	}

	playerControllerScript = GameObject.Find("Player").GetComponent("playerController");

	// Set Start Position
	if(GameState.getStartPos() == Vector3.zero){
		GameState.setStartPos(playerHolder.transform.position);
	}else{
		playerHolder.transform.position = GameState.getStartPos();
	}

	//setting powerup values to false
    inventory["shield"] = false;
    inventory["hourglass"] = false;
    inventory["bomb"] = false;
    inventory["potion"] = false;
    powerUpDescription.text = "Powerup inventory is empty!";

    numberOfLives = GameState.getTotalLives();
    setLives();

    fullHealth();

	numberOfGems = GameState.getTotalGems();
	setGems();

    powerUpContainer.color = emptyPowerUp;
}

function Update () {
	// Debug.Log(heartImage1.transform.position);

	if(Input.GetButton("Fire1")){
		powerUpDescription.text = "Powerup inventory is empty!";
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

	if(GameState.getCheck1()){
		checkpoint1.texture = fullCheckpoint;
	}else{
		checkpoint1.texture = emptyCheckpoint;
	}

	if(GameState.getCheck2()){
		checkpoint2.texture = fullCheckpoint;
	}else{
		checkpoint2.texture = emptyCheckpoint;
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
	        powerUpDescription.text = "Drink this potion to become invisible for 10 seconds";
	    }

	    else if(object == "bomb") {
	        powerUpImage.texture = bombTexture;
	        powerUpImage.color = fullPowerUp;
	        powerUpDescription.text = "Clear the way by bombing enemies who are close!";
	    }
	    else if(object == "shield") {
	        powerUpImage.texture = shieldTexture;
	        powerUpImage.color = fullPowerUp;
	        powerUpDescription.text = "Enable a shield that protects you from a hit!";
	    }
	    else if(object == "hourglass") {
	        powerUpImage.texture = hourglassTexture;
	        powerUpImage.color = fullPowerUp;
	        powerUpDescription.text = "Slow down your enemies so you have more time to dodge them!";
	    }
	        
	    // set inventory object to true
	    inventory[object] = true;
	    // Debug.Log("Adding " + object + " to inventory");
    }

}

private function clearInventory() {
    hasItem = false;
    powerUpContainer.color = emptyPowerUp;
	powerUpImage.color = clearPowerUp;
}

public function setGems() {
    livesText.text = numberOfGems + " / " + totalNumberOfGems;
    gemSlider.value = numberOfGems;
}

//increase gems by one, if at 50 add a life
public function pickUpGem() {

	GameState.newGem();
    numberOfGems = GameState.getTotalGems();
    
    if(numberOfGems == 50) {
        GameState.resetGems();
        numberOfGems = GameState.getTotalGems();
        addLife();
    }

    setGems();
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

public function setLives(){
	Debug.Log(GameState.getTotalLives());
	heartImage1.color = deadLifeColour;
    heartImage2.color = deadLifeColour;
    heartImage3.color = deadLifeColour;

    if(GameState.getTotalLives() >= 1){
    	heartImage1.color = aliveLifeColour;
    }

    if(GameState.getTotalLives() >= 2){
    	heartImage2.color = aliveLifeColour;
    }

    if(GameState.getTotalLives() >= 3){
    	heartImage3.color = aliveLifeColour;
    }
}

    // increase number of lives by one
    // change the colour of the heart image on the GUI based on number of lives
private function addLife() {
    if(numberOfLives < 4) {
    	if(numberOfLives ==3) {
    		// heartsContainer.position.x = initialHeartsPosition-50;
    		heartImage4.enabled = true;
    	}

        GameState.gainLife();
        numberOfLives = GameState.getTotalLives();

        setLives();
    }
}

    // if number of lives is 0, end game,
    // otherwise, update the GUI hearts to reflect number of lives
    // decrease number of lives
    // set slider value back to 100
private function removeLife() {
	playerControllerScript.setDead(true);

	GameState.loseLife();
	numberOfLives = GameState.getTotalLives();

	if(numberOfLives == 3) {
		heartImage4.enabled = false;
		// heartsContainer.position.x = initialHeartsPosition;
	}

	if(numberOfLives == 0) {
		Debug.Log('Dead');
    	heartImage1.color = deadLifeColour;
    	Debug.Log('About to Play Animation');
    	anim.Play("Die", -1, 0.0f);
    	Debug.Log('About to wait for a second');
    	yield WaitForSeconds(1);
    	Debug.Log('About to call gameOver');
        gameOver();
    }
    else{
		loseLifeOverlay.SetActive(true);
		invincible = true;
		yield WaitForSeconds(2);
		loseLifeOverlay.SetActive(false);
    	Application.LoadLevel(GameState.getCurLevel());
    }

}

private function gameOver() {
	Application.LoadLevel("Lose");
}

// Item Functions

private function shieldProtect(){
	if(!shieldActive) {
		var player : GameObject = Instantiate(Resources.Load("shieldBubble")) as GameObject;
		player.transform.parent = playerHolder.transform;
		player.transform.localPosition = new Vector3(0,1,0);
		invincible = true;
		shieldActive = true;
	}
}

public function shieldBreak(){
	shieldActive = false;
	invincible = false;
}

private function bombEnemies(){
	var defaultIntensity = directionalLight.intensity;
	directionalLight.intensity = 2;
	for(var i=0; i<5; i++) {
		yield;
	}
	directionalLight.intensity = 8;
	for(var j=0; j<8; j++) {
		yield;
	}
	
	directionalLight.intensity = defaultIntensity;

	//Debug.Log(directionalLight.intensity);	
	for(var flyEnemy : GameObject in GameObject.FindGameObjectsWithTag("flyEnemyCont")){
		if(flyEnemy.GetComponent(flyingEnemyController).distance >=-10 && flyEnemy.GetComponent(flyingEnemyController).distance <=50) {
			flyEnemy.GetComponent(flyingEnemyController).Die();
			var colChildren = flyEnemy.GetComponentsInChildren(Collider);
			for (var collider : Collider in colChildren) {  
			 	collider.enabled = false;
			}			
		}
    }

    for(var grdEnemy : GameObject in GameObject.FindGameObjectsWithTag("grdEnemyCont")){
    	if(grdEnemy.GetComponent(groundEnemyController).distance >=-10 && grdEnemy.GetComponent(groundEnemyController).distance <=50) {
			grdEnemy.GetComponent(groundEnemyController).Die();
		}
    }
}

private function hourglassActive(){
	//Debug.Log("Hourglass Active");
	focused = true;
	for(var flyEnemy : GameObject in GameObject.FindGameObjectsWithTag("flyEnemyCont")){
		if(flyEnemy.GetComponent(flyingEnemyController).distance >=-10 && flyEnemy.GetComponent(flyingEnemyController).distance <=30) {
        	flyEnemy.GetComponent(flyingEnemyController).slowDown();
        }
    }
	Invoke("hourglassEnd", 10);
}

public function hourglassEnd(){
	//Debug.Log("No More Hourglass");
	focused = false;
	for(var flyEnemy : GameObject in GameObject.FindGameObjectsWithTag("flyEnemyCont")){
        flyEnemy.GetComponent(flyingEnemyController).returnSpeed();
    }
}

private function potionAlpha(){
	//Debug.Log("Potion Alpha");
	invincible = true;
	focused = true;
	var diffuseShader : Shader;
	diffuseShader = Shader.Find("Unlit/Transparent");
	playerMeshRenderer.material.shader = diffuseShader;
	playerMeshRenderer.material.mainTexture = whiteTexture;
	Invoke("potionEnd", 10);
}

public function potionEnd(){
	//Debug.Log("No More Potion");
	invincible = false;
	focused = false;
	var diffuseShader : Shader;
	diffuseShader = Shader.Find("Unlit/Texture");
	playerMeshRenderer.material.shader = diffuseShader;
	playerMeshRenderer.material.mainTexture = regularTexture;
}

public function isInvincible(){
	return invincible;
}

public function isFocused(){
	return focused;
}

public function shieldOn(){
	return shieldActive;
}