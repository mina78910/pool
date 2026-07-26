/**
 * CSV を、引用符内のカンマ・改行・二重引用符を考慮してオブジェクトへ変換します。
 * @param {string} text
 * @returns {Record<string, string>[]}
 */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  const source = text.replace(/^\uFEFF/, '');

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (character === '"') {
      if (quoted && source[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ',' && !quoted) {
      row.push(value);
      value = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && source[index + 1] === '\n') index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim() !== '')) rows.push(row);
      row = [];
      value = '';
    } else {
      value += character;
    }
  }

  if (value !== '' || row.length > 0) {
    row.push(value);
    if (row.some((cell) => cell.trim() !== '')) rows.push(row);
  }
  if (rows.length === 0) return [];

  const headers = rows[0];
  return rows.slice(1).map((values) => Object.fromEntries(
    headers.map((header, index) => [header, values[index] ?? '']),
  ));
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

  return parseCsv(await response.text());
}
