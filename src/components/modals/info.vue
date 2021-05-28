<template>
  <div class="info">
    <div v-html="props.title" class="info__title modal__title">
    </div>
    <div class="info__text">
        {{ props.text }}
    </div>
    <div @click="closeModal" class="modal__button">
        Подтвердить
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
  name: 'tarif-card',
  data () {
    return {
    }
  },
  computed: {
      ...mapState('modal', ['props']),
  },
  methods: {
    ...mapMutations('modal', ['closeModal']),
    toRequest() {
      this.$emit('request', this.name)
    }
  }
}
</script>

<style lang="sass">
@import '~@styles/components/modals/info.sass'
</style>
