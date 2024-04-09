import './styles/App.scss';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

let car: THREE.Object3D<THREE.Object3DEventMap>;

const loader = new GLTFLoader();

loader.load(
    'corvetteanimuncomp.glb',
    function (gltf) {
        car = gltf.scene;
        if (car) {
            car.position.set(0, -1, 0);
            car.scale.set(2, 2, 2);
            scene.add(car);
        }
        console.log('Car added successfully.');
    },
    undefined,
    function (error) {
        console.error('Error loading the model:', error);
    }
);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

controls.enableDamping = true;
controls.dampingFactor = 1;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

addEventListener("resize", () => {
});

onresize = () => {
    // Update the renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Update the camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};