import { useFBO, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { Mesh, Group, Vector2 } from "three";
import { orbVertexShader, orbFragmentShader } from "@/utils/shaders";
import { rand } from "@/utils/rand";
import { EffectComposer, Vignette, Scanline, Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/themeSlice";

interface SceneProps {
  data: string[];
  dragX: number;
  setDragX: Dispatch<SetStateAction<number>>;
}

const Scene: React.FC<SceneProps> = ({ data, dragX, setDragX }) => {
  const orb = useRef<Mesh | null>(null);
  const text = useRef<Group | null>(null);
  const theme = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();
  const [orbDetail, setOrbDetail] = useState(rand(1, 5));
  const [shouldGlitch, setShouldGlitch] = useState(false);
  const mainRenderTarget = useFBO();

  const uniforms = useMemo(
    () => ({
      uTexture: {
        value: null,
      },
      uIorR: {
        value: 2,
      },
      uIorG: {
        value: 2,
      },
      uIorB: {
        value: 2,
      },
      uRefractPower: {
        value: 0.2,
      },
      uChromaticAberration: {
        value: 0.8,
      },
      winResolution: {
        value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
          Math.min(window.devicePixelRatio, 2)
        ),
      },
    }),
    []
  );

  useFrame((state) => {
    const { gl, scene, camera, mouse, clock } = state;
    orb.current!.visible = false;
    gl.setRenderTarget(mainRenderTarget);
    gl.render(scene, camera);
    const material = orb.current!.material as THREE.ShaderMaterial;
    material.uniforms.uTexture.value = mainRenderTarget.texture;
    gl.setRenderTarget(null);
    orb.current!.visible = true;
    if (text.current!.position.x > -13) {
      setShouldGlitch(true);
      setTimeout(() => {
        setDragX(0);
        text.current!.position.x = -14;
        setShouldGlitch(false);
      }, 250);
    } else {
      text.current!.position.x -= 0.005 - dragX * 0.005;
    }
    orb.current!.rotation.x += 0.005;
    orb.current!.rotation.y -= (mouse.x * 0.1 - camera.rotation.y) * 0.3;
    camera.rotation.y += (mouse.x * 0.1 - camera.rotation.y) * 0.02;
    if (clock.elapsedTime % 1 > 0.99 && Math.round(clock.elapsedTime) % rand(5, 7) === 0) {
      setShouldGlitch(true);
      setTimeout(() => {
        const smooth = rand(1, 20);
        if (smooth === 20) {
          setOrbDetail(20);
        } else {
          setOrbDetail(rand(1, 5));
        }
        setShouldGlitch(false);
      }, 100 * rand(1, 4));
    }
  });

  return (
    <>
      <color attach="background" args={[theme.bgColour]} />
      <EffectComposer>
        <Vignette darkness={1} opacity={0.2} />
        <Glitch
          strength={new Vector2(0.1, 0.5)}
          duration={new Vector2(0.05, 0.1)}
          columns={0.0001}
          mode={GlitchMode.CONSTANT_MILD}
          active={shouldGlitch}
        />
        <Scanline density={2} opacity={0.75} />
      </EffectComposer>
      <group position={[0, -1, 0]}>
        <mesh
          ref={orb}
          onClick={(event) => {
            event.stopPropagation();
            document.documentElement.style.setProperty(
              "--bg-colour",
              theme.bgColour === "#171717" ? "#fafafa" : "#171717"
            );
            document.documentElement.style.setProperty(
              "--text-colour",
              theme.textColour === "#fafafa" ? "#171717" : "#fafafa"
            );
            dispatch(
              setTheme({
                bgColour: theme.bgColour === "#171717" ? "#fafafa" : "#171717",
                textColour: theme.textColour === "#fafafa" ? "#171717" : "#fafafa",
              })
            );
          }}
          onPointerEnter={(event) => {
            event.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={(event) => {
            event.stopPropagation();
            document.body.style.cursor = "grab";
          }}
        >
          <octahedronGeometry args={[3, orbDetail]} />
          <shaderMaterial
            vertexShader={orbVertexShader}
            fragmentShader={orbFragmentShader}
            uniforms={uniforms}
          />
        </mesh>
        <group ref={text} position={[-13, 0, 0]}>
          <Text
            onClick={(event) => {
              event.stopPropagation();
              alert("clicked text 1");
            }}
            onPointerEnter={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerLeave={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "grab";
            }}
            font="/assets/fonts/Roboto-Bold.ttf"
            color={theme.textColour}
            anchorX="left"
            lineHeight={0.25}
            position={[0, 0.75, 0]}
          >
            {data[0]}
          </Text>
          <Text
            onClick={(event) => {
              event.stopPropagation();
              alert("clicked text 2");
            }}
            onPointerEnter={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerLeave={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "grab";
            }}
            font="/assets/fonts/Roboto-Bold.ttf"
            color={theme.textColour}
            anchorX="left"
            lineHeight={0.25}
            position={[0, -0.45, 0]}
          >
            {data[1]}
          </Text>
          <Text
            onClick={(event) => {
              event.stopPropagation();
              alert("clicked text 3");
            }}
            onPointerEnter={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerLeave={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "grab";
            }}
            font="/assets/fonts/Roboto-Bold.ttf"
            color={theme.textColour}
            anchorX="left"
            lineHeight={0.25}
            position={[0, -1.6, 0]}
          >
            {data[2]}
          </Text>
        </group>
      </group>
    </>
  );
};

export default Scene;
