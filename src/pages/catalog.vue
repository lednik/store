<template>
  <div class="catalog page">
    <div class="catalog__groups">
      <p
        v-for="item in groups"
        class="catalog__group"
        :class="{'catalog__group_active': activeGroup == item.name}"
        @click="showGroup(item)"
        :key="item.id"
      >
        {{item.name}}
      </p>
    </div>
    <div v-if="activeGroup == 'Подборки'" class="catalog__collections">
      <collection-card
        v-for="item in collections"
        class="collection-card"
        @click="showCollection(item.id)"
        :item="item"
        :key="item.id"
      ></collection-card>
    </div>
    <collection-cmp v-else-if="activeGroup == 'Подборка'" :id="collectionId" />
    <template v-else>
      <div v-if="tags.length > 0" class="catalog__tags">
        <div
          v-for="item in tags"
          class="catalog__tag tag"
          :class="{'tag_active': item.isActive}"
          @click="addTag(item)"
          :key="item.id"
        >
          <span class="tag__name">
            {{item.name}}
          </span>
          <div class="tag__icon">
            <div class="tag__line tag__line_1"/>
            <div class="tag__line tag__line_2"/>
          </div>
        </div>
      </div>
      <bpm-cmp @bpm="setBpm" v-show="activeGroup == 'BPM'" />
      <div class="catalog__activeTags">
        <div
          v-for="item in activeTags"
          class="catalog__activeTag tag tag_active"
          @click="addTag(item)"
          :key="item.id"
        >
          <span class="tag__name">
            {{item.name}}
          </span>
          <div class="tag__icon">
            <div class="tag__line tag__line_1"/>
            <div class="tag__line tag__line_2"/>
          </div>
        </div>
      </div>
      <div class="catalog__tracks">
        <track-cmp
          v-for="(item,index) in tracks"
          :id="item.id"
          :name="item.title"
          :author="item.artist"
          :time="item.duration_str"
          @click="startPlaylist(index, tracks)"
          :key="item.id"
        />
      </div>
      
    </template>
  </div>
</template>

<script>
import Vue from 'vue'
import collectionCard from '@components/collection-card'
import collection from '@components/collection'
import Track from '@components/track'
import Bpm from '@components/bpm'
import getTracks from '@components/mixins/getTracks'
import {mapMutations} from 'vuex';
  export default {
    name: 'catalog',
    mixins: [getTracks],
    components: {
      'collection-card': collectionCard,
      'collection-cmp': collection,
      'track-cmp': Track,
      'bpm-cmp': Bpm
    },
    data() {
      return {
        groups: [
          {
            name: 'Подборки',
            isActive: true
          }
        ],
        collectionId: '',
        activeGroup: 'Подборки',
        tags: [],
        activeTags: [],
        collections: [],
        min: 0,
        max: 200
      }
    },
    watch: {
      'activeTags' : function () {
        this.getTracks()
      },
      'min' : function() {
        this.getTracks()
      },
      'max' : function() {
        this.getTracks()
      }
    },
    methods: {
      ...mapMutations('playlist', ['setPlaylist']),
      showCollection(id) {
        this.collectionId = id
        this.showGroup({name: 'Подборка'})
      },
      startPlaylist(index, tracks) {
        this.setPlaylist({
          playlist: tracks,
          index
        })
      },
      setBpm($event) {
        this.min = $event.min
        this.max = $event.max
      },
      tagsData(id) {
        let formData = new FormData()
        formData.append('pagination[filters][tag_group_id]', id)
        return formData
      },
      collectionsData() {
        let formData = new FormData()
        formData.append('pagination[filters][page_size]', 25)
        return formData
      },
      tagIndex(item, inActiveTags = false) {
        let array = inActiveTags ? 'activeTags' : 'tags'
        let index = undefined
        for (let i = 0; i < this[array].length; i++) {
          if(this[array][i].id == item.id) {
            index = i
            break
          }
        }
        return index
      },
      isTagActive(item) {
        let isItem = false
        this.activeTags.forEach(el => {
          if(item.id == el.id) {
            isItem = true
          }
        })
        return isItem
      },
      addTag(item) {
        let index = this.tagIndex(item)
        if(index == 0 || index) {
          this.tags[index].isActive = !this.tags[index].isActive
        }
        if(this.isTagActive(item)) {
          this.activeTags.splice(this.tagIndex(item, true), 1)
        } else {
          this.activeTags.push(item)
        }
      },
      getGroups() {
        let action = 'track/tag_group/list_ajax'
        let method = 'get'
        Vue.http[method](action)
          .then(response => response.json())
          .then(data => {
            let newGroups = data.table.records
            let mapedGroups = newGroups.map((item) => {
              let el = item
              el.isActive = false
              return el
            })
            this.groups = this.groups.concat(mapedGroups)
            this.groups.push({
              name: 'BPM',
              isActive: false
            })
          }, data => {
          })
      },
      getCollections() {
        let action = 'track/collection/list_ajax'
        let method = 'post'
        let formdata = this.collectionsData()
        Vue.http[method](action, formdata)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.collections = data.table.records
          }, data => {
          })
      },
      showGroup(item) {
        this.activeGroup = item.name
        if(item.name == 'Подборки') {
          this.tags = []
          this.getCollections()
        }
        if(item.name == 'collection') {
          this.activeGroup = item.name
        }
        if(item.name == 'BPM') {
          this.tags = []
        }
        else {
          this.getTags(item.id)
        }
      },
      getTags(id) {
        let action = 'track/tag/list_ajax'
        let method = 'post'
        let formdata = this.tagsData(id)
        Vue.http[method](action, formdata)
          .then(response => response.json())
          .then(data => {
            let mapedTags = data.table.records.map((item) => {
              let el = item
              el.isActive = this.isTagActive(el) ? true : false
              return el
            })
            this.tags = mapedTags
          }, data => {
          })
      }
    },
    mounted() {
      this.getGroups()
      this.getCollections()
    },
  }
</script>

<style lang="sass" scoped>
@import '~@styles/pages/catalog.sass'
</style>