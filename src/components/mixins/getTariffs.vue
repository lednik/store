<script>
import Vue from 'vue'
import {mapMutations} from 'vuex';
// import {mapState, mapMutations} from 'vuex';
export default {
  data () {
    return {
      tarifs: []
    }
  },
  computed: {
    tariffsOptions() {
      let array = this.tarifs.map((tarif) => {
        return {
          id: tarif.id,
          name: `Тариф «${tarif.name}»`
        }
      });
      return array
    }
  },
  methods: {
    ...mapMutations('modal', ['showModal']),
    getTariffs() {
      let action = 'tariff/tariff/list_ajax'
      let method = 'post'
      Vue.http[method](action)
        .then(response => response.json())
        .then(data => {
          this.tarifs = data.table.records
        }, data => {
        })
    },
    toRequest($event) {
      this.showModal(
        {
          name: 'request',
          message: `Тариф «${$event}»`,
          list: this.tariffsOptions
        }
      )
    }
  },
  mounted() {
    this.getTariffs()
  }
}
</script>
