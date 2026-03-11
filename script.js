// ================== SCENE ==================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// ================== CAMERA ==================
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(12, 8, 12);
camera.lookAt(0, 0, 0);

// ================== RENDERER ==================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// ================== LIGHTING ==================
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(15, 20, 10);
sun.castShadow = true;
scene.add(sun);

// ================== GROUND ==================
const grass = new THREE.Mesh(
  new THREE.PlaneGeometry(80, 80),
  new THREE.MeshPhongMaterial({ color: 0x2e8b57 })
);
grass.rotation.x = -Math.PI / 2;
grass.receiveShadow = true;
scene.add(grass);

// ================== CURVED BACKGROUND ==================
const wall = new THREE.Mesh(
  new THREE.CylinderGeometry(35, 35, 20, 64, 1, true),
  new THREE.MeshPhongMaterial({
    color: 0x98fb98,
    side: THREE.DoubleSide
  })
);
wall.position.y = 8;
scene.add(wall);

// ================== WOODEN FLOOR ==================
const floor = new THREE.Mesh(
  new THREE.CircleGeometry(8, 64),
  new THREE.MeshPhongMaterial({ color: 0x8b4513 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0.01;
floor.receiveShadow = true;
scene.add(floor);

// ================== TABLE ==================
const tableGroup = new THREE.Group();
scene.add(tableGroup);

const woodMaterial = new THREE.MeshPhongMaterial({ color: 0x5c3317 });

// Table top
const tableTop = new THREE.Mesh(
  new THREE.CylinderGeometry(4, 4, 0.5, 64),
  woodMaterial
);
tableTop.position.y = 3;
tableTop.castShadow = true;
tableGroup.add(tableTop);

// Table stand
const tableStand = new THREE.Mesh(
  new THREE.CylinderGeometry(0.7, 1, 3, 32),
  woodMaterial
);
tableStand.position.y = 1.5;
tableStand.castShadow = true;
tableGroup.add(tableStand);

// ================== CHAIRS ==================
function createChair(angle) {
  const radius = 7;
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  const chair = new THREE.Group();
  const material = new THREE.MeshPhongMaterial({ color: 0x444444 });

  // Seat
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 0.4, 2.5),
    material
  );
  seat.position.y = 2;
  chair.add(seat);

  // Backrest
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 3, 0.4),
    material
  );
  back.position.set(0, 3.5, -1);
  chair.add(back);

  // Legs
  function addLeg(px, pz) {
    const leg = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 2, 0.4),
      material
    );
    leg.position.set(px, 1, pz);
    chair.add(leg);
  }

  addLeg(1, 1);
  addLeg(-1, 1);
  addLeg(1, -1);
  addLeg(-1, -1);

  chair.position.set(x, 0, z);
  chair.rotation.y = -angle;
  scene.add(chair);
}

createChair(0);
createChair(Math.PI);

// ================== MILO TIN ==================
const milo = new THREE.Mesh(
  new THREE.CylinderGeometry(0.8, 0.8, 3, 32),
  new THREE.MeshPhongMaterial({ color: 0x006400 })
);
milo.position.set(-1.5, 4.5, 0);
tableGroup.add(milo);

// ================== MILK TIN ==================
const milk = new THREE.Mesh(
  new THREE.CylinderGeometry(0.8, 0.8, 3, 32),
  new THREE.MeshPhongMaterial({ color: 0xffffff })
);
milk.position.set(1.5, 4.5, 0);
tableGroup.add(milk);

// ================== CUPS ==================
function createCup(x, z) {
  const cupGroup = new THREE.Group();

  const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.9, 2, 32),
    new THREE.MeshPhongMaterial({ color: 0xffd700, side: THREE.DoubleSide })
  );
  cup.position.y = 4;
  cupGroup.add(cup);

  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, 0.1, 16, 100),
    new THREE.MeshPhongMaterial({ color: 0xffd700 })
  );
  handle.rotation.y = Math.PI / 2;
  handle.position.set(1, 4, 0);
  cupGroup.add(handle);

  cupGroup.position.set(x, 0, z);
  tableGroup.add(cupGroup);
}

createCup(-1, 2);
createCup(1, -2);

// ================== ANIMATION ==================
function animate() {
  requestAnimationFrame(animate);

  tableGroup.rotation.y += 0.003;

  renderer.render(scene, camera);
}

animate();