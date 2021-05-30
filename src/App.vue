<template>
<div class="app">
   <Header />
  <transition name="page">
    <router-view></router-view>
  </transition>
  <Footer :class="{'footer_height': currentIndex != -1}" />
  <Modal />
  <transition name="player">
    <Player v-if="currentIndex != -1" />
  </transition>
</div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex';
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
  computed: {
    ...mapState('playlist', ['currentIndex']),
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
