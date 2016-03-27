#pragma strict


public var movieTexture : MovieTexture;




function Start () {
	GetComponent.<Renderer>().material.mainTexture = movieTexture;
	// renderer.material.mainTexture = movTexture;
	movieTexture.loop = true;
	movieTexture.Play();
}

function Update () {

}