import * as Three from 'three'
import * as gameloop from 'gameloop'

function createMesh () : Three.Mesh {
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

  mesh.position.z = -50;

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
  const WIDTH = 800;
  const HEIGHT = 600;

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

  const scene = new Three.Scene();
  let mesh = createMesh();

  scene.add(camera)
  scene.add(mesh)
  scene.add(createLight())

  renderer.setSize(WIDTH, HEIGHT)

  let game = gameloop({ renderer })

  game.on('update', (dt: number) => {
    mesh.rotation.x += (2 * dt)
    mesh.rotation.y += (3 * dt)
    mesh.rotation.z += dt
  })

  game.on('draw', (renderer: Three.WebGLRenderer) => {
    renderer.render(scene, camera)
  })

  game.start()

  document
    .querySelector('body')
    .appendChild(renderer.domElement);

})
