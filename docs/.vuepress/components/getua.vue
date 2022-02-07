<template>
  <div>
    <ClientOnly>
      <div class="viewBox" v-for="(value, index) in viewBoxes" :key="index" >
        <div class="viewBox-content-item">
          <p>{{ index }} : {{value}}</p>
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
      var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
      var localStore = [], sessionStore = [];
        for (var i = 0; i < localStorage.length; i++) {
          localStore.push({ key: localStorage.key(i), value: localStorage.getItem(localStorage.key(i)) });
        }
        for (var i = 0; i < sessionStorage.length; i++) {
          sessionStore.push({ key: sessionStorage.key(i), value: sessionStorage.getItem(sessionStorage.key(i)) });
        }
        this.viewBoxes = {
          href: window.location.href,
          language: window.navigator.language,
          dpr: window.devicePixelRatio,
          ua: window.navigator.userAgent,
          orientation: orientation,
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

.item {
  margin-bottom: 10px;
}
</style>
