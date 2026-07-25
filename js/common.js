/**
 * CSV の1行を、引用符で囲まれたカンマや二重引用符を考慮して分割します。
 * @param {string} line
 * @returns {string[]}
 */
function parseCsvLine(line) {
  const values = [];
  let value = '';
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ',' && !quoted) {
      values.push(value);
      value = '';
    } else {
      value += character;
    }
  }

  values.push(value);
  return values;
}

/**
 * CSV を取得し、ヘッダー名をキーにしたオブジェクトの配列へ変換します。
 * @param {string} url
 * @returns {Promise<Record<string, string>[]>}
 */
export async function fetchCsv(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CSVの読み込みに失敗しました（${response.status}）`);
  }

  const text = (await response.text()).replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
  if (lines.length === 0) return [];

  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}
