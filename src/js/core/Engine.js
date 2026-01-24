import * as THREE from 'three';

export default class Engine {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050505);
        // Mild fog for depth
        this.scene.fog = new THREE.FogExp2(0x050505, 0.002);

        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.camera.position.z = 30;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.objects = [];
        this.clock = new THREE.Clock();

        // Interaction
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(9999, 9999); // Start off-screen

        this.initLights();
        this.bindEvents();
        this.start();
    }

    initLights() {
        // Ambient light
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambient);

        // Subtle point lights for dimensionality
        const p1 = new THREE.PointLight(0x0073ff, 2, 50);
        p1.position.set(10, 10, 10);
        this.scene.add(p1);
    }

    add(object) {
        // Support both direct Mesh/Group passing or Objects with a .mesh property
        const threeObject = object.mesh || object;
        this.scene.add(threeObject);
        // If it has an update method, register it for the loop
        if (object.update) this.objects.push(object);
    }

    bindEvents() {
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onMouseMove(event) {
        // Normalize mouse coordinates to -1 to 1
        this.mouse.x = (event.clientX / this.width) * 2 - 1;
        this.mouse.y = -(event.clientY / this.height) * 2 + 1;
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
    }

    update() {
        const time = this.clock.getElapsedTime();
        const delta = this.clock.getDelta();

        // Update Raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Update all registered objects
        this.objects.forEach(obj => {
            if (obj.update) obj.update(time, delta, this.raycaster);
        });

        this.renderer.render(this.scene, this.camera);
        this.rafId = requestAnimationFrame(this.update.bind(this));
    }

    start() {
        this.update();
    }

    dispose() {
        cancelAnimationFrame(this.rafId);
        window.removeEventListener('resize', this.onResize);
        this.renderer.dispose();
    }
}
