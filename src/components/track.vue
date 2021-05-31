<template>
  <div class="track" @click="$emit('click')">
    <div class="track__button">
      <svg v-if="playing" class="track__play track__icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="2" width="6" height="28" fill="white"/>
      <rect x="20" y="2" width="6" height="28" fill="white"/>
      </svg>
      <svg v-else class="track__play track__icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 28V0L28 13.7021L0 28Z" fill="white"/>
      </svg>
    </div>
    <div class="track__info">
      <div class="track__name">
        <template v-if="name && name != ''">
          {{ name }}
        </template>
        <template v-else>
          bubuka music
        </template>
      </div>
      <div class="track__author">
        <template v-if="author && author != ''">
          {{ author }}
        </template>
        <template v-else>
          Bubuka music
        </template>
      </div>
    </div>
    <div class="track__time">
      {{ time }}
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex';
export default {
  name: 'gradient-bg-button',
  props: ['id', 'name', 'author', 'time'],
  computed: {
    ...mapState('playlist', ['isPlaying', 'currentIndex']),
    ...mapGetters('playlist', ['getTrack']),
  },
  watch: {
    'isPlaying': function () {
      if (this.getTrack.id == this.id && this.isPlaying == true) {
        this.playing = true
      } else {
        this.playing = false
      }
    },
    'currentIndex': function () {
      if (this.getTrack.id == this.id && this.isPlaying == true) {
        this.playing = true
      } else {
        this.playing = false
      }
    }
  },
  data () {
    return {
      playing: false
    }
  }
}
</script>

<style lang="sass">
@import '~@styles/components/track.sass'
</style>
