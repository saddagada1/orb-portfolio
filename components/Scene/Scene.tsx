import { useFBO, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Mesh, Group, Vector2, Vector3 } from "three";
import { orbVertexShader, orbFragmentShader } from "@/utils/shaders";
import { rand } from "@/utils/rand";
import { EffectComposer, Vignette, Scanline, Glitch, Noise } from "@react-three/postprocessing";
import { GlitchMode, OverrideMaterialManager } from "postprocessing";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/themeSlice";

interface SceneProps {
  data: string[];
  dragX: number;
}

const Scene: React.FC<SceneProps> = ({ data, dragX }) => {
  const orb = useRef<Mesh | null>(null);
  const line1 = useRef<Group | null>(null);
  const [line1Width, setLine1Width] = useState(0);
  const line2 = useRef<Group | null>(null);
  const [line2Width, setLine2Width] = useState(0);
  const line3 = useRef<Group | null>(null);
  const [line3Width, setLine3Width] = useState(0);
  const theme = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();
  const [orbDetail, setOrbDetail] = useState(rand(1, 5));
  const [shouldGlitch, setShouldGlitch] = useState(false);
  const mainRenderTarget = useFBO();
  OverrideMaterialManager.workaroundEnabled = true;

  const uniforms = useMemo(
    () => ({
      uTexture: {
        value: null,
      },
      uIorR: { value: 1.6 },
      uIorY: { value: 1.6 },
      uIorG: { value: 1.6 },
      uIorC: { value: 1.6 },
      uIorB: { value: 1.6 },
      uIorP: { value: 1.6 },
      uRefractPower: {
        value: 0.3,
      },
      uChromaticAberration: {
        value: 1.0,
      },
      uSaturation: { value: 1.08 },
      uShininess: { value: 40.0 },
      uDiffuseness: { value: 0.2 },
      uFresnelPower: { value: 6.0 },
      uLight: {
        value: new Vector3(-1.0, 1.0, 1.0),
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
    if (
      (line1Width !== 0 && line1.current!.position.x <= line1Width / 3) ||
      line1.current!.position.x >= line1Width * -1
    ) {
      line1.current!.position.x = (line1Width / 3) * -1;
    } else {
      line1.current!.position.x -= 0.005 - dragX * 0.005;
    }
    if (
      (line2Width !== 0 && line2.current!.position.x <= line2Width / 3) ||
      line2.current!.position.x >= line2Width * -1
    ) {
      line2.current!.position.x = (line2Width / 3) * -1;
    } else {
      line2.current!.position.x -= 0.005 - dragX * 0.005;
    }
    if (
      (line3Width !== 0 && line3.current!.position.x <= line3Width / 3) ||
      line3.current!.position.x >= line3Width * -1
    ) {
      line3.current!.position.x = (line3Width / 3) * -1;
    } else {
      line3.current!.position.x -= 0.005 - dragX * 0.005;
    }
    camera.rotation.y += (mouse.x * 0.1 - camera.rotation.y) * 0.02;
    orb.current!.rotation.x -= (mouse.y * 0.1 - camera.rotation.x) * 0.2;
    orb.current!.rotation.y -= (mouse.x * 0.1 - camera.rotation.y) * 0.2;
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
      }, 100 * rand(2, 4));
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
        <Noise premultiply={true} opacity={0.5} />
        <Scanline density={2} opacity={0.75} />
      </EffectComposer>
      <group position={[0, 0, 0]}>
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
            setShouldGlitch(true);
            setTimeout(() => {
              const smooth = rand(1, 20);
              if (smooth === 20) {
                setOrbDetail(20);
              } else {
                setOrbDetail(rand(1, 5));
              }
              setShouldGlitch(false);
            }, 100 * rand(2, 4));
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
        <group position={[-13, 0, 0]}>
          <Text
            ref={line1}
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
            position={[(line1Width / 3) * -1, 1.3, 0]}
            onSync={({ geometry }) => setLine1Width(geometry.boundingBox.max.x * -1)}
          >
            {data[0].trim() + " ~ " + data[0].trim() + " ~ " + data[0].trim()}
          </Text>
          <Text
            ref={line2}
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
            position={[(line2Width / 3) * -1, 0, 0]}
            onSync={({ geometry }) => setLine2Width(geometry.boundingBox.max.x * -1)}
          >
            {data[1].trim() + " ~ " + data[1].trim() + " ~ " + data[1].trim()}
          </Text>
          <Text
            ref={line3}
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
            position={[(line3Width / 3) * -1, -1.3, 0]}
            onSync={({ geometry }) => setLine3Width(geometry.boundingBox.max.x * -1)}
          >
            {data[2].trim() + " ~ " + data[2].trim() + " ~ " + data[2].trim()}
          </Text>
        </group>
      </group>
    </>
  );
};

export default Scene;
