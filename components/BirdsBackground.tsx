import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';

// Configuration - Subtle mode
const WIDTH = 22; // 22x22 = 484 birds (reduced from 32x32 = 1024)
const BIRDS = WIDTH * WIDTH;
const BOUNDS = 600;
const BOUNDS_HALF = BOUNDS / 2;

// Shaders
const fragmentShaderPosition = `
  uniform float time;
  uniform float delta;

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 tmpPos = texture2D( texturePosition, uv );
    vec3 position = tmpPos.xyz;
    vec3 velocity = texture2D( textureVelocity, uv ).xyz;

    float phase = tmpPos.w;
    phase = mod( ( phase + delta + length( velocity.xz ) * delta * 3. + max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );

    gl_FragColor = vec4( position + velocity * delta * 15., phase );
  }
`;

const fragmentShaderVelocity = `
  uniform float time;
  uniform float testing;
  uniform float delta;
  uniform float separationDistance;
  uniform float alignmentDistance;
  uniform float cohesionDistance;
  uniform float freedomFactor;
  uniform vec3 predator;

  const float BOUNDS = 600.0;
  const float PI = 3.141592653589793;
  const float PI_2 = PI * 2.0;
  const float SPEED_LIMIT = 6.0;

  float rand( vec2 co ){
    return fract( sin( dot( co.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );
  }

  void main() {
    float zoneRadius = separationDistance + alignmentDistance + cohesionDistance;
    float separationThresh = separationDistance / zoneRadius;
    float alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;
    float zoneRadiusSquared = zoneRadius * zoneRadius;

    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 birdPosition, birdVelocity;

    vec3 selfPosition = texture2D( texturePosition, uv ).xyz;
    vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;

    float dist;
    vec3 dir;
    float distSquared;

    float f;
    float percent;

    vec3 velocity = selfVelocity;

    float limit = SPEED_LIMIT;

    dir = predator * BOUNDS - selfPosition;
    dir.z = 0.;
    dist = length( dir );
    distSquared = dist * dist;

    float preyRadius = 150.0;
    float preyRadiusSq = preyRadius * preyRadius;

    if ( dist < preyRadius ) {
      f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;
      velocity += normalize( dir ) * f;
      limit += 5.0;
    }

    vec3 central = vec3( 0., 0., 0. );
    dir = selfPosition - central;
    dist = length( dir );

    dir.y *= 2.5;
    velocity -= normalize( dir ) * delta * 5.;

    for ( float y = 0.0; y < resolution.y; y++ ) {
      for ( float x = 0.0; x < resolution.x; x++ ) {
        vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
        birdPosition = texture2D( texturePosition, ref ).xyz;

        dir = birdPosition - selfPosition;
        dist = length( dir );

        if ( dist < 0.0001 ) continue;

        distSquared = dist * dist;

        if ( distSquared > zoneRadiusSquared ) continue;

        percent = distSquared / zoneRadiusSquared;

        if ( percent < separationThresh ) {
          f = ( separationThresh / percent - 1.0 ) * delta;
          velocity -= normalize( dir ) * f;
        } else if ( percent < alignmentThresh ) {
          float threshDelta = alignmentThresh - separationThresh;
          float adjustedPercent = ( percent - separationThresh ) / threshDelta;
          birdVelocity = texture2D( textureVelocity, ref ).xyz;
          f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;
          velocity += normalize( birdVelocity ) * f;
        } else {
          float threshDelta = 1.0 - alignmentThresh;
          float adjustedPercent;
          if( threshDelta == 0. ) adjustedPercent = 1.;
          else adjustedPercent = ( percent - alignmentThresh ) / threshDelta;
          f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;
          velocity += normalize( dir ) * f;
        }
      }
    }

    if ( length( velocity ) > limit ) {
      velocity = normalize( velocity ) * limit;
    }

    gl_FragColor = vec4( velocity, 1.0 );
  }
`;

