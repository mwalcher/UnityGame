#pragma strict

import UnityEngine.SceneManagement;
import UnityEngine.EventSystems;
//using UnityEngine.SceneManagement;


private var myCamera : Camera;
private var originalCameraPosition : Quaternion;
private var targetChar : Transform;

private var zoomSpeed : float = 1f;
private var pushRight : int = 0;
private var targetFOV : int = 60;
private var speed : int = 5;

private var shouldZoom = false;
private var shouldReturnToOrigin = false;
public static var activeSection : String;

public var terraCanvas : Canvas;
public var polarisCanvas : Canvas;
public var vulcanCanvas : Canvas;

public var terraButton : UnityEngine.UI.Button;

public var terraRing : Graphic;
public var polarisRing : Graphic;
public var vulcanRing : Graphic;

public var heartImage1 : UnityEngine.UI.RawImage;
public var heartImage2 : UnityEngine.UI.RawImage;
public var heartImage3 : UnityEngine.UI.RawImage;

private var deadLifeColour = new Color(83f/255, 83f/255, 83f/255, 1);
private var aliveLifeColour = new Color(255, 255, 255, 1);
// public var fadePanel : Graphic;


function Start () {
    myCamera = GetComponent.<Camera>().main;
    originalCameraPosition = myCamera.transform.rotation;

    activeSection = null;

    terraCanvas.enabled = false;
    polarisCanvas.enabled = false;
    vulcanCanvas.enabled = false;

    terraRing.enabled = false;
    polarisRing.enabled = false;
    vulcanRing.enabled = false;
    // fadePanel.CrossFadeAlpha(0.0f,0.0f,true);

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

function Update () {

	if(GameState.getTerraRing()){
		terraRing.enabled = true;
	}

	if(GameState.getPolarisRing()){
		polarisRing.enabled = true;
	}

	if(GameState.getVulcanRing()){
		vulcanRing.enabled = true;
	}

    if(shouldZoom) {
        var targetRotation = Quaternion.LookRotation((targetChar.transform.position - myCamera.transform.position) + Vector3.up*12 + Vector3.right*pushRight);
        myCamera.transform.rotation = Quaternion.Slerp(myCamera.transform.rotation, targetRotation, speed * Time.deltaTime);
        
        if(myCamera.fieldOfView > targetFOV) {
            myCamera.fieldOfView = myCamera.fieldOfView - zoomSpeed;
        }
    }

    if(shouldReturnToOrigin) {
        myCamera.transform.rotation = Quaternion.Slerp(myCamera.transform.rotation, originalCameraPosition, speed * Time.deltaTime);
        
        if(myCamera.fieldOfView < 60) {
            myCamera.fieldOfView = myCamera.fieldOfView + zoomSpeed;
        }
    }

    if(Input.GetMouseButtonDown(1)) {
        returnMain();
    }

    if( Input.GetMouseButtonDown(0)) {
    	selectCharacter();
     }

 }

public function returnMain() {
	//Debug.Log("Cancel");
	shouldReturnToOrigin = true;
    shouldZoom = false;
    terraCanvas.enabled = false;
    polarisCanvas.enabled = false;
    vulcanCanvas.enabled = false;
    activeSection = null;
}

public function selectCharacter() {
	//Debug.Log("Submit");
	//Debug.Log(EventSystem.current.currentSelectedGameObject.name);
	var ray: Ray = myCamera.ScreenPointToRay(Input.mousePosition);
        var hit : RaycastHit;
         
         if( Physics.Raycast( ray, hit, 100 ) ) {
            
            if (hit.transform.gameObject.name=="Hestia" && !GameState.getVulcanRing()) {
                pushRight = 10;
                targetFOV = 30;
                shouldZoom = true;
                shouldReturnToOrigin = false;
                targetChar = hit.transform;
                vulcanCanvas.enabled = true;
                activeSection = "Hestia";
            }

            if (hit.transform.gameObject.name=="Aurora" && !GameState.getPolarisRing()) {
                pushRight = -5;
                targetFOV = 20;
                shouldZoom = true;
                shouldReturnToOrigin = false;
                targetChar = hit.transform;
                polarisCanvas.enabled = true;
                activeSection = "Aurora";
            }

            if (hit.transform.gameObject.name=="Flora" && !GameState.getTerraRing()) {
                pushRight = -10;
                targetFOV = 30;
                shouldZoom = true;
                shouldReturnToOrigin = false;
                targetChar = hit.transform;
                terraCanvas.enabled = true;
                activeSection = "Flora";
                //Debug.Log(hit);
            }
             //Debug.Log( hit.transform.gameObject.name );
         }else if(EventSystem.current.currentSelectedGameObject.name == "Flora"){
         		pushRight = -10;
                targetFOV = 30;
                shouldZoom = true;
                shouldReturnToOrigin = false;
                targetChar = EventSystem.current.currentSelectedGameObject.transform;
                terraCanvas.enabled = true;
                terraButton.Select();
                //EventSystem.SetSelectedGameObject(terraButton);
                activeSection = "Flora";
         		//Debug.Log(EventSystem.current.currentSelectedGameObject.transform);
         }
}

public function loadLevel(levelName : String) {
    GameState.curLevel(levelName);
    //Application.LoadLevel(levelName);
    SceneManager.LoadScene(levelName);
}

public static function isActive() {
    return activeSection;
}