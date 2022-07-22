<script>
import { navigate } from 'svelte-routing';
import { onMount, getContext } from 'svelte';
import { game } from '../stores/chat-stores';
import { themeChange } from 'theme-change';
import * as THREE from 'three';
//import * as lil from 'lil-gui';
import { OrbitControls } from '../../public/OrbitControls';
import { FontLoader } from '../../public/FontLoader';
import { TextGeometry } from '../../public/TextGeometry';


/////////////////////////////////////////////////////////////////////////////////////
  const { Socket } = getContext('connect');
  const socket = Socket();
  let room = '';

  function enterIfYouDare() {
    if (room === '') return;
    sessionStorage.setItem('socketid', socket.id);
    socket.emit('room', room);
    game.set(room);
    return navigate(`/waitingRoom`, { replace: true });
  }
  onMount(() => {
    themeChange(false);
  //const gui = new lil.GUI();

  const canvas = document.querySelector('canvas.webgl')
  
  //lol it made me do this for some reason🤷🏽‍♂️
  canvas.style.position = 'absolute';
  
  // Scene
  const scene = new THREE.Scene()

/**
 * Lights
 */
  const pointLight = new THREE.PointLight( 0xff0000, 10, 1000 );
  pointLight.position.set( 0.5, 2.2, 1 );
  pointLight.decay = 2;
  pointLight.distance = 1.5;
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.camera.near = 1;
  scene.add( pointLight );

  const pointLightHelper = new THREE.CameraHelper(pointLight.shadow.camera);
  scene.add(pointLightHelper)


  const light = new THREE.AmbientLight( 0x0000ff, 0.2 ); // soft white light
  //gui.add(light, 'intensity').min(0).max(1).step(0.001)
  scene.add( light );

 
  const spotLight = new THREE.SpotLight(0xffffff);
  //gui.add(spotLight, 'intensity').min(0).max(10).step(0.001);
  spotLight.penumbra = 0.1;
	spotLight.decay = 2;
  spotLight.distance = 200;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.fov = 30;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 2.5;
  spotLight.shadow.camera.fov = 30;
  spotLight.position.set(2, 4, 1);
  scene.add(spotLight);
  scene.add(spotLight.target);
  
  const fog = new THREE.Fog('#262837', 0.001, 6);
  scene.fog = fog
  
  /**
   * Texture
   */
  
  
  const fontLoader = new FontLoader();
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  fontLoader.load('/fonts/Courier_New_Bold_Italic.json', (font) => {
      const textGeometry = new TextGeometry('PictureThis!', {
          font,
          size: 0.3,
          height: 0.2,
          curveSegments: 5,
          bevelEnabled: true,
          bevelThickness: 0.01,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 2
      })
    
  
      textGeometry.center();
     
      const text = new THREE.Mesh(textGeometry, material);
      text.castShadow = true;
      text.receiveShadow = false;
      text.position.y = 2; 
      scene.add(text);
      });

  const planeGeometry = new THREE.PlaneGeometry( 50,50 );
  const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xaaaaaa } )
  const plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.receiveShadow = true;
  plane.rotation.x = - Math.PI * 0.5
  plane.position.y = 1.8;
  scene.add( plane );
  
 
  /**
   * Raycaster
   */
  const raycaster = new THREE.Raycaster(); 

  /**
   * Responsive Canvas
   */
  const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
  }
  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
   
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
  
  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
      canvas: canvas
  })
  renderer.setClearColor('#262837')
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true;

  /**
   * Mouse/Cursor 
   */
  const mouse = new THREE.Vector2();

   window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX / sizes.width * 2 - 1;
    mouse.y = - (e.clientY / sizes.height) * 2 + 1;
    //console.log(intersects[0].point);
  });

  window.addEventListener('touchmove', (e) => {
    mouse.x = e.clientX / sizes.width * 2 - 1;
    mouse.y = - (e.clientY / sizes.height) * 2 + 1;
  });
  let sphere;
  window.addEventListener('mousedown', () => {
    const sphereGeometry = new THREE.SphereGeometry(0.05, 30, 30);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      metalness: -0.5,
      roughness: 0
    })
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.copy(intersects[0].point)
    sphere.position.y += 0.01;
    scene.add(sphere);
   })
  /**
   * Camera
   */
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
  camera.rotateX(-0.5);
  camera.position.x = 0;
  camera.position.y = 2
  camera.position.z = 1
  scene.add(camera)
  
  // Controls

  //const controls = new OrbitControls(camera, canvas);
  //controls.enableDamping = true;
 if(window.innerWidth < 500) {
    scene.fog.far = 7;
  } 
   
  
  
  /**
   * Animation
   */
  const clock = new THREE.Clock()
  let intersects;
  let t = 0;
  const tick = () => {
      const elapsedTime = clock.getElapsedTime();
  
      // Update controls
      // Render
      renderer.render(scene, camera)
      if(window.innerWidth < 500){
        //controls.update()
      t += 0.01;
      spotLight.position.x = Math.sin(t) * Math.PI;
      spotLight.position.z = Math.sin(t) * Math.PI;
     if(camera.position.z < 6 && camera.position.z > 4){
        camera.position.z += 0.01;
      } 
      }
      if(camera.position.z < 4){
        camera.position.z += 0.01
      }
    if(window.innerWidth > 500){
      spotLight.position.x = mouse.x;
      spotLight.position.z = mouse.y;
    }
      raycaster.setFromCamera(mouse, camera);
      intersects = raycaster.intersectObjects(scene.children);
    if(sphere){
      sphere.position.y += 0.003;
    } 
 //   const pointLightAngle = elapsedTime * 0.5
    pointLight.position.x = Math.sin(elapsedTime * -0.5)
    pointLight.position.z = Math.cos(elapsedTime * -0.5)
    //pointLight.position.x = Math.cos(pointLightAngle) * 0.5;
    //pointLight.position.y = Math.sin(elapsedTime) * 0.2
    // for (let index = 0; index < intersects.length; index++) {
    // intersects[index].object.material.color.set(0xf2255); 
   // } 

      window.requestAnimationFrame(tick)
  }
  tick()
    // 👆 false parameter is required for svelte
  });
 
</script>
  <div class="cursor-pointer" >
<canvas class="webgl"></canvas>
</div>
<div id="container" class="overflow-hidden"> 
  <div id="overlay">
    <div class="flex flex-col items-center justify-center font-logo gap-8 mt-64" id="start">
      <input
        class="input input-ghost input-lg text-2xl "
        type="text"
        name=""
        id=""
        bind:value={room}
        placeholder="enter room name here..."
      />
      <button class="btn btn-outline text-2xl" on:click={enterIfYouDare}>Join or create game</button
      >
             <input
        type="checkbox"
        class="toggle mt-1"
        data-toggle-theme="emerald,dracula"
        data-act-class="ACTIVECLASS"
      />🌚/🌞

    </div>
  </div>
</div>
