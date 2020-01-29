var Airplane = function (scene, x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z;

    this.groupMesh = new THREE.Group();

    this.setGeometryPosition = function (geometry) {
        for (vertex of geometry.vertices) {
            vertex.x += this.x;
            vertex.y += this.y;
            vertex.z += this.z;
        }
        return geometry;
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
        this.setGeometryPosition(bodyGeometry);
        var bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x2255ff });
        var bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
        this.groupMesh.add(bodyMesh);

        var xDim = 300, yDim = 50, zDim = 10;
        var wingGeometry = new THREE.BoxGeometry(xDim, yDim, zDim);
        this.setGeometryPosition(wingGeometry);
        var wingMaterial = new THREE.MeshBasicMaterial({ color: 0x3333ff });
        var wingMesh = new THREE.Mesh(wingGeometry, wingMaterial);
        this.groupMesh.add(wingMesh);

        scene.add(this.groupMesh);
    }

    this.generateMesh();

};