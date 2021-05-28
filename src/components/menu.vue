<template>
    <div class="menu">
        <div v-link href="/about" class="menu__item">
            О проекте
        </div>
        <div v-link href="/tariffs" class="menu__item">
            Тарифы
        </div>
        <div class="menu__item">
            Контакты
        </div>
        <a href="tel:88007001191" class="menu__item">
            8 800 700 11 91
        </a>
    </div>
</template>

<script>
export default {
  name: 'menu',
  props: [],
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="sass">
@import '~@styles/components/menu.sass'
</style>
