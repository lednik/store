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
          'pagination[filters][demo_file_id_isnotnull]': true,
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
        if(this.activeTags && this.activeTags.length > 0) {
          let array = []
          this.activeTags.forEach( item => {
            array.push(item.id)
          })
          let str = array.join(',')
          formData.append('pagination[filters][tag_id]', str)
        }
        if (this.min || this.max) {
          formData.append('pagination[filters][bpm_max]', this.max)
          formData.append('pagination[filters][bpm_min]', this.min)
        }
        return formData
    },
  },
  methods: {
      getTracks() {
        let action = 'track/track/list_ajax'
        let method = 'post'
        Vue.http[method](action, this.tracksData)
          .then(response => response.json())
          .then(data => {
            this.tracks  = data.table.records
          }, data => {
          })
      }
    },
    mounted() {
      this.getTracks()
    }
}
</script>
