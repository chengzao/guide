<template>
  <div>
    <div @click="handleClick" class="icon-codepen">👉&nbsp;<svg class="codeopen-svg" xmlns="http://www.w3.org/2000/svg" viewBox="20 0 26 26" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" role="img" aria-label="Edit on CodePen">
<path id="icon-codepen-box" d="M22 16.7L33 24l11-7.3V9.3L33 2 22 9.3v7.4zm22 0L33 9.3l-11 7.4m0-7.4l11 7.3 11-7.3M33 2v7.3m0 7.4V24"></path>
</svg>codepen online&nbsp;👈</div>
    <ClientOnly>
        <iframe
          v-show="show"
          height="400"
          style="width: 100%;overflow:auto;border:none;outline:none;"
          scrolling="no"
          :src="iframeSrc"
          frameborder="no"
          loading="lazy"
          allowtransparency="true"
          allowfullscreen="true"
        ></iframe>
    </ClientOnly>
    <a class="showUrl" :href="codePenUrl" target="_blank" rel="noopener noreferrer" alt="codepen"><svg class="codeopen-svg" xmlns="http://www.w3.org/2000/svg" viewBox="20 0 26 26" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" role="img" aria-label="Edit on CodePen">
<path d="M22 16.7L33 24l11-7.3V9.3L33 2 22 9.3v7.4zm22 0L33 9.3l-11 7.4m0-7.4l11 7.3 11-7.3M33 2v7.3m0 7.4V24"></path>
</svg>{{codePenUrl}}</a>
  </div>
</template>

<script>

  export default {
    props: ['slug', 'user', 'src'],
    data() {
      return {
        show: false,
      }
    },
    computed: {
      iframeSrc: function () {
        let query = '?height=300&theme-id=0&default-tab=result&editable=true'
        return `https://codepen.io/${this.user || 'chengzao'}/embed/preview/${this.slug}/${query}`
      },
      codePenUrl: function () {
        return `https://codepen.io/${this.user || 'chengzao'}/pen/${this.slug}/`
      }
    },
    methods: {
      handleClick: function () {
        this.show = !this.show
      }
    }
  }
</script>

<style scoped>
.icon-codepen{
  display: none;
  cursor: pointer;
  margin-bottom: 5px;
  width: fit-content;
}

.codeopen-svg{
  width: 20px;
  height: 20px;
  display: block;
  margin-right: 5px;
  stroke: var(--text-color);
}

.showUrl{
  display: flex;
  word-break: break-word;
  word-wrap:break-word;
  margin-bottom: 5px;
  text-decoration: underline;
}

@media screen and (min-width: 1200px) {
  .icon-codepen {
    display: flex;
  }
  .showUrl{
    display: none;
  }

}
</style>
