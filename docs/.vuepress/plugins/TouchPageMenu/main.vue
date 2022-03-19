<template>
  <div class="touch-page-menu">
    <div class="menu-icon">
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
        window.addEventListener('click', this.handleClick)
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
      handleClick(ev){
        if(!this.$el.contains(ev.target)){
          this.show = false
        }
      }
    },
    beforeDestroy () {
      this.items = []
      window.removeEventListener('click', this.handleClick)
    },
    beforeRouteLeave(){
      console.log('beforeRouteLeave')
    }
  }
</script>

<style scoped>
.touch-page-menu{
  position: fixed;
  bottom: 0;
  right: 0;
  transform: translate(-50%, -50%);
  width: 26px;
  height: 26px;
  fill: #3eaf7c;
  z-index: 9999;
}

.menu-content{
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 18px;
  padding: 10px;
  background: #000;
  border-radius: 10px;
  color: white;
}

.menu-content .item{
  margin-bottom: 10px;
}

</style>