const birdVS = `
  precision highp float;

  attribute vec2 reference;
  attribute float birdVertex;
  attribute vec3 birdColor;

  uniform sampler2D texturePosition;
  uniform sampler2D textureVelocity;
  uniform float invertColors;

  varying vec4 vColor;
  varying float z;

  void main() {
    vec4 tmpPos = texture2D( texturePosition, reference );
    vec3 pos = tmpPos.xyz;
    vec3 velocity = normalize( texture2D( textureVelocity, reference ).xyz );
    vec3 newPosition = position;

    if ( birdVertex == 4.0 || birdVertex == 7.0 ) {
      newPosition.y = sin( tmpPos.w ) * 5.;
    }

    if ( birdVertex == 5.0 || birdVertex == 6.0 ) {
      newPosition.y = sin( tmpPos.w + 3.14159265359 ) * 5.;
    }

    newPosition = mat3( modelMatrix ) * newPosition;

    velocity.z *= -1.;
    float xz = length( velocity.xz );
    float xyz = 1.;
    float x = sqrt( 1. - velocity.y * velocity.y );
    float cosry = velocity.x / xz;
    float sinry = velocity.z / xz;
    float cosrz = x / xyz;
    float sinrz = velocity.y / xyz;

    mat3 maty = mat3(
      cosry, 0, -sinry,
      0, 1, 0,
      sinry, 0, cosry
    );

    mat3 matz = mat3(
      cosrz, sinrz, 0,
      -sinrz, cosrz, 0,
      0, 0, 1
    );

    newPosition = maty * matz * newPosition;
    newPosition += pos;

    z = newPosition.z;

    vColor = vec4( birdColor, 1.0 );
    gl_Position = projectionMatrix * viewMatrix * vec4( newPosition, 1.0 );
  }
`;

const birdFS = `
  precision highp float;

  varying vec4 vColor;
  varying float z;
  uniform float invertColors;

  void main() {
    float depth = 0.15;
    float alpha = ( 300. - z ) / 300.;
    float gray = depth * alpha;

    // Invert for dark mode
    if ( invertColors > 0.5 ) {
      gray = 1.0 - gray;
    }

    gl_FragColor = vec4( vec3( gray ), alpha * 1. );
  }
`;

// Bird Geometry
class BirdGeometry extends THREE.BufferGeometry {
  constructor() {
    super();

    const trianglesPerBird = 3;
    const triangles = BIRDS * trianglesPerBird;
    const points = triangles * 3;

    const vertices = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
    const birdColors = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
    const references = new THREE.BufferAttribute(new Float32Array(points * 2), 2);
    const birdVertex = new THREE.BufferAttribute(new Float32Array(points), 1);

    this.setAttribute('position', vertices);
    this.setAttribute('birdColor', birdColors);
    this.setAttribute('reference', references);
    this.setAttribute('birdVertex', birdVertex);

    let v = 0;

    function verts_push(...args: number[]) {
      for (let i = 0; i < args.length; i++) {
        vertices.array[v++] = args[i];
      }
    }

    const wingsSpan = 20;

    for (let f = 0; f < BIRDS; f++) {
      // Body
      verts_push(0, -0, -20, 0, 4, -20, 0, 0, 30);

      // Wings
      verts_push(0, 0, -15, -wingsSpan, 0, 0, 0, 0, 15);
      verts_push(0, 0, 15, wingsSpan, 0, 0, 0, 0, -15);
    }

    for (let v = 0; v < triangles * 3; v++) {
      const triangleIndex = ~~(v / 3);
      const birdIndex = ~~(triangleIndex / trianglesPerBird);
      const x = (birdIndex % WIDTH) / WIDTH;
      const y = ~~(birdIndex / WIDTH) / WIDTH;

      const c = new THREE.Color(0x666666);

      birdColors.array[v * 3 + 0] = c.r;
      birdColors.array[v * 3 + 1] = c.g;
      birdColors.array[v * 3 + 2] = c.b;

      references.array[v * 2] = x;
      references.array[v * 2 + 1] = y;

      birdVertex.array[v] = v % 9;
    }

    this.scale(0.2, 0.2, 0.2);
  }
}

interface BirdsBackgroundProps {
  darkMode: boolean;
}

