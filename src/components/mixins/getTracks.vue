<script>
import Vue from 'vue'
// import {mapMutations} from 'vuex';
import {mapState, mapMutations} from 'vuex';
export default {
  data () {
    return {
        tracks: [],
        tracksFilters: {
          // 'pagination[order]': 'rnd',
          'pagination[filters][demo_file_id_isnotnull]': true,
          'update': 1
        },
    }
  },
  computed: {
    ...mapState('playlist', ['id']),
    tracksData() {
      let data = {
        pagination: {
          filters: {
            demo_file_id_isnotnull: true
          }
        },
        update: 1
      }
      if(this.activeTags && this.activeTags.length > 0) {
        let array = []
        this.activeTags.forEach( item => {
          array.push(item.id)
        })
        let str = array.join(',')
        data.pagination.filters.tag_id = str
      }
      if (this.min || this.max) {
        data.pagination.filters.bpm_max = this.max
        data.pagination.filters.bpm_min = this.min
      }
      if(this.pageNumber || this.pageNumber == 0) {
        if(this.pageNumber != -1) {
          data.pagination.page_no = this.pageNumber
          let str = this.idNot.join(',')
          data.pagination.filters.id_not = str
        }
        else {
          data.pagination.order = 'rnd'
        }
      } else {
        data.pagination.order = 'rnd'
      }
      return JSON.stringify(data)
    },
  },
  methods: {
    ...mapMutations('playlist', ['pushToPlaylist']),
    getTracks() {
      let action = 'track/track/list_ajax'
      let method = 'post'
      Vue.http[method](action, this.tracksData)
        .then(response => response.json())
        .then(data => {
          this.tracks  = this.tracks.concat(data.table.records)
          if(this.pagesCount) {
            this.pagesCount = data.table.pagination.page_count
          }
          if(this.pageNumber == -1) {
            data.table.records.forEach(item => {
              this.idNot.push(item.id)
            })
          }
          else if(this.id == 'musicFromTags') {
            this.pushToPlaylist(data.table.records)
          }
        }, data => {
        })
    }
  },
  mounted() {
    this.getTracks()
  }
}
</script>
