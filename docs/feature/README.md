# feature

- [SpecialLayout](./custom.md)

- [Jump](./Jump/)

- [Gist](./gist.md)


- import md file

<<< @/docs/feature/footer.md

<CodeBlock>

```bash
<<< @/docs/feature/footer.md
```

</CodeBlock>

- import js file

<<< @/docs/feature/gist.js{2}

<CodeBlock>

```bash
<<< @/docs/feature/gist.js{2}
```

</CodeBlock>

- import vue file

<Hitokoto />

<CodeBlock>

```vue
<Hitokoto />
```

</CodeBlock>

- use vue 指令

{{ 1+2 }}

<CodeBlock>

```vue
{{ 1+2 }}
```

</CodeBlock>

- ClientOnly: Todo vue 组件

<ClientOnly>
  <Todo />
</ClientOnly>

<CodeBlock>

```vue
<ClientOnly>
  <Todo />
</ClientOnly>
```

</CodeBlock>
