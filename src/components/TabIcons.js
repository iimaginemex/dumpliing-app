import React from 'react';
import Svg, { Path, Circle, Line } from 'react-native-svg';

// LOG - Pencil/edit icon
export function LogIcon({ size = 20, color }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M13.5 3.5l3 3L7 16H4v-3L13.5 3.5z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="11" y1="6" x2="14" y2="9" stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

// WEAVE - Two overlapping circles
export function WeaveIcon({ size = 20, color }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx="8" cy="10" r="5" stroke={color} strokeWidth={1.5} />
      <Circle cx="12" cy="10" r="5" stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

// TIME - Clock outline
export function TimeIcon({ size = 20, color }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx="10" cy="10" r="7" stroke={color} strokeWidth={1.5} />
      <Path d="M10 6v4.5l3 2" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// THREADS - Three staggered horizontal lines
export function ThreadsIcon({ size = 20, color }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Line x1="4" y1="6" x2="16" y2="6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Line x1="6" y1="10" x2="16" y2="10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Line x1="5" y1="14" x2="14" y2="14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// REWIND - Counter-clockwise arrow
export function RewindIcon({ size = 20, color }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M4 8a7 7 0 1 1 1.5 4.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 4v4h4" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
