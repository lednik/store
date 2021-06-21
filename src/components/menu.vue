<template>
    <div class="menu">
        <div
            v-link
            href="/about"
            class="menu__item"
            :class="{'inactive-route': $route.name == 'about'}"
        >
            О проекте
        </div>
        <div
            v-link
            href="/catalog"
            class="menu__item"
            :class="{'inactive-route': $route.name == 'catalog'}"
        >
            Каталог
        </div>
        <div
            v-link
            href="/tariffs"
            class="menu__item"
            :class="{'inactive-route': $route.name == 'tariffs'}"
        >
            Тарифы
        </div>
        <div
            v-link
            href="/contacts"
            class="menu__item"
            :class="{'inactive-route': $route.name == 'contacts'}"
        >
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

  },
  mounted() {
  }
}
</script>

<style lang="sass">
@import '~@styles/components/menu.sass'
</style>
