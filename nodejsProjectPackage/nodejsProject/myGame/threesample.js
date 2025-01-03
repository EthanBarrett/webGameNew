import * as THREE from "three";

import { OrbitControls } from 'https://unpkg.com/three@0.157.0/examples/jsm/controls/OrbitControls.js';

import {GLTFLoader} from "https://unpkg.com/three@0.169.0/examples/jsm/loaders/GLTFLoader.js";

import Stats from  'https://unpkg.com/three@0.169.0/examples/jsm/libs/stats.module.js';

let stats;

stats = new Stats();
document.body.appendChild( stats.dom );


let controls; //declare control parameter

//animation mixer
let mixer;

//add control variables
let upstate = false; //button left
let downstate = false; //button stop
let right = false; //button right
let changed = false; //colour change

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 10000 );
//change camera position
camera.position.z = 80;
camera.position.y = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );



//head
const geometry = new THREE.ConeGeometry( 5, 15, 32 ); 
const material = new THREE.MeshBasicMaterial( { color: 0x00FFFF } ); 
const Head = new THREE.Mesh( geometry, material ); 
Head.position.y = 3;
Head.position.z = -13;
Head.rotation.x = 11;
//body
const geometry1 = new THREE.CapsuleGeometry( 6, 5, 16, 32 ); 
const material1 = new THREE.MeshBasicMaterial( {color: 0x0ff000} ); 
const Body = new THREE.Mesh( geometry1, material1 );
Body.position.y = 3;
Body.rotation.x = 11;
//rightarm
const geometry2 = new THREE.BoxGeometry( 5, 7, 4 ); 
const material2 = new THREE.MeshBasicMaterial( {color: 0x00fff0} ); 
const RightArm = new THREE.Mesh( geometry2, material2 ); 
RightArm.position.x = 7;
RightArm.position.y = 3;
RightArm.rotation.z = 0.5;
//leftarm
const geometry3 = new THREE.BoxGeometry( 5, 7, 4 ); 
const material3 = new THREE.MeshBasicMaterial( {color: 0x00fff0} ); 
const LeftArm = new THREE.Mesh( geometry3, material3 ); 
LeftArm.position.x = -7;
LeftArm.position.y = 3;
LeftArm.rotation.z = -0.5;
//Legs
const geometry4 = new THREE.ConeGeometry( 6, 15, 32 ); 
const material4 = new THREE.MeshBasicMaterial( {color: 0x0ff000} );
const Legs = new THREE.Mesh(geometry4, material4 ); 
Legs.rotation.x = 11;
Legs.position.y = 3;
Legs.position.z = -2;


//add to scene
scene.add( Legs );
scene.add(LeftArm);
scene.add( RightArm );
scene.add( Body );
scene.add( Head );


//group togethere
let group = new THREE.Group();
group.add(Head);
group.add(Body);
group.add(RightArm);
group.add(LeftArm);
group.add(Legs);
scene.add(group);

group.position.y -= 4;




//floor
const geometry6 = new THREE.PlaneGeometry( 200, 500 );
const material6 = new THREE.MeshBasicMaterial( {color: 336699, side: THREE.DoubleSide} );
const floor = new THREE.Mesh( geometry6, material6 );
floor.rotation.x = 1.6;
floor.position.y = -16;
scene.add( floor );


//enemy projectile to avoid
const geometry10 = new THREE.SphereGeometry( 15, 32, 16 ); 
const material10 = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const bullet = new THREE.Mesh( geometry10, material10 );
 scene.add( bullet );
 bullet.position.z = -150;
 bullet.position.y = 10;

 
//////////////////////////////////////////////////////////////////////////////////////////////////////
//create many random objects
const createManyObjs=()=>
{
	const geometry = new THREE.SphereGeometry();
	const objects = [];
	for (let i = 0; i < 8; i++)
	{
		const material2 = new THREE.MeshPhongMaterial({color:0x2eabef});

const object = new THREE.Mesh(geometry, material2 );
//random position
object.position.x = Math.random() * 200 - 100;
object.position.y = Math.random() * 20;
object.position.z = Math.random() *-180 -230;
//random scale
object.scale.x = Math.random() + 50 - 40;
object.scale.y = Math.random() + 20 - 10;
object.scale.z = Math.random() + 20;

object.material.color.setHex(Math.random() * 0xffffff);
scene.add(object);

	objects.push(object);
	}
	return objects;
}
//move objects 
const animateObjects = (objects) => {
	requestAnimationFrame(() => animateObjects(objects)); // Continuously animate
	
	objects.forEach((object) => {
	  // movment for objects
	  object.position.z += 0.5; 

	  if(object.position.z >= 300)
	  {
		object.position.z = Math.random() *-200 -250;
		object.position.x =  Math.random() * 180 - 230;
		object.scale.z = Math.random() + 20;
	  }
	  
	});
  };

const objects = createManyObjs();
animateObjects(objects);

