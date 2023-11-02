import {useMatcapTexture,Center,OrbitControls,Text3D,Sparkles } from '@react-three/drei'
import {useRef, useState,Suspense } from 'react'
import { useFrame } from '@react-three/fiber';

export default function Experience()
{
    const donut=useRef()
    const [torusGeometry,setTorusGeometry]=useState();
    const [matcaptexture]=useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91',256)
    useFrame((state,delta)=>
    {
        
        for(const don of donut.current.children ){
            don.rotation.y+=delta*0.2;
        }
    })

    return <>
    

        {/* <Sparkles scale={100}/> */}
        <OrbitControls makeDefault />
       
        <torusGeometry ref={setTorusGeometry} args={[1,0.6,16,32]}/>

<Center>
       <Text3D font="./fonts/helvetiker_regular.typeface.json"
       size={0.75}
       height={0.2}
       curveSegments={12}
       bevelEnabled
       bevelThickness={0.02}
       bevelSize={0.02}
       bevelOffset={0}
       bevelSegments={5}
       
       >
        Communi Connect
        <meshMatcapMaterial matcap={matcaptexture}/>
       </Text3D>
       <Text3D font="./fonts/helvetiker_regular.typeface.json"
       size={0.5}
       height={0.2}
       curveSegments={12}
       bevelEnabled
       bevelThickness={0.02}
       bevelSize={0.02}
       bevelOffset={0}
       bevelSegments={5}
       position-x={2.75}
       position-y={-0.75}
       
       >
        Stay Connected
        <meshMatcapMaterial matcap={matcaptexture}/>
       </Text3D>
      
       </Center>
       <group ref={donut}>
       {[...Array(75)].map((value,index)=> 
       <mesh
       geometry={torusGeometry}
       key={index}
       position={[
        (Math.random()-0.5)*10,
        (Math.random()-0.5)*10,
        (Math.random()-0.5)*10



       ]}
       scale={0.2+Math.random()*0.2}
       rotation={[
        (Math.random())*Math.PI,
        (Math.random())*Math.PI,
        0



       ]}
       >
       
        <meshMatcapMaterial matcap={matcaptexture}/>
       </mesh>)
       }
       </group>
      
       
    </>
}