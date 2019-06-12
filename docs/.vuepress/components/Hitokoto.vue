<template>
  <div v-if="hitokoto.hitokoto">
    <!-- <div class="center">{{hitokoto.hitokoto}} ---{{hitokoto.from}}</div> -->
    <vue-typer
      :repeat="0"
      :shuffle="false"
      initial-action="typing"
      :pre-type-delay="1000"
      :type-delay="200"
      :pre-erase-delay="2000"
      :erase-delay="250"
      erase-style="select-all"
      :erase-on-complete="false"
      caret-animation="blink"
      :text="hitokoto.msg"
    ></vue-typer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      hitokoto: {}
    };
  },
  async created() {
    try {
      const result = await axios.get("https://v1.hitokoto.cn");
      const { hitokoto, from } = result.data;
      this.hitokoto = {
        hitokoto: hitokoto,
        from: from,
        msg: `${hitokoto}  -- ${from}`
      };
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.center {
  text-align: center;
  padding-bottom: 6px;
}
</style>
