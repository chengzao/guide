<template>
  <div class="docs-demo-wrapper language-xxx">
    <!-- <div
      v-if="title"
      @click="toggle"
      class="docs-demo-title"
      :title="title + ' - 点击我展开/折叠'"
    >{{title}} - 点击我展开/折叠</div> -->
    <div :style="{height: isExpand ? 'auto' : '0'}" class="docs-demo-container">
      <div class="docs-demo docs-demo__code" :class="{'open': !isOpen}">
        <slot></slot>
      </div>
    </div>
    <span class="docs-trans" @click="open">{{isOpen ? '折叠代码' : '展开代码'}}</span>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    show: {
      type: String,
      default: "true",
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isExpand: false,
      isOpen: false
    };
  },
  methods: {
    toggle() {
      this.isExpand = !this.isExpand;
    },
    open(){
      this.isOpen = !this.isOpen;
    }
  },
  mounted() {
    this.isExpand = this.show == "false" ? false : true;
  },
};
</script>

<style>
.docs-demo-wrapper.language-xxx {
  background-color: transparent;
}
.docs-demo-wrapper .docs-demo-container {
  transition: max-height 0.3s ease;
  overflow: hidden;
  margin-top: 15px;
}
.docs-demo-wrapper .docs-demo {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  font-size: 14px;
  /* background-color: #f7f7f7; */
  border: 1px solid #e2ecf4;
  /* border-top: none; */
  /* max-height: 500px; */
}

.docs-demo-wrapper .docs-trans {
  width: 100%;
  text-align: center;
  display: inline-block;
  color: #0c84de;
  font-size: 12px;
  padding: 10px 0;
  background-color: #e7ebec;
  cursor: pointer;
}
.docs-demo-wrapper .docs-demo__code {
  padding: 0 10px;
  /* overflow-y: auto; */
}
.docs-demo-wrapper .docs-demo__code.open{
  max-height: 500px;
  overflow: auto;
}

.docs-demo-wrapper .docs-demo-title {
  font-size: 14px;
  margin-top: 15px;
  color: #0c51de;
  cursor: pointer;
}
</style>
