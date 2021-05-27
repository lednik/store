<template>
<div class="app">
   <Header />
  <transition name="page">
    <router-view></router-view>
  </transition>
  <Footer />
  <Modal />
</div>
</template>

<script>
import Header from '@layout/header'
import Footer from '@layout/footer'
import Modal from '@components/modal'
export default {
  name: 'app',
  components: {
    Header,
    Footer,
    Modal
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
