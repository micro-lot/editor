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
  - plugin
  - command: 재사용 가능한 핵심 로직 (노드 생성 등)
- state
  - transaction
- view
