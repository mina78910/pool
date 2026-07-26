import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv } from '../js/common.js';
import { createNotesIndex, filterStrengths } from '../js/strengths-master.mjs';

test('parseCsv parses commas, quotes, and line breaks in quoted values', () => {
  assert.deepEqual(parseCsv('名前,内容\r\n適応性,"変化, 現在"\r\n内省,"深く\n考える"'), [
    { 名前: '適応性', 内容: '変化, 現在' },
    { 名前: '内省', 内容: '深く\n考える' },
  ]);
});

test('createNotesIndex groups notes by strength and type', () => {
  const index = createNotesIndex([
    { 資質名: '適応性', 種別: '強み', 内容: '柔軟' },
    { 資質名: '適応性', 種別: '強み', 内容: '即応' },
  ]);
  assert.deepEqual(index.get('適応性').get('強み'), ['柔軟', '即応']);
});

test('filterStrengths performs normalized partial matching', () => {
  const strengths = [{ 資質名: 'コミュニケーション' }, { 資質名: '適応性' }];
  assert.deepEqual(filterStrengths(strengths, 'ｺﾐｭﾆｹｰｼｮﾝ'), [strengths[0]]);
});
