<template>
  <div class="specialLayout">
    <div class="specialLayout__center m10">当前时间：{{ time }}</div>
    <Hitokoto/>
    <div class="specialLayout-content">
      <Content/>
    </div>
    <div class="specialLayout__center">$page时间：{{ updateTime }}</div>
  </div>
</template>

<script>
import { formatDateTime } from "../libs/tools";
import Hitokoto from "./Hitokoto";
export default {
  data() {
    return {
      time: formatDateTime(+new Date(), "YYYY-MM-DD hh:mm:ss")
    };
  },
  components: {
    Hitokoto
  },
  computed: {
    updateTime() {
      return (
        this.$page.frontmatter.time || formatDateTime(+new Date(), "YYYY-MM-DD")
      );
    }
  },
  methods: {
    currentTime() {
      this.time = formatDateTime(+new Date(), "YYYY-MM-DD hh:mm:ss");
    }
  },
  mounted() {
    setInterval(() => {
      this.currentTime();
    }, 1000);
  }
};
</script>

<style scoped>
.specialLayout__center {
  text-align: center;
}
.specialLayout__center.m10 {
  margin: 10px;
}
.specialLayout .specialLayout-content {
  text-align: center;
  width: 80%;
  margin: 0 auto;
}
</style>
