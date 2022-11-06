import * as THREE from "three"
import React, { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree, createPortal } from "@react-three/fiber"
import { ScrollControls, Scroll, useScroll, Text, Loader, Line, Shadow, useTexture, meshBounds, Html } from "@react-three/drei"
import { useDrag } from "react-use-gesture"
import Plane from "./components/Plane"
import Effects from "./components/Effects"
import { Block, useBlock } from "./blocks"
import state from "./store"
import NavHeader from "./components/NavHeader/NavHeader"
import { BrowserRouter as Router, Link, Switch, Route, NavLink } from "react-router-dom";
import NavFooter from "./components/NavFooter/NavFooter"
import About from "./pages/About/About"
import { history } from "./History";

function HeadsUpDisplay({ children }) {
  const [scene] = useState(() => new THREE.Scene())
  const { gl, camera } = useThree()
  useFrame(() => ((gl.autoClear = false), gl.clearDepth(), gl.render(scene, camera)), 2)
  return createPortal(children, scene)
}

function Marker() {
  const ref = useRef()
  const [active, setActive] = useState(false)
  const [hovered, set] = useState(false)
  const { sectionWidth } = useBlock()
  useEffect(() => void (document.body.style.cursor = hovered ? "grab" : "auto"), [hovered])
  useFrame(({ camera }) => {
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, (state.top.current / state.zoom / sectionWidth / state.pages) * -Math.PI * 2, 0.1)
    const s = THREE.MathUtils.lerp(ref.current.scale.x, active || hovered ? 2 : 0.75, 0.1)
    ref.current.scale.set(s, s, s)
    camera.zoom = THREE.MathUtils.lerp(camera.zoom, active || hovered ? 40 : state.zoom, 0.1)
    camera.updateProjectionMatrix()
  })
  const bind = useDrag(({ movement: [x], first, last }) => (setActive(!last), (state.ref.scrollLeft = x * 2 * state.pages)), {
    initial: () => [(state.ref.scrollLeft * 0.5) / state.pages]
  })
  return (
    <group ref={ref} position={[0, 0, 2]}>
      <Rect {...bind()} onPointerOver={(e) => (e.stopPropagation(), set(true))} onPointerOut={() => set(false)} />
    </group>
  )
}

function Rect({ scale, ...props }) {
  return (
    <group scale={scale}>
    </group>
  )
}

function Image({ img, index }) {
  const ref = useRef()
  const { contentMaxWidth: w, viewportWidth, offsetFactor } = useBlock()
  useFrame(() => {
    const scrollOffset = state.top.current / (viewportWidth * state.pages - viewportWidth) + 1 / state.pages / 2
    const scale = 1 - (offsetFactor - scrollOffset) * (offsetFactor > scrollOffset ? 1 : -1)
    ref.current.scale.setScalar(scale)
  })
  return (
        <group ref={ref}>
          <Plane map={img} args={[1, 1, 32, 32]} shift={100} aspect={1.5} scale={[w, w / 1.5, 1]} frustumCulled={false} />
            <Text  anchorX="left" position={[-w / 2, -w / 1.5 / 2 - 0.25, 0]} scale={1.5} color="white">
              <Html>
                <p className="project-index">
                  0{index}
                </p>
              </Html>
            </Text>
          <Shadow scale={[w * 1.2, 1, 1]} rotation={[0.75, 0, 0]} position={[0, -w / 2, 0]} />
        </group>
    
  )
}

function Content() {
  const images = useTexture(["/project-01.jpg", "/project-02.jpg", "/project-03.jpg", "/project-04.jpg"])
  const text = [{title: "Holo", subtitle:"Sports"}, {title: "Morph Men", subtitle:"Insurance"}, {title: "Morph Women", subtitle:"Insurance"}, {title: "Lifestyle", subtitle:"Insurance"}]
  return images.map((img, index) => (
    
      <Block key={index} factor={1} offset={index}>
        
          <Image key={index} index={index} img={img} />
          <Html zIndexRange="1">
            <div className="project-text">
              <h2 className="project-title">{text[index].title}</h2>
              <p>View Project</p>
            </div>
          </Html>
        
      </Block>
    
    
  ))
}

function Projects() {
  const scrollArea = useRef()
  const onScroll = (e) => (state.top.current = e.target.scrollLeft)
  useEffect(() => void onScroll({ target: (state.ref = scrollArea.current) }), [])
  return (
    <>
      
      <Canvas
        orthographic
        dpr={[1, 1.5]}
        mode="concurrent"
        camera={{ zoom: 1, position: [0, 0, 500] }}
        raycaster={{
          computeOffsets: ({ offsetX, offsetY }) => ({
            offsetX: offsetX - scrollArea.current.scrollLeft,
            offsetY
          })
        }}
        onCreated={(state) => state.events.connect(scrollArea.current)}>
        <Effects>
          <Suspense fallback={null}>
            <Content />
            <HeadsUpDisplay>
              <Marker />
            </HeadsUpDisplay>
          </Suspense>
        </Effects>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: "100vh", width: `${state.pages * 100}vw`,  }} ></div>
      </div>
      <Loader />
    </>
  )
}

export default function App() {
  
  
  return (
    <>
      <main className="app-container">
        <Router>
          <NavHeader/>
          <NavFooter/>
          <Route exact path="/">
            <Projects />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Router>
        
        {/* <Switch>
          
          <Route path="/projects">
            <Projects />
          </Route>
          
        </Switch> */}
      </main>
    </>
  )
}
