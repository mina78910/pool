import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getAcademicYear,
  getCurrentStage,
  getGraduationYear,
} from '../js/age-master.mjs';

test('1993年生まれの卒業年は2016年になる', () => {
  assert.equal(getGraduationYear(1993), 2016);
});

test('年度は4月に切り替わる', () => {
  assert.equal(getAcademicYear(new Date(2026, 2, 31)), 2025);
  assert.equal(getAcademicYear(new Date(2026, 3, 1)), 2026);
});

test('年度に応じた学年を表示する', () => {
  const date = new Date(2026, 6, 1);
  assert.equal(getCurrentStage(2019, date), '小学生1年生');
  assert.equal(getCurrentStage(2013, date), '中学生1年生');
  assert.equal(getCurrentStage(2010, date), '高校生1年生');
  assert.equal(getCurrentStage(2007, date), '大学生1年生');
});

test('卒業年度以降は社会人年数を表示する', () => {
  assert.equal(getCurrentStage(1993, new Date(2026, 6, 1)), '社会人11年目');
});
