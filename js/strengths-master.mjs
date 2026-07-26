export function createNotesIndex(notes) {
  const index = new Map();
  for (const note of notes) {
    const name = note['資質名'];
    const type = note['種別'];
    if (!name || !type || !note['内容']) continue;
    if (!index.has(name)) index.set(name, new Map());
    const notesByType = index.get(name);
    if (!notesByType.has(type)) notesByType.set(type, []);
    notesByType.get(type).push(note['内容']);
  }
  return index;
}

export function filterStrengths(strengths, query) {
  const normalizedQuery = query.trim().normalize('NFKC').toLocaleLowerCase('ja');
  if (!normalizedQuery) return strengths;
  return strengths.filter((strength) => strength['資質名']
    .normalize('NFKC').toLocaleLowerCase('ja').includes(normalizedQuery));
}
