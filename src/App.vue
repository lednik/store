<template>
<div class="app">
   <Header />
  <transition name="page">
    <router-view></router-view>
  </transition>
  <Footer :class="{'footer_height': isPlayer}" />
  <Modal />
  <Player v-if="isPlayer" />
</div>
</template>

<script>
import Header from '@layout/header'
import Footer from '@layout/footer'
import Modal from '@components/modal'
import Player from '@components/player'
export default {
  name: 'app',
  components: {
    Header,
    Footer,
    Modal,
    Player
  },
  data () {
    return {
      isPlayer: true
    }
  }
}
</script>

<style lang="sass">
</style>
