<template>
    <div>
        <div class="bpm" ref="parent">
            <div ref="left" class="bpm__left bpm__circle">
                <div class="bpm__circle-wrapper">
                    <div ref="leftvalue" class="bpm__value bpm__value_left">
                        {{min}} BPM
                    </div>
                </div>
            </div>
            <div ref="right" class="bpm__right bpm__circle">
                <div class="bpm__circle-wrapper">
                    <div ref="rightvalue" class="bpm__value bpm__value_right">
                        {{max}} BPM
                    </div>
                </div>
            </div>
            <div class="bpm__progress">
                <div class="bpm__line bpm__line_inactive"/>
                <div ref="line" class="bpm__line"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['bpmrefresh'],
        data() {
            return {
                min: 0,
                max: 200,
                isMobile: false,
                closestCircle: ''
            }
        },
        watch: {
            'bpmrefresh': function() {
                this.resetBpm()
            }
        },
        methods: {
            resetBpm() {
                
                this.$refs.line.style.transition = '0.3s'
                this.$refs.right.style.transition = '0.3s'
                this.$refs.left.style.transition = '0.3s'

                this.$refs.line.style.left = '0%'
                this.$refs.left.style.left = '0%'
                this.$refs.line.style.width = '100%'
                this.$refs.right.style.left = '100%'
                this.$refs.leftvalue.style.transform = 'translateX(0)'
                this.$refs.rightvalue.style.transform = 'translateX(0)'

                setTimeout(() => {
                    this.$refs.line.style.transition = '0s'
                    this.$refs.right.style.transition = '0s'
                    this.$refs.left.style.transition = '0s'
                }, 300);
            },
            emitToParent() {
                this.$emit('bpm', {min: this.min, max: this.max})
            },
            startEvents() {
                let event = this.isMobile ? 'ontouchstart' : 'onmousedown'
			    let moveEvent = this.isMobile ? 'ontouchmove' : 'onmousemove'
			    let endEvent = this.isMobile ? 'ontouchend' : 'onmouseup'

                this.$refs.parent[event] = (e) => {
                    this.setClosestCircle(e)
                    document[moveEvent] = (e) => {
                        this.refreshBpm(e)
                    }
                    document[endEvent] = (e) => {
                        this.refreshBpm(e)
                        document[moveEvent] = null
                        document[endEvent] = null
                        this.emitToParent()
                    }
                }
            },
            dragAndDropPosition(e) {
                let rect = this.$refs.parent.getBoundingClientRect()
                let x
                if(e.pageX) {
                    x = e.pageX
                } else if(e.touches[0] && e.touches[0].clientX) {
                    x = e.touches[0].clientX
                } else {
                    x = e.changedTouches[0].clientX
                }

                let value
                if (x < rect.left) {
                    value = 0
                } else if (x > rect.right) {
                    value = 1
                } else {
                    value =  (x - rect.left) / (rect.right - rect.left)
                }
                return value
            },
            dragItem(e) {
                let position = this.dragAndDropPosition(e) * 100
                // let circle = this.getClosestCircle(position)
                return position
            },
            getNumberByStyle(ref) {
                let style = this.$refs[ref].style.left
                let str = style.split('%')
                let number = Number(str[0])
                return number
            },
            setClosestCircle(e) {
                let position = this.dragAndDropPosition(e) * 100
                let left = this.getNumberByStyle('left')
                let right = this.getNumberByStyle('right')
                this.closestCircle = Math.abs(left - position) < Math.abs(right - position) ? 'left' : 'right'
            },
            refreshBpm(e) {
                let position = this.dragItem(e)
                let right = this.getNumberByStyle('right')
                let left = this.getNumberByStyle('left')
                if(this.closestCircle == 'left' && position < right && Math.abs(right - position) > 3) {
                    this.$refs.leftvalue.style.transform = left > 20 ? 'translateX(-100%)' : 'translateX(0)'
                    let width = right - position
                    this.$refs.left.style.left = position + '%'
                    this.$refs.line.style.left = position + '%'
                    this.min = Math.floor( 200 * position / 100 )
                    this.$refs.line.style.width = width + '%'
                } else if(this.closestCircle == 'right' && position > left && Math.abs(left - position) > 3) {
                    this.$refs.rightvalue.style.transform = right < 80 ? 'translateX(100%)' : 'translateX(0)'
                    let width = position - left
                    this.$refs.right.style.left = position + '%'
                    this.$refs.line.style.width = width + '%'
                    this.max = Math.floor( 200 * position / 100 )
                }
            }
        },
        mounted() {
            this.$refs.left.style.left = '0%'
            this.$refs.right.style.left = '100%'
            let screenWidth = window.innerWidth
            if (screenWidth < 768) {
                this.isMobile = true
            }
            this.startEvents()
        }
    }
</script>

<style lang="sass" scoped>
@import '~@styles/components/bpm.sass'
</style>