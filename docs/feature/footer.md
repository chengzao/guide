# Footer

footer content

## vuepress-plugin-demo-code

::: demo
<template>
   <div>
    {{msg}} -- {{count}}
    <button class="animated shake infinite" @click="onClick">Click me!</button>
   </div>
</template>

<script>
export default {
  data(){
    return{
      msg: "Hello",
      count: 0
    }
  },
    methods: {
        onClick(){
          this.count++
        }
    },
}
</script>

<style>
button {
    color: blue;
}
</style>
:::

## other

::: demo html
<p class="common-html">
    {{count}} <button @click="onClick">Click</button>
    this is <span style="color: red;">common</span> html
</p>

<script>
export default {
  data(){
    return{
      msg: "Hello",
      count: 0
    }
  },
  methods: {
      onClick(){
        this.count++
      }
  },
}
</script>

<style>
.common-html {
    color: green;
}
</style>
:::
