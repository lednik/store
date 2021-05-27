<template>
<div class="app">
   <Header />
  <transition name="page">
    <router-view></router-view>
  </transition>
  <Footer />
</div>
</template>

<script>
import Header from '@layout/header'
import Footer from '@layout/footer'
export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="sass">
</style>
