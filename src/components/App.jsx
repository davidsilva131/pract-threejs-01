import { useRef, useEffect } from "react";
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const App = () => {

  const mountRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(255, 255, 255);
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.01, 1000);
    scene.add(camera);
    camera.position.y = 6;
    camera.position.z = 6;
    camera.position.x = 6;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true
    //  const geometry = new THREE.BoxGeometry(1, 1, 1)
    //  const material = new THREE.MeshBasicMaterial({ color: 0x0f2c64 })
    //  const cube = new THREE.Mesh(geometry, material) 
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/public/draco/')
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader)
    gltfLoader.load('/public/models/camisa_01.gltf',
      (gltf) => {
        scene.add(gltf.scene)
      }
    )
    const pointlight = new THREE.PointLight(0xffffff, 1);
    pointlight.position.set(6, 6, 6)
    scene.add(pointlight)

    //scene.add(cube)
    //camera.lookAt(cube.position)

    const clock = new THREE.Clock()
    const animate = () => {
      //const elapsedTime = clock.getElapsedTime()
      //cube.rotation.y = elapsedTime;
      //cube.rotation.x = elapsedTime;
      //cube.position.y = Math.sin(elapsedTime)

      controls.update();
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    const resize = () => {
      const updateWidth = currentRef.clientWidth;
      const updateHeight = currentRef.clientHeight;
      renderer.setSize(updateWidth, updateHeight)
      camera.aspect = updateWidth / updateHeight;
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', resize)
    animate();

    renderer.render(scene, camera)
    return () => {
      currentRef.removeChild(renderer.domElement);
      window.removeEventListener('resize', resize)
    }
  }, []);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100vh' }}></div>
  )
};

export default App;
