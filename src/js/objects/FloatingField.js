import * as THREE from 'three';

export default class FloatingField {
    constructor() {
        this.count = 2000;
        this.dummy = new THREE.Object3D();

        // Geometries: Mixed shapes for visual interest
        const geometries = [
            new THREE.SphereGeometry(0.2, 8, 8),
            new THREE.TetrahedronGeometry(0.2),
            new THREE.BoxGeometry(0.2, 0.2, 0.2)
        ];

        // Material: Physical material for reaction to light
        const material = new THREE.MeshPhysicalMaterial({
            roughness: 0.2,
            metalness: 0.1,
            transmission: 0.6,
            thickness: 0.5,
            transparent: true,
            opacity: 0.8
        });

        // Create 3 InstancedMeshes
        this.meshes = geometries.map(geo => new THREE.InstancedMesh(geo, material, Math.floor(this.count / 3)));

        this.meshes.forEach(mesh => {
            mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        });

        const colors = [
            new THREE.Color(0xffd900), // Cyber Yellow
            new THREE.Color(0xea02e2), // Neon Magenta
            new THREE.Color(0x0073ff)  // Electric Blue
        ];

        // Initialize positions
        this.meshes.forEach(mesh => {
            const count = mesh.count;
            for (let i = 0; i < count; i++) {
                const x = (Math.random() - 0.5) * 100;
                const y = (Math.random() - 0.5) * 100;
                const z = (Math.random() - 0.5) * 60;

                this.dummy.position.set(x, y, z);
                this.dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

                // Varied scale
                const scale = Math.random() * 0.5 + 0.3;
                this.dummy.scale.set(scale, scale, scale);
                this.dummy.updateMatrix();

                mesh.setMatrixAt(i, this.dummy.matrix);
                mesh.setColorAt(i, colors[Math.floor(Math.random() * colors.length)]);
            }
            mesh.instanceMatrix.needsUpdate = true;
            mesh.instanceColor.needsUpdate = true;
        });
    }

    get mesh() {
        const group = new THREE.Group();
        this.meshes.forEach(m => group.add(m));
        return group;
    }

    update(time, delta, raycaster) {
        // Cinematic Drift
        this.meshes.forEach((mesh, index) => {
            const speed = 0.05 + (index * 0.01);
            mesh.rotation.y = time * speed;
            mesh.rotation.z = time * (speed * 0.5);
        });

        if (raycaster) {
            // Interaction placeholder
        }
    }
}
