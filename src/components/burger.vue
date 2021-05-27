<template>
  <div @click="burgerClick" class="burger" :class="{'burger_open': isOpen}">
      <div class="burger__top burger__line" />
      <div class="burger__center burger__line" />
      <div class="burger__bottom burger__line" />
  </div>
</template>

<script>
export default {
  name: 'burger',
  props: ['isOpen'],
  data () {
    return {
    }
  },
  methods: {
    burgerClick() {
        console.log('emit');
        this.$emit('burger-click')
    }
  }
}
</script>

<style lang="sass">
@import '~@styles/components/burger.sass'
</style>