export default function BirdsBackground({ darkMode }: BirdsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    let last = performance.now();

    // Scene setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 350;

    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // GPU Computation
    const gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, renderer);

    if (!renderer.capabilities.isWebGL2) {
      gpuCompute.setDataType(THREE.HalfFloatType);
    }

    const dtPosition = gpuCompute.createTexture();
    const dtVelocity = gpuCompute.createTexture();
    fillPositionTexture(dtPosition);
    fillVelocityTexture(dtVelocity);

    const velocityVariable = gpuCompute.addVariable(
      'textureVelocity',
      fragmentShaderVelocity,
      dtVelocity
    );
    const positionVariable = gpuCompute.addVariable(
      'texturePosition',
      fragmentShaderPosition,
      dtPosition
    );

    gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);
    gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);

    const positionUniforms = positionVariable.material.uniforms;
    const velocityUniforms = velocityVariable.material.uniforms;

    positionUniforms['time'] = { value: 0.0 };
    positionUniforms['delta'] = { value: 0.0 };
    velocityUniforms['time'] = { value: 1.0 };
    velocityUniforms['delta'] = { value: 0.0 };
    velocityUniforms['testing'] = { value: 1.0 };
    velocityUniforms['separationDistance'] = { value: 20.0 };
    velocityUniforms['alignmentDistance'] = { value: 20.0 };
    velocityUniforms['cohesionDistance'] = { value: 20.0 };
    velocityUniforms['freedomFactor'] = { value: 0.75 };
    velocityUniforms['predator'] = { value: new THREE.Vector3() };

    const error = gpuCompute.init();
    if (error !== null) {
      console.error(error);
    }

    // Bird mesh
    const geometry = new BirdGeometry();
    const materialUniforms: {
      texturePosition: { value: THREE.Texture | null };
      textureVelocity: { value: THREE.Texture | null };
      invertColors: { value: number };
    } = {
      texturePosition: { value: null },
      textureVelocity: { value: null },
      invertColors: { value: darkMode ? 1.0 : 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: materialUniforms,
      vertexShader: birdVS,
      fragmentShader: birdFS,
      side: THREE.DoubleSide,
      transparent: true,
    });

    const birdMesh = new THREE.Mesh(geometry, material);
    birdMesh.rotation.y = Math.PI / 2;
    birdMesh.matrixAutoUpdate = false;
    birdMesh.updateMatrix();
    scene.add(birdMesh);

    // Event handlers
    function onPointerMove(event: PointerEvent) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    document.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onWindowResize);

    // Animation
    function animate() {
      animationRef.current = requestAnimationFrame(animate);

      const now = performance.now();
      let delta = (now - last) / 1000;

      if (delta > 1) delta = 1;
      last = now;

      positionUniforms['time'].value = now;
      positionUniforms['delta'].value = delta;
      velocityUniforms['time'].value = now;
      velocityUniforms['delta'].value = delta;

      // Update predator position based on mouse
      velocityUniforms['predator'].value.set(
        (0.5 * mouseX) / windowHalfX,
        (-0.5 * mouseY) / windowHalfY,
        0
      );

      gpuCompute.compute();

      materialUniforms.texturePosition.value =
        gpuCompute.getCurrentRenderTarget(positionVariable).texture;
      materialUniforms.textureVelocity.value =
        gpuCompute.getCurrentRenderTarget(velocityVariable).texture;

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      document.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

// Helper functions
function fillPositionTexture(texture: THREE.DataTexture) {
  const theArray = texture.image.data as Float32Array;
  if (!theArray) return;
  for (let k = 0, kl = theArray.length; k < kl; k += 4) {
    const x = Math.random() * BOUNDS - BOUNDS_HALF;
    const y = Math.random() * BOUNDS - BOUNDS_HALF;
    const z = Math.random() * BOUNDS - BOUNDS_HALF;
    theArray[k + 0] = x;
    theArray[k + 1] = y;
    theArray[k + 2] = z;
    theArray[k + 3] = 1;
  }
}

function fillVelocityTexture(texture: THREE.DataTexture) {
  const theArray = texture.image.data as Float32Array;
  if (!theArray) return;
  for (let k = 0, kl = theArray.length; k < kl; k += 4) {
    const x = Math.random() - 0.5;
    const y = Math.random() - 0.5;
    const z = Math.random() - 0.5;
    theArray[k + 0] = x * 10;
    theArray[k + 1] = y * 10;
    theArray[k + 2] = z * 10;
    theArray[k + 3] = 1;
  }
}
