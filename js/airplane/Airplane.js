var Airplane = function (scene, x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z;

    this.velocity = new THREE.Vector3(0, 100, 0);

    this.toCameraVector = new THREE.Vector3(0, -500, 200);

    this.groupMesh = new THREE.Group();

    this.updatePosition = function (deltaPosition) {
        for (child of this.groupMesh.children) {
            for (vertex of child.geometry.vertices) {
                vertex.x += deltaPosition.x;
                vertex.y += deltaPosition.y;
                vertex.z += deltaPosition.z;
            }
            child.geometry.verticesNeedUpdate = true;
        }
    }

    this.generateMaterial = function () {
        var color = "blue";
        this.material = new THREE.MeshStandardMaterial();
        this.material.color = new THREE.Color(color);
        // this.material.vertexColors = THREE.VertexColors;
        this.material.flatShading = true;
        // this.material.wireframe = true;

    }

    this.generateMesh = function () {
        var radius = 30, length = 300, segments = 15;
        var bodyGeometry = new THREE.CylinderGeometry(radius, radius, length, segments);
        var bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x2255ff });
        var bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
        bodyMesh.frustumCulled = false;
        this.groupMesh.add(bodyMesh);

        var xDim = 300, yDim = 50, zDim = 10;
        var wingGeometry = new THREE.BoxGeometry(xDim, yDim, zDim);
        var wingMaterial = new THREE.MeshBasicMaterial({ color: 0x3333ff });
        var wingMesh = new THREE.Mesh(wingGeometry, wingMaterial);
        wingMesh.frustumCulled = false;
        this.groupMesh.add(wingMesh);

        this.updatePosition(new THREE.Vector3(this.x, this.y, this.z));

        scene.add(this.groupMesh);
    }

    this.update = function (timeDelta) {
        var deltaPosition = new THREE.Vector3();
        deltaPosition.x = this.velocity.x * timeDelta;
        deltaPosition.y = this.velocity.y * timeDelta;
        deltaPosition.z = this.velocity.z * timeDelta;

        this.x += deltaPosition.x;
        this.y += deltaPosition.y;
        this.z += deltaPosition.z;

        this.updatePosition(deltaPosition);
    }

    this.generateMesh();

};