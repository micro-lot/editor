## How to run a demo

```shell
npm run dev
```

## Folder structure

```plain
src/
  some-node/
    commands/
      some-command.ts
      index.ts
    plugins/
      some-plugin.ts
      index.ts
    schemas/
      some-node.ts
      index.ts
    some-folders/
      index.ts
```

- model
  - schema
    - mark: 텍스트 스타일링 (일부에만 적용하는 - 굵게, 기울임, 밑줄 ...)
    - attrs: 노드의 구조적 속성 (전체 노드에 영향)
  - plugin
  - command: 재사용 가능한 핵심 로직 (노드 생성 등)
- state
  - transaction
- view

# 간이 문서

### Core

에디터에서 주요한 기능, 공통으로 사용할 수 있는 기능을 모아둔 폴더

#### 요소의 공통 스타일링

`schemas/layout.ts`, `definitions/types.ts` 참고

정의하고자 하는 스키마에 공통 스타일 속성을 추가하고자 하는 경우

1. 스키마 인터페이스 정의 시 `{Style}Attributes` 인터페이스 상속

```ts
interface SomeNodeAttributes extends MarginAttributes {
  // ... 다른 속성
}
```

2. 노드 스펙 타입 정의 시 `{Style}edNodeSpec` 추가

```ts
type SomeNodeSpec = NodeSpec & MarginedNodeSpec;

// 또는

interface SomeNodeSpec extends NodeSpec, MarginedNodeSpec {
  // ... 다른 속성
}
```

3. 스키마에 정의

```ts
const nodeSpec: SomeNodeSpec = {
  // ...
  attrs: {
    // ...
    marginTop: { default: 0 },
    marginRight: { default: 0 },
    marginBottom: { default: 0 },
    marginLeft: { default: 0 },
  },
  // 메타데이터에 사용할 스타일 속성 명시해야함!
  meta: {
    applicableStyles: {
      margin: true,
    },
  },
  // parseDOM, toDOM 적절히 처리
  parseDOM: [],
  toDOM(node) {},
};
```
