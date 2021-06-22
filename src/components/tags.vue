<template>
    <div class="tags">
        <div class="tags__top">
            <div class="tags__top-content tags__content">
                <div class="tags__title">
                    Все теги
                </div>
                <div class="arrow" @click="$emit('closeTags')">
                    <div class="arrow-content">
                        <div class="arrow__line arrow__line_first" />
                        <div class="arrow__line arrow__line_second" />
                    </div>
                </div>
            </div>
        </div>
        <div class="tags__list">
            <div class="tags__content">
                <div
                    v-for="(item, index) in tags"
                    class="catalog__tag tag unselect"
                    :class="{'tag_active': item.isActive}"
                    @click="toggleTag(item, index)"
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
        </div>
        <div class="tags__bottom">
            <div class="tags__content">
                <div @click="$emit('closeTags')" class="tags__button button__bg button">
                    Подтвердить выбор
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
    export default {
        props: ['activeTags', 'groupId'],
        data() {
            return {
                tags: []
            }
        },
        methods: {
            toggleTag(item, index) {
                this.tags[index].isActive = !this.tags[index].isActive
                this.$emit('toggletag', item)
            },
            getTags() {
                let action = 'track/tag/list_ajax'
                let method = 'post'
                let formData = new FormData()
                formData.append('pagination[filters][tag_group_id]', this.groupId)
                formData.append('pagination[page_size]', 'all')
                formData.append('pagination[order]', 'name')
                formData.append('pagination[dir]', 'asc')
                Vue.http[method](action, formData)
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
            },
            isTagActive(item) {
                let isItem = false
                this.activeTags.forEach(el => {
                    if(item.id == el.id) {
                        isItem = true
                    }
                })
                return isItem
            }
        },
        mounted() {
            this.getTags()
        }
    }
</script>

<style lang="sass" scoped>
@import '~@styles/components/tags.sass'
</style>