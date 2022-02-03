<template>
  <component v-if="dynamicComponent" :is="dynamicComponent"></component>
</template>
<script>
export default {
  data() {
    return {
      dynamicComponent: null
    };
  },
  mounted() {
    import("./Todo").then(module => {
      this.dynamicComponent = module.default;
    });
  }
};
</script>
