#pragma strict

// import UnityEngine.SceneManagement;
// using UnityEngine.SceneManagement;


private var myCamera : Camera;
private var originalCameraPosition : Quaternion;
private var targetChar : Transform;

private var zoomSpeed : float = 1f;
private var pushRight : int = 0;
private var targetFOV : int = 60;
private var speed : int = 5;

private var shouldZoom = false;
private var shouldReturnToOrigin = false;

public var terraCanvas : Canvas;
public var polarisCanvas : Canvas;
public var vulcanCanvas : Canvas;

public var terraRing : Graphic;
public var polarisRing : Graphic;
public var vulcanRing : Graphic;
// public var fadePanel : Graphic;


public function loadLevel(levelName : String) {
    // SceneManager.LoadScene(levelName);
    Application.LoadLevel(levelName);
}


function Start () {
    myCamera = GetComponent.<Camera>().main;

    originalCameraPosition = myCamera.transform.rotation;
    terraCanvas.enabled = false;
    polarisCanvas.enabled = false;
    vulcanCanvas.enabled = false;
    // fadePanel.CrossFadeAlpha(0.0f,0.0f,true);

    
}

function Update () {


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
        shouldReturnToOrigin = true;
        shouldZoom = false;
        terraCanvas.enabled = false;
        polarisCanvas.enabled = false;
        vulcanCanvas.enabled = false;

    //fade out
  //        var graphics2 : Graphic[] = fadePanel.GetComponentsInChildren.<Graphic>();
        // for (var graphic2: Graphic in graphics2) {
    //      graphic2.CrossFadeAlpha(1f,0.5f,true);
        // }        

    }

    if( Input.GetMouseButtonDown(0) ) {
        
        var ray: Ray = myCamera.ScreenPointToRay(Input.mousePosition);
        var hit : RaycastHit;
         
         if( Physics.Raycast( ray, hit, 100 ) ) {
            
            if (hit.transform.gameObject.name=="Succubus-Red") {
                pushRight = 10;
                targetFOV = 30;
                shouldZoom = true;
                shouldReturnToOrigin = false;
                targetChar = hit.transform;
                vulcanCanvas.enabled = true;
            }

            if (hit.transform.gameObject.name=="Succubus-Green") {
                pushRight = -5;
                shouldZoom = true;
                targetFOV = 20;
                shouldReturnToOrigin = false;
                targetChar = hit.transform;
                polarisCanvas.enabled = true;

                // fade in
       //           var graphics : Graphic[] = fadePanel.GetComponentsInChildren.<Graphic>();
                // for (var i: Graphic in graphics) {
    //                  i.CrossFadeAlpha(150f,0.5f,true);
                // }

                // fadePanel.CrossFadeAlpha(150f,1.0f,true);
            }

            if (hit.transform.gameObject.name=="Succubus-Purple") {
                pushRight = -10;
                targetFOV = 30;
                shouldZoom = true;
                shouldReturnToOrigin = false;
                targetChar = hit.transform;
                terraCanvas.enabled = true;
            }
             Debug.Log( hit.transform.gameObject.name );
         }
     }

 }