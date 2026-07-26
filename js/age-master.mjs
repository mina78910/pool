/**
 * 生年だけから表示を組み立てるための標準的な進学モデルです。
 * 4月に小学校へ入学し、留年・浪人をせず4年制大学を卒業する想定です。
 */
const EDUCATION_STAGES = [
  { label: '小学生', startAge: 7, duration: 6 },
  { label: '中学生', startAge: 13, duration: 3 },
  { label: '高校生', startAge: 16, duration: 3 },
  { label: '大学生', startAge: 19, duration: 4 },
];

export const UNIVERSITY_GRADUATION_AGE = 23;

/**
 * 表示時点が属する年度を返します（年度は4月始まり）。
 * @param {Date} date
 * @returns {number}
 */
export function getAcademicYear(date = new Date()) {
  return date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1;
}

/**
 * @param {number} birthYear
 * @returns {number}
 */
export function getGraduationYear(birthYear) {
  return birthYear + UNIVERSITY_GRADUATION_AGE;
}

/**
 * 生年と現在の年度から、標準的な学年または社会人年数を返します。
 * @param {number} birthYear
 * @param {Date} date
 * @returns {string}
 */
export function getCurrentStage(birthYear, date = new Date()) {
  const academicYear = getAcademicYear(date);

  for (const stage of EDUCATION_STAGES) {
    const firstYear = birthYear + stage.startAge;
    const grade = academicYear - firstYear + 1;
    if (grade >= 1 && grade <= stage.duration) {
      return `${stage.label}${grade}年生`;
    }
  }

  const graduationYear = getGraduationYear(birthYear);
  if (academicYear >= graduationYear) {
    return `社会人${academicYear - graduationYear + 1}年目`;
  }

  return '未就学';
}
