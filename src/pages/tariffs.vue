<template>
    <div class="tariffs page">
        <tariff
            v-for="item in tarifs"
            :name="item.name"
            :id="item.id"
            :altName="item.altName"
            :about="item.description"
            :price="item.price"
            :img="item.cover_img_id_url"
            @request="toRequest"
            :key="`tariff-${item.id}`" 
        />
    </div>
</template>

<script>
// import {mapState, mapMutations} from 'vuex';
import getTariffs from '@components/mixins/getTariffs'
import tariff from '@components/tariff'
export default {
  name: 'tariffs',
  mixins: [getTariffs],
  components: {
    tariff
  },
  data () {
    return {
        filters: []
    }
  },
  computed: {
    //   ...mapState('modal', ['props']),
  },
  methods: {
    // ...mapMutations('modal', ['closeModal']),
  },
  mounted() {
    this.getTariffs()
  }
}
</script>

<style lang="sass">
@import '~@styles/pages/tariffs.sass'
</style>
