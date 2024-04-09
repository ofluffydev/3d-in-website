import './styles/App.scss';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const loader = new GLTFLoader();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

let car: THREE.Group | null = null;

loader.load(
    'Carro5.glb',
    function (gltf: { scene: THREE.Group<THREE.Object3DEventMap> | null; }) {
        car = gltf.scene;
        if (car) {
            car.position.set(0, -2, 0);
            scene.add(car);
        }
        console.log('Car added successfully.');
    },
    undefined,
    function (error: unknown) {
        console.error('Error loading the model:', error);
    }
);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    if (car) {
        car.rotation.y += 0.01; // Adjust the rotation speed as needed
    }

    renderer.render(scene, camera);
}

animate();

addEventListener("resize", () => {});

onresize = () => {
    location.reload();
};


export default function App() {
    return <></>;
}