<script>
import { navigate } from 'svelte-routing';
import { onMount, getContext } from 'svelte';
import { game } from '../stores/chat-stores';
import { themeChange } from 'theme-change';
import * as THREE from 'three';
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
  
  const canvas = document.querySelector('canvas.webgl')
  
  //lol it made me do this for some reason🤷🏽‍♂️
  canvas.style.position = 'absolute';
  
  // Scene
  const scene = new THREE.Scene()
  
  
  /**
   * Textures
   */
  const textureLoader = new THREE.TextureLoader()
  
  const matcapTexture = textureLoader.load('/textures/matcaps/1.png');
  const matcapTexture2 = textureLoader.load('/textures/matcaps/3.png');
  
  const fontLoader = new FontLoader();
  const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 });
  
  fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('Welcome to PictureThis :-)', {
          font,
          size: 0.3,
          height: 0.2,
          curveSegments: 5,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 4
      })
    
  
      textGeometry.center();
     
      const text = new THREE.Mesh(textGeometry, material);
     
      scene.add(text);
     
  })
  const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  for (let i = 0; i < 333; i++) {
      const torus = new THREE.Mesh(torusGeometry, donutMaterial);
      torus.position.x = (Math.random() - 0.5) * 10;
      torus.position.y = (Math.random() - 0.5) * 10;
      torus.position.z = (Math.random() - 0.5) * 10;
  
      torus.rotation.x = Math.random() * Math.PI
      torus.rotation.y = Math.random() * Math.PI
      const scaler = Math.random();
      torus.scale.x = scaler;
      torus.scale.y = scaler;
      torus.scale.z = scaler;
  
      scene.add(torus);
  };
  
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
    
    // Update camera
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
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  /**
   * Camera
   */
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
  camera.position.x = 1
  camera.position.y = 1
  camera.position.z = 2
  scene.add(camera)
  
  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  


  
  
  /**
   * Animation
   */
  const clock = new THREE.Clock()
  
  const tick = () => {
      const elapsedTime = clock.getElapsedTime()
  
      // Update controls
      controls.update()
      // Render
      renderer.render(scene, camera)
      torusGeometry.rotateX(0.02)
      torusGeometry.rotateY(0.02)

      if(camera.position.z < 4){
        camera.position.z += 0.01
      }
  
      window.requestAnimationFrame(tick)
  }
  tick()
    // 👆 false parameter is required for svelte
  });
 
</script>
  <div class="cursor-pointer" >
<canvas class="webgl"  ></canvas>
</div>
<div id="container" class="overflow-hidden"> 
  <div id="overlay">
    <div class="flex flex-col items-center justify-center font-logo gap-8" id="start">
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
