<template>
  <div class="touch-page-menu">
    <div class="menu-icon" v-show="items.length > 3">
      <span @click="show = !show" >
        <svg viewBox="0 0 100 80" width="26" height="26">
          <rect width="100" height="20" rx="8"></rect>
          <rect y="30" width="100" height="20" rx="8"></rect>
          <rect y="60" width="100" height="20" rx="8"></rect>
        </svg>
      </span>
    </div>
    <div class="menu-content" v-show="show">
      <div class="item" v-for="item in items" :key="item.slug" @click.prevent="redirectTo(item)">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [],
        show: false
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.items.push(...this.$page.headers)
      })
    },
    watch: {
      '$page.relativePath': {
        handler (val) {
          this.items = this.$page.headers
        },
        deep: true
      },
    },
    methods:{
      redirectTo(item){
        this.$router.push({ hash: '#'+item.slug })
        this.show = false
      },
    },
    beforeDestroy () {
      this.items = []
    },
  }
</script>

<style scoped>
.touch-page-menu{
  position: fixed;
  bottom: 1rem;
  right: 0;
  transform: translate(-50%, -50%);
  width: 26px;
  height: 26px;
  z-index: 6;
  padding: 5px;
  border-radius: 4px;
  display: none;
}

.touch-page-menu .menu-icon{
  fill: #3eaf7c;
  box-shadow: var(--box-shadow);
}

.menu-content{
  position: absolute;
  bottom: 28px;
  right: 28px;
  max-width: 12rem;
  width: 10rem;
  max-height: 18.8rem;
  font-size: 0.8rem;
  padding: 10px;
  background-color: var(--background-color);
  border-radius: 10px;
  color: var(--text-color);
  box-shadow: var(--box-shadow);
  overflow: auto;
}

.menu-content .item{
  margin-bottom: 10px;
}

</style>
