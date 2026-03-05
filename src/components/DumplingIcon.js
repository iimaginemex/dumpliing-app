import React, { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';
import { T } from '../constants/theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function DumplingIcon({ size = 32, showSteam = true, showEyes = true }) {
  const s = size;
  const cx = s / 2;
  const cy = s * 0.58;
  const rx = s * 0.4;
  const ry = s * 0.22;

  // Half-moon body
  const bodyPath = `M ${cx - rx} ${cy} Q ${cx - rx} ${cy - ry * 2.2} ${cx} ${cy - ry * 2.2} Q ${cx + rx} ${cy - ry * 2.2} ${cx + rx} ${cy} Q ${cx + rx * 0.6} ${cy + ry * 1.1} ${cx} ${cy + ry * 1.1} Q ${cx - rx * 0.6} ${cy + ry * 1.1} ${cx - rx} ${cy} Z`;

  // Pleat positions along top curve
  const pleats = [-0.22, 0, 0.22].map(offset => {
    const px = cx + rx * offset;
    const py = cy - ry * 2.1 + Math.abs(offset) * ry * 0.4;
    return { x: px, y: py };
  });

  // Steam wisps
  const steamY = cy - ry * 2.5;
  const steam1 = `M ${cx - s * 0.08} ${steamY} Q ${cx - s * 0.12} ${steamY - s * 0.12} ${cx - s * 0.06} ${steamY - s * 0.2}`;
  const steam2 = `M ${cx + s * 0.08} ${steamY} Q ${cx + s * 0.14} ${steamY - s * 0.1} ${cx + s * 0.06} ${steamY - s * 0.22}`;

  // Eye positions
  const eyeR = Math.max(s * 0.025, 1);
  const eyeY = cy - ry * 0.5;
  const leftEyeCx = cx - rx * 0.28;
  const rightEyeCx = cx + rx * 0.28;

  // --- Animated values ---
  const mountScale = useRef(new Animated.Value(0)).current;
  const breatheScale = useRef(new Animated.Value(1)).current;
  const wiggleRotation = useRef(new Animated.Value(0)).current;
  const steam1Opacity = useRef(new Animated.Value(0.35)).current;
  const steam2Opacity = useRef(new Animated.Value(0.3)).current;
  const eyeOffsetX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const cleanupExtras = [];

    // --- Bounce on appear ---
    const bounceAnim = Animated.spring(mountScale, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    });
    bounceAnim.start();

    // --- Gentle breathing ---
    const breatheTimeout = setTimeout(() => {
      const breatheLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(breatheScale, {
            toValue: 1.04,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(breatheScale, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );
      breatheLoop.start();
    }, 600);

    // --- Wiggle ---
    const runWiggle = () => {
      Animated.sequence([
        Animated.delay(5000),
        Animated.timing(wiggleRotation, {
          toValue: -1,
          duration: 120,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(wiggleRotation, {
          toValue: 1,
          duration: 120,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(wiggleRotation, {
          toValue: -0.5,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(wiggleRotation, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => runWiggle());
    };
    runWiggle();

    // --- Steam fade ---
    if (showSteam) {
      const steamLoop1Timeout = setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(steam1Opacity, {
              toValue: 0,
              duration: 1400,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: false,
            }),
            Animated.timing(steam1Opacity, {
              toValue: 0.35,
              duration: 1400,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: false,
            }),
          ])
        ).start();
      }, 1000);

      const steamLoop2Timeout = setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(steam2Opacity, {
              toValue: 0,
              duration: 1600,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: false,
            }),
            Animated.timing(steam2Opacity, {
              toValue: 0.3,
              duration: 1600,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: false,
            }),
          ])
        ).start();
      }, 2200);

      cleanupExtras.push(
        () => clearTimeout(steamLoop1Timeout),
        () => clearTimeout(steamLoop2Timeout),
      );
    }

    // --- Roaming eyes ---
    let eyeTimeout;
    if (showEyes) {
      const maxDrift = rx * 0.15;
      const roamEyes = () => {
        const nextDelay = 3000 + Math.random() * 3000;
        eyeTimeout = setTimeout(() => {
          const target = (Math.random() * 2 - 1) * maxDrift;
          Animated.timing(eyeOffsetX, {
            toValue: target,
            duration: 400 + Math.random() * 300,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: false,
          }).start(() => {
            const pause = 800 + Math.random() * 1200;
            eyeTimeout = setTimeout(() => {
              Animated.timing(eyeOffsetX, {
                toValue: 0,
                duration: 400 + Math.random() * 300,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: false,
              }).start(() => roamEyes());
            }, pause);
          });
        }, nextDelay);
      };
      const eyeStartTimeout = setTimeout(() => roamEyes(), 2000);
      cleanupExtras.push(() => clearTimeout(eyeStartTimeout));
    }

    // --- Cleanup ---
    return () => {
      clearTimeout(breatheTimeout);
      if (eyeTimeout) clearTimeout(eyeTimeout);
      cleanupExtras.forEach(fn => fn());
      mountScale.stopAnimation();
      breatheScale.stopAnimation();
      wiggleRotation.stopAnimation();
      steam1Opacity.stopAnimation();
      steam2Opacity.stopAnimation();
      eyeOffsetX.stopAnimation();
    };
  }, []);

  const combinedScale = Animated.multiply(mountScale, breatheScale);
  const rotateInterp = wiggleRotation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-2deg', '2deg'],
  });

  return (
    <Animated.View style={{
      width: s,
      height: s,
      transform: [
        { scale: combinedScale },
        { rotate: rotateInterp },
      ],
    }}>
      <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {showSteam && (
          <>
            <AnimatedPath d={steam1} fill="none" stroke={T.accent} strokeWidth={Math.max(s * 0.04, 1)} strokeLinecap="round" opacity={steam1Opacity} />
            <AnimatedPath d={steam2} fill="none" stroke={T.accent} strokeWidth={Math.max(s * 0.04, 1)} strokeLinecap="round" opacity={steam2Opacity} />
          </>
        )}
        <Path d={bodyPath} fill={T.bgCard} stroke={T.border} strokeWidth={Math.max(s * 0.04, 1.2)} />
        {pleats.map((p, i) => (
          <Ellipse key={i} cx={p.x} cy={p.y} rx={s * 0.04} ry={s * 0.025} fill={T.textFaint} opacity={0.6} />
        ))}
        {showEyes && (
          <>
            <AnimatedCircle cx={Animated.add(leftEyeCx, eyeOffsetX)} cy={eyeY} r={eyeR} fill={T.textLight} />
            <AnimatedCircle cx={Animated.add(rightEyeCx, eyeOffsetX)} cy={eyeY} r={eyeR} fill={T.textLight} />
          </>
        )}
      </Svg>
    </Animated.View>
  );
}
