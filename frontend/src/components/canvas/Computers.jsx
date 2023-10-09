import {Suspense,useEffect,useState} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls,Preload,useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';
const Computers = ({isMobile}) => {
  const computer = useGLTF('./earthquakes/scene.gltf')
  return (
    <mesh>
      <hemisphereLight intensity={3.15}
      groundColor="black"/>
      <pointLight intensity ={3}/>
      <spotLight position={[-20,50,10]}
      angle ={0.12}
      penumbra={1}
      intensity={1}
      castShadow
      shadow-mapSize={1024}
      />
      <primitive 
         object = {computer.scene}
         scale = {isMobile ? 0.010 :0.015}
         position ={isMobile ? [0,-3,-2.2]:[1,-2.23,0]}
         rotation ={[-0.01,-0.2,-0.1]}
         />
    </mesh>
  )
}
const ComputersCanvas = ()=>{
  const [isMobile,setIsMobile]=useState(false);
  useEffect(()=>{
    const mediaQuery = window.matchMedia('(max-width:500px)');
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event)=>{
      setIsMobile(event.matches);
    }
    mediaQuery.addEventListener('change',handleMediaQueryChange);
    return ()=>{
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
  },[])
  return (
    <Canvas frameLoop = "demand" shadows camera ={{position:[20,3,5], fov : 25}}
    gl ={{preserveDrawingBuffer : true}}>
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls enableZoom={false}
        autoRotate
        maxPolarAngle={Math.PI/2}
        minPolarAngle={Math.PI/2}/>
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}
export default ComputersCanvas;

