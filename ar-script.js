import * as THREE from 'https://unpkg.com/three@0.172.0/build/three.module.js';
import { ARButton } from 'https://unpkg.com/three@0.172.0/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.172.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, avatar, controller, reticle, hitTestSource = null;
let hitTestSourceRequested = false;
let mixer; // For animations

async function initAR() {
    if (!navigator.xr) {
        alert("WebXR is not available. Returning to standard portfolio.");
        window.location.href = 'index.html';
        return;
    }

    try {
        const isARSupported = await navigator.xr.isSessionSupported('immersive-ar');
        if (!isARSupported) {
            alert("AR is not supported. Returning to standard portfolio.");
            window.location.href = 'index.html';
            return;
        }

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true, 
            powerPreference: "high-performance"
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.xr.enabled = true;
        document.body.appendChild(renderer.domElement);

        // AR Button
        document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

        // Load 3D Model
        const loader = new GLTFLoader();
        loader.load(
            'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models/2.0/AnimatedCube/glTF/AnimatedCube.gltf',
            (gltf) => {
                avatar = gltf.scene;
                avatar.scale.set(0.5, 0.5, 0.5); // Adjust size
                avatar.visible = false; // Hidden until placed
                scene.add(avatar);

                // Animation setup
                mixer = new THREE.AnimationMixer(avatar);
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
            },
            undefined,
            (error) => console.error('Error loading model:', error)
        );

        // Reticle
        reticle = new THREE.Mesh(
            new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
            new THREE.MeshBasicMaterial({ color: 0x00d4ff })
        );
        reticle.matrixAutoUpdate = false;
        reticle.visible = false;
        scene.add(reticle);

        // Controller for placement
        controller = renderer.xr.getController(0);
        controller.addEventListener('select', onSelect);
        scene.add(controller);

        // Animation loop
        renderer.setAnimationLoop(render);

        document.getElementById("speakButton").style.display = "block";
    } catch (error) {
        console.error("AR setup error:", error);
        alert("Failed to start AR: " + error.message);
        window.location.href = 'index.html';
    }
}

function onSelect() {
    if (reticle.visible && avatar && !avatar.visible) {
        avatar.position.setFromMatrixPosition(reticle.matrix);
        avatar.visible = true;
        reticle.visible = false;
    }
}

function render(timestamp, frame) {
    if (frame) {
        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        if (hitTestSourceRequested === false && session) {
            session.requestReferenceSpace('viewer').then((referenceSpace) => {
                session.requestHitTestSource({ space: referenceSpace }).then((source) => {
                    hitTestSource = source;
                });
            });
            hitTestSourceRequested = true;
        }

        if (hitTestSource && avatar && !avatar.visible) {
            const hitTestResults = frame.getHitTestResults(hitTestSource);
            if (hitTestResults.length) {
                const hit = hitTestResults[0];
                const pose = hit.getPose(referenceSpace);
                reticle.visible = true;
                reticle.matrix.fromArray(pose.transform.matrix);
            } else {
                reticle.visible = false;
            }
        }

        // Update animations
        if (mixer) {
            const delta = (timestamp - (render.lastTimestamp || timestamp)) / 1000;
            mixer.update(delta);
        }
        render.lastTimestamp = timestamp;
    }
    renderer.render(scene, camera);
}

const chatResponses = {
    "hi": "Hello! I'm Moses' AR avatar.",
    "who are you": "I'm Imoleayo Moses in AR form!",
    "skills": "I specialize in React Native, Node.js, Rust, and full-stack dev.",
    "projects": "Check out Pikia Market, MTN NG Automation, and more!",
    "contact": "Reach me at im.imoleayomoses@gmail.com."
};

function getChatResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    return chatResponses[lowerMsg] || "I don’t understand that.";
}

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

recognition.onresult = (event) => {
    const userInput = event.results[0][0].transcript;
    const reply = getChatResponse(userInput);
    speak(reply);
};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", error);
};

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

document.getElementById("startAR").addEventListener("click", initAR);
document.getElementById("speakButton").addEventListener("click", () => {
    recognition.start();
});

window.addEventListener("resize", () => {
    if (renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});