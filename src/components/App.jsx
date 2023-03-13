import { useRef, useEffect } from "react";
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const App = () => {

  const mountRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.01, 1000);
    scene.add(camera);
    camera.position.z = 6;
    camera.position.x = 6;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x0f2c64 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    camera.lookAt(cube.position)

    const animate = () => {
      controls.update();
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate();

    renderer.render(scene, camera)
    return () => {
      currentRef.removeChild(renderer.domElement);
    }
  }, []);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100vh' }}></div>
  )
};

export default App;
