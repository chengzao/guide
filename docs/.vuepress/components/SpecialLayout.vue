<template>
  <div class="specialLayout">
    <div class="specialLayout__center">时间：{{ updateTime }}</div>
    <div class="specialLayout-content">
      <Content/>
    </div>
  </div>
</template>

<script>
import { formatDateTime } from "../utils/tools";

export default {
  mounted() {
    // console.log(this.$page);
  },
  computed: {
    updateTime() {
      return (
        this.$page.frontmatter.time ||
        formatDateTime(+new Date(), "YYYY-MM-DD hh:mm:ss")
      );
    }
  }
};
</script>

<style scoped>
.specialLayout__center {
  text-align: center;
}
.specialLayout .specialLayout-content {
  text-align: center;
  width: 80%;
  margin: 0 auto;
}
</style>
