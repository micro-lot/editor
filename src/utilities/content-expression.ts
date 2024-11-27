/**
 * 하나 이상 (`+`)
 */
export const oneOrMore = (contentExpression: string) => {
  return `${contentExpression}+`;
};

/**
 * 0개 이상 (`*`)
 */
export const zeroOrMore = (contentExpression: string) => {
  return `${contentExpression}*`;
};

/**
 * 0개 또는 하나 (`?`)
 */
export const zeroOrOne = (contentExpression: string) => {
  return `${contentExpression}?`;
};

/**
 * contentExpressions[] 순서에 따라 시퀀스를 만들어줍니다.
 * 예) 'heading paragraph+' -> 제목 그리고 하나 이상의 문단
 */
export const createSequence = (contentExpressions: string[]) => {
  return contentExpressions.join(' ');
};

/**
 * contentExpressions[] 배열의 표현식 중 하나를 선택할 수 있습니다.
 */
export const or = (contentExpressions: string[]) => {
  return contentExpressions.join(' | ');
};
