<script>
import Vue from 'vue'
// import {mapMutations} from 'vuex';
// import {mapState, mapMutations} from 'vuex';
export default {
  data () {
    return {
        tracks: [],
        tracksFilters: {
          'pagination[order]': 'rnd',
          'update': 1
        },
    }
  },
  computed: {
    tracksData() {
        let formData = new FormData()
        for (let key in this.tracksFilters) {
	    	  formData.append(`${key}`, this.tracksFilters[key])
	      }
        return formData
    },
  },
  methods: {
        // ...mapMutations('modal', ['showModal']),
      getTracks() {
        let action = 'track/track/list_ajax'
        let method = 'post'
        Vue.http[method](action, this.tracksData)
          .then(response => response.json())
          .then(data => {
            this.tracks = data.table.records
            console.log(data.table.records);
            resolve()
          }, data => {
            reject()
          })
      }
    },
    mounted() {
        this.getTracks()
    }
}
</script>
