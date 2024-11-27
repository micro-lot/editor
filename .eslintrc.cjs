require("@duchi/eslint-config/patch");

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    // 공통 ESLint 컨피그 불러오기
    "@duchi/eslint-config/index",
  ],
  parserOptions: {
    /**
     * rushstack은 @typescript-eslint 플러그인을 내장하고 있으므로
     * 아래와 같이 tsconfig 경로를 명시해줘야합니다.
     */
    project: true,
    tsconfigRootDir: __dirname,
  },
};