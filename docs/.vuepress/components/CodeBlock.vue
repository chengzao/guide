<template>
  <div class="docs-demo-wrapper language-xxx">
    <div v-if="title" @click="toggle" class="docs-demo-title">{{title}}</div>
    <div :style="{height: isExpand ? 'auto' : '0'}" class="docs-demo-container">
      <div class="docs-demo docs-demo__code">
        <slot></slot>
      </div>
    </div>
    <span class="docs-trans" @click="toggle">{{isExpand ? '隐藏代码' : '显示代码'}}</span>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "点击查看>>"
    }
  },
  data() {
    return {
      isExpand: false
    };
  },
  methods: {
    toggle() {
      this.isExpand = !this.isExpand;
    }
  },
  mounted() {
    this.isExpand = this.show;
  }
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

.docs-demo-wrapper .docs-demo-title {
  font-size: 14px;
  margin-top: 15px;
  color: #0c51de;
  cursor: pointer;
}
</style>
