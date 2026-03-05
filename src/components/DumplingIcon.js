import React from 'react';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';
import { T } from '../constants/theme';

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

  return (
    <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {showSteam && (
        <>
          <Path d={steam1} fill="none" stroke={T.accent} strokeWidth={Math.max(s * 0.04, 1)} strokeLinecap="round" opacity={0.35} />
          <Path d={steam2} fill="none" stroke={T.accent} strokeWidth={Math.max(s * 0.04, 1)} strokeLinecap="round" opacity={0.3} />
        </>
      )}
      <Path d={bodyPath} fill={T.bgCard} stroke={T.border} strokeWidth={Math.max(s * 0.04, 1.2)} />
      {pleats.map((p, i) => (
        <Ellipse key={i} cx={p.x} cy={p.y} rx={s * 0.04} ry={s * 0.025} fill={T.textFaint} opacity={0.6} />
      ))}
      {showEyes && (
        <>
          <Circle cx={cx - rx * 0.28} cy={eyeY} r={eyeR} fill={T.textLight} />
          <Circle cx={cx + rx * 0.28} cy={eyeY} r={eyeR} fill={T.textLight} />
        </>
      )}
    </Svg>
  );
}
