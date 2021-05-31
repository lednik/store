<template>
    <div class="select" :class="{'select_active': isOptions}">
        <div 
            @click="toggleOptions"
            class="select__value select__item"
            v-click-outside="hideOptions"
        >
            <div class="select__text">
                {{ value }}
            </div>
            <div class="select__arrow">
                <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12L11 2L21 12" stroke="#202020" stroke-width="2"/>
                </svg>
            </div>
        </div>
        <transition name="show">
            <div v-if="isOptions" class="select__options">
                <div class="select__option select__item"
                    v-for="(item, index) in options"
                    @click="setValue(item.name)"
                    :key="`option-${index}`"
                >
                    {{ item.name }}
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'menu',
    props: ['options', 'startOption'],
    components: {
    },
    data () {
        return {
            isOptions: false,
            value: ''
        }
    },
    methods: {
        setValue(value) {
            this.hideOptions()
            this.value = value
            this.$emit('change-value', value)
        },
        toggleOptions() {
            console.log('showOptions');
            this.isOptions = !this.isOptions
        },
        hideOptions() {
            this.isOptions = false
        }
    },
    mounted() {
        this.value = this.startOption
    }
}
</script>

<style lang="sass">
@import '~@styles/components/ui/select.sass'
</style>
