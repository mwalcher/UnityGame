#pragma strict


private var dolosAnim : Animator;


function Start () {

	dolosAnim = GameObject.Find('Dolos').GetComponent('Animator');

	dolosAnim.SetBool("WinBool", true);
}

function Update () {


}