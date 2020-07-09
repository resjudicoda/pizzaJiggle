import React, {Component} from 'react'
import * as THREE from 'three'
import vertexShader from './vertexShader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const fragmentShader = () => {
  return `
  precision mediump float;

  varying vec2 vUv;
  varying float vWave;
  uniform sampler2D uTexture;

  void main() {
    float wave = vWave * 0.25;
    vec3 texture = texture2D(uTexture, vUv + wave).rgb;
    gl_FragColor = vec4(texture, 1.);
  }
  `
}

class Three extends Component {
  constructor() {
    super()
    this.state = {
      gallery: []
    }
  }
  componentDidMount() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xffffff, 1)
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)

    const clock = new THREE.Clock()
    //plane
    const geometry = new THREE.PlaneGeometry(0.256, 0.256, 16, 16)

    //custom

    // const geometry = new THREE.Geometry()
    // geometry.vertices.push(
    //   new THREE.Vector3(5, 0, 5),
    //   new THREE.Vector3(0, 5, 5),
    //   new THREE.Vector3(5, 5, -5),
    //   new THREE.Vector3(5, 0, 3),
    //   new THREE.Vector3(0, 5, 3)
    // )

    // geometry.faces.push(
    //   // top
    //   new THREE.Face3(0, 1, 2),
    //   // left
    //   new THREE.Face3(0, 2, 3),
    //   // right
    //   new THREE.Face3(1, 2, 4)
    // )

    // box
    //const geometry = new THREE.BoxGeometry()

    //coneBuffer
    // const radius = 4.2
    // const height = 9.9
    // const radialSegments = 7
    // const heightSegments = 1
    // const openEnded = false
    // const thetaStart = Math.PI * 1.94
    // const thetaLength = Math.PI * 1.0

    // const geometry = new THREE.ConeBufferGeometry(
    //   radius,
    //   height,
    //   radialSegments,
    //   heightSegments,
    //   openEnded,
    //   thetaStart,
    //   thetaLength
    // )

    //

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {value: 0.0},
        uTexture: {
          value: new THREE.TextureLoader().load(this.props.image.secure_url)
        }
      },
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader()
      //wireframe: true,
    })
    // const geometry = new THREE.ConeBufferGeometry(5, 20, 32)
    //const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    camera.position.z = 0.3
    const animate = function() {
      requestAnimationFrame(animate)
      // cone.rotation.x += 0.01
      // cone.rotation.y += 0.01
      //mesh.rotation.z = Math.PI
      material.uniforms.uTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
    }
    animate()
  }

  render() {
    return <div ref={ref => (this.mount = ref)} />
  }
}

export default Three
