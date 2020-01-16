<template>
  <div class="feature-gist">
    <p>vue template in markdown : {{ ver }}</p>
    <h1>Click Button : {{count}}</h1>
    <button @click="AddCount">Click Me Add Count</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ver: "",
      count: 0
    };
  },
  methods: {
    AddCount() {
      this.count++;
    }
  },
  mounted() {
    import("./gist.js").then(module => {
      this.ver = module.version;
    });
  }
};
</script>

<style scope>
.feature-gist p {
  color: red;
}
</style>
