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
