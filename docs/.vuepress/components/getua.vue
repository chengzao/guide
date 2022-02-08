<template>
  <div>
    <ClientOnly>
      <div class="viewBox" v-for="(value, index) in viewBoxes" :key="index" >
        <div class="viewBox-content-item">
          <p class="viewBox-content-text">{{ index }} : {{value}}</p>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
  export default {
    name: 'GetUa',
    data () {
      return {
        viewBoxes: {}
      }
    },
    mounted() {
      if(!window) return
      var localStore = [], sessionStore = [];
        for (var i = 0; i < localStorage.length; i++) {
          localStore.push({ key: localStorage.key(i), value: localStorage.getItem(localStorage.key(i)) });
        }
        for (var i = 0; i < sessionStorage.length; i++) {
          sessionStore.push({ key: sessionStorage.key(i), value: sessionStorage.getItem(sessionStorage.key(i)) });
        }
        this.viewBoxes = {
          ua: window.navigator.userAgent,
          dpr: window.devicePixelRatio,
          colorDepth: screen.colorDepth,
          pixelDepth: screen.pixelDepth,
          outerWidth: window.outerWidth,
          outerHeight: window.outerHeight,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          screenWidth: screen.width,
          screenHeight: screen.height,
          localStore: localStore,
          sessionStore: sessionStore
        };
    }
  }
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
}

.viewBox .viewBox-content-text{
  line-height: 1.5;
}
</style>
