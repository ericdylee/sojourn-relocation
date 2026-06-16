export function frameForProgress(progress: number, frameCount: number): number {
  const p = Math.min(1, Math.max(0, progress));
  return Math.min(frameCount - 1, Math.floor(p * frameCount));
}