/////////////////////////////////////////////////////////////////////////////////////////////////
const createManyObjs2=()=>
	{
		const geometry = new THREE.SphereGeometry();
		const objects2 = [];
		for (let i = 0; i < 8; i++)
		{
			const material = new THREE.MeshPhongMaterial({color:0x2eabef});
	
	const object2 = new THREE.Mesh(geometry, material );
	//random position
	object2.position.x = Math.random() * 200 - 100;
	object2.position.y = Math.random() * 20;
	object2.position.z = Math.random() *-400 -450;
	//random scale
	object2.scale.x = Math.random() + 50 - 40;
	object2.scale.y = Math.random() + 20 - 10;
	object2.scale.z = Math.random() + 20;
	
	object2.material.color.setHex(Math.random() * 0xffffff);
	scene.add(object2);
	
		objects2.push(object2);
		}
		return objects2;
	}
	//move objects 
	const animateObjects2 = (objects) => {
		requestAnimationFrame(() => animateObjects2(objects2)); // Continuously animate
		
		objects2.forEach((object2) => {
		  // movment for objects
		  object2.position.z += 0.5; 
	
		  if(object2.position.z >= 300)
		  {
			object2.position.z = Math.random() *-350 -300;
			object2.position.x =  Math.random() * 200 - 100;
			object2.scale.z = Math.random() + 20;
		  }
		  
		});
	  };
	
	const objects2 = createManyObjs2();
	animateObjects2(objects2);

//////////////////////////////////////////////////////////////////////////////////////////////////

// create sphere of points
const pointgeometry = new THREE.SphereGeometry(200,800,4);

const newmaterial = new THREE.PointsMaterial({color:'blue', size:5});
let pointobj = new THREE.Points(pointgeometry, newmaterial);
scene.add(pointobj);
pointobj.position.y = -50;
pointobj.rotation.x = 20.9;
//create scecond bigger sphere around the first
//let mesh2 = pointobj.clone();
//mesh2.scale.set(2,2,2);
//scene.add(mesh2);



//////////////////////////////////////////////////////////////////////////////////////////////////////



const addPlane = (x,y,w,h, materialaspect) => {
   
    //add a plan
const geometry7 = new THREE.PlaneGeometry(w,h,2);
const material7 = new THREE.MeshLambertMaterial( materialaspect);

const plane = new THREE.Mesh( geometry7, material7 );

plane.position.x = x;
plane.position.y = -15;
plane.position.x = -Math.PI/2;
plane.rotation.x = 1.6;
scene.add(plane);

}
//texture of plane
const texture = new THREE.TextureLoader().load("resources/img/goldpattern.png");
const materialAspectfloor = {
	map:texture,
	side: THREE.DoubleSide,
	transparent:true
}
addPlane(0, -3.6, 160, 160, materialAspectfloor);

////////////////////////////////////////////////////////////////////////////////////////////////////


// a function that will be called every time the window gets resized.
// It can get called a lot, so don't put any heavy computation in here!
const onWindowResize = () => {
 
    // set the aspect ratio to match the new browser window aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
 
    // update the camera's frustum
    camera.updateProjectionMatrix();
 
    // update the size of the renderer AND the canvas
    renderer.setSize(window.innerWidth, window.innerHeight);
 
}
 
window.addEventListener('resize', onWindowResize);
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//skybox function

const createskybox = ()=>{
	let bgMesh;
	const loader = new THREE.TextureLoader();
	loader.load("resources/img/galaxy.jpg", function(texture){
		const sphereGeometry = new THREE.SphereGeometry(1000, 60, 40);
		const sphereMaterial = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide
		})

		bgMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
		scene.add(bgMesh);

	})
	
}

createskybox();
///////////////////////////////////////////////////////////////////////////////////////////////////

const createControls =()=>{
	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

}

createControls();
//////////////////////////////////////////////////////////////////////////////////////////////////////

//button set up
const moveup = ()=>
{
	upstate = true;
	downstate = false;
	right = true;
}

const movedown = ()=>
	{
		upstate = false;
		downstate = true;
		right = false;
	}

const moveright = ()=>
{
	right = true;
	upstate = false;
	downstate = false;
}

document.getElementById("upbutton").addEventListener("click", moveup);
document.getElementById("downbutton").addEventListener("click", movedown);
document.getElementById("rightbutton").addEventListener("click", moveright);


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//animate
function animate() {
	//requestAnimationFrame (animate);
	stats.update(); // update stats

	pointobj.rotation.y += 0.01;
	

	Head.rotation.y += 0.05;
	
	bullet.position.z += 1;
	bullet.rotation.y += 0.5;

	if(bullet.position.z >= 200) 
		{
			bullet.position.x = Math.random() * 200 - 100;
		   bullet.position.z = -200;
		}


		 
	if(upstate)
	{
		group.position.x -= 0.6;
		camera.position.x -= 0.6;
		
	} 
	
	else if(right)
		{
			group.position.x += 0.6;
			camera.position.x += 0.6;
		} 


	if (downstate)
	{
		group.position.y -= 0;
		camera.position.y -= 0;
	}

	
	
	if (group.position.x < -80)
	{
		
		upstate = false;
		right = false;
	}

	if (group.position.x > 80)
	{
		
		upstate = false;
		right = false;
	}

	renderer.render( scene, camera );

}