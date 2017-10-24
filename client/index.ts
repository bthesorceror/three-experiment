import * as Three from 'three'
import * as gameloop from 'gameloop'

function createMesh (x: number, y: number, z: number) : Three.Mesh {
  const RINGS = 50;
  const SEGMENTS = 16;
  const RADIUS = 16;

  const material = new Three.MeshLambertMaterial({
    color: 0xCC0000
  });

  // const material = new Three.MeshBasicMaterial({
  //   color: 0xCC0000
  // });

  // let geometry = new Three.SphereGeometry(
  //   RADIUS,
  //   SEGMENTS,
  //   RINGS
  // );

  let geometry = new Three.BoxGeometry(25, 25, 25 );
  let mesh = new Three.Mesh(geometry , material);

  mesh.position.z = z;
  mesh.position.y = y;
  mesh.position.x = x;

  return mesh;
}

function createLight () : Three.PointLight {
  let light = new Three.PointLight(0xFFFFFF)

  light.position.x = 10;
  light.position.y = 50;
  light.position.z = 130;

  return light;
}

window.addEventListener('load', (evt) => {
  const WIDTH = 1200;
  const HEIGHT = 900;

  const VIEW_ANGLE = 45;
  const ASPECT = WIDTH / HEIGHT;
  const NEAR = 0.1;
  const FAR = 10000;

  const renderer = new Three.WebGLRenderer();

  const camera = new Three.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR
  );

  let scene = new Three.Scene();
  let mesh1 = createMesh(0, 0, -250);
  let mesh2 = createMesh(0, 55, -300);

  scene.add(camera)
  scene.add(mesh1)
  scene.add(mesh2)
  scene.add(createLight())

  renderer.setSize(WIDTH, HEIGHT)

  let game = gameloop({ renderer })

  game.on('update', (dt: number) => {
    mesh1.rotation.x += (2 * dt)
    mesh1.rotation.y += (3 * dt)
    mesh1.rotation.z += dt

    mesh2.rotation.x -= 5 * dt
  })

  game.on('draw', (renderer: Three.WebGLRenderer) => {
    renderer.render(scene, camera)
  })

  game.start()

  document
    .querySelector('body')
    .appendChild(renderer.domElement);

})
