export function solidWalls(width: number, height: number, radius: number): string {
  const points: Array<[number, number]> = [];
  const corners: Array<[number, number, number]> = [
    [width - radius, radius, -90],
    [width - radius, height - radius, 0],
    [radius, height - radius, 90],
    [radius, radius, 180],
  ];
  for (const [cx, cy, start] of corners) {
    for (let step = 0; step <= 16; step++) {
      const angle = (start + step * 90 / 16) * Math.PI / 180;
      points.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
    }
  }
  return points.map(([x, y], index) => {
    const [nextX, nextY] = points[(index + 1) % points.length];
    const length = Math.hypot(nextX - x, nextY - y);
    const angle = Math.atan2(nextY - y, nextX - x);
    const lightness = 27 + 13 * Math.cos(angle + 0.8);
    return `<span class="solid-wall" style="left:${(x + nextX) / 2 / width * 100}%;top:${(y + nextY) / 2 / height * 100}%;width:calc(${length / width * 100}% + 0.6px);--wall-angle:${angle}rad;--wall-light:${lightness}%"></span>`;
  }).join('');
}
