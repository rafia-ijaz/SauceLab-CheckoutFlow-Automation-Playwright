
export function pickNUniqueRandomIndices(total, n) {
  if (n > total) throw new Error(`Cannot pick ${n} out of ${total}`);
  const indices = Array.from({ length: total }, (_, i) => i);

  
  // shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, n).sort((a, b) => a - b);
}
