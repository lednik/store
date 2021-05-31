<template>
<div class="request">
    <div class="request__title modal__title">
        Оставить заявку
    </div>
    <div class="request__form">
        <select-cmp 
          class="request__select"
          :options="list"
          :startOption="message"
          @change-value="setTarifId($event)"
        />
        <div class="input__wrapper">
            <transition name="fade">
              <div v-if="form.name.error" class="input__error">
                Введите Ваше имя
              </div>
            </transition>
            <input
              v-model="form.name.value"
              type="text"
              class="input"
              placeholder="Ваше имя*"
              :class="{'t-input__error' : form.name.error}"
              @input="form.name.error = false"
            >
        </div>
        <div class="input__wrapper">
            <transition name="fade">
              <div v-if="form.phone.error" class="input__error">
                Неверный номер телефона
              </div>
            </transition>
            <input
              v-model="form.phone.value"
              v-mask="'+# (###) ### ## ##'"
              type="text"
              class="input"
              placeholder="+7 (___) ___ __ __"
              :class="{'t-input__error' : form.phone.error}"
              @input="form.phone.error = false"
            >
        </div>
        <div class="input__wrapper">
            <transition name="fade">
              <div v-if="form.email.error" class="input__error">
                Неверный e-mail
              </div>
            </transition>
            <input
              v-model="form.email.value"
              type="text"
              class="input"
              placeholder="Ваш e-mail*"
              :class="{'t-input__error' : form.email.error}"
              @input="form.email.error = false"
            >
        </div>
        <div class="input__wrapper">
            <transition name="fade">
              <div v-if="form.country.error" class="input__error">
                Введите страну
              </div>
            </transition>
            <input
              v-model="form.country.value"
              type="text"
              class="input"
              placeholder="Ваша страна*"
              :class="{'t-input__error' : form.country.error}"
              @input="form.country.error = false"
            >
        </div>
        <div class="input__wrapper">
            <transition name="fade">
              <div v-if="form.city.error" class="input__error">
                Введите город
              </div>
            </transition>
            <input
              v-model="form.city.value"
              type="text"
              class="input"
              placeholder="Ваш город*"
              :class="{'t-input__error' : form.city.error}"
              @input="form.city.error = false"
            >
        </div>
        <div class="input__wrapper">
            <!-- <transition name="fade">
              <div v-if="form.company.error" class="input__error">
                Ошибки.нет
              </div>
            </transition> -->
            <input
              v-model="form.company.value"
              type="text"
              class="input"
              placeholder="Название организации"
              :class="{'t-input__error' : form.company.error}"
              @input="form.company.error = false"
            >
        </div>
    </div>
    <div class="request__files">
        Оставляя заявку, вы соглашаетесь с <a class="request__file" href="#">условиями пользовательского соглашения</a> и <a class="request__file" href="#"> политикой конфиденциальности</a>
    </div>
    <div @click="sendForm" class="request__button modal__button">
        Подтвердить
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import Select from '@ui/select'
import {mapState, mapMutations} from 'vuex';
export default {
  name: 'request',
  components: {
    'select-cmp': Select
  },
  data () {
    return {
        form: {
            name: {
                value: '',
                error: false
            },
            email: {
                value: '',
                error: false
            },
            phone: {
                value: '',
                error: false
            },
            country: {
                value: '',
                error: false
            },
            city: {
                value: '',
                error: false
            },
            company: {
                value: '',
                error: false
            },
            tariff_id: {
              value: ''
            }
        },
        activeTariff: ''
    }
  },
  computed: {
    ...mapState('modal', ['list', 'message']),
    formData() {
      let formData = new FormData()
      formData.append('action', 'save')
      for (let key in this.form) {
		  	formData.append(`data[${key}]`, this.form[key].value)
		  }
      return formData
    },
  },
  methods: {
    ...mapMutations('modal', ['showModal']),
    setTarifId(name) {
      this.list.forEach(tarif => {
        if (tarif.name == name) {
          this.form.tariff_id.value = tarif.id
        }
      })
    },
    cleanForm() {
      this.form = {
            name: {
                value: '',
                error: false
            },
            email: {
                value: '',
                error: false
            },
            phone: {
                value: '',
                error: false
            },
            country: {
                value: '',
                error: false
            },
            city: {
                value: '',
                error: false
            },
            company: {
                value: '',
                error: false
            },
            tariff_id: {
              value: ''
            }
        }
    },
    sendForm() {
      if(this.validForm()) {
        let action = 'tariff/request/edit_ajax'
        let method = 'post'
        Vue.http[method](action, this.formData)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.success) {
              console.log('successs');
              this.showModal({
                name: 'info',
                props: {
                  title: 'Спасибо за&nbsp; заявку!',
                  text: 'Наши менеджеры свяжутся с вами в ближайшее время'
                }
              })
            }
            // this.cleanForm()
            
            resolve()
          }, data => {
            console.log('notsuccess');
            reject()
          })  
      }
    },
    validForm () {
        let valid = true
        if (!this.form.name.value ||
            this.form.name.value.length < 2 ||
            this.form.name.value === '' ||
            /[^A-ZА-Я-—\s]/i.test(this.form.name.value)
        ) {
            this.form.name.error = true
            valid = false
        }
        if (this.form.phone.value.length !== 18) {
            valid = false
            this.form.phone.error = true
        }
        if (!this.form.email.value ||
            this.form.email.value === '' ||
            /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(this.form.email.value) === false
        ) {
            this.form.email.error = true
            valid = false
        }
        if (!this.form.country.value ||
            this.form.country.value === ''
        ) {
            this.form.country.error = true
            valid = false
        }
        if (!this.form.city.value ||
            this.form.city.value === ''
        ) {
            this.form.city.error = true
            valid = false
        }
        return valid
    }
  },
  mounted() {
    this.setTarifId(this.message)
  }
}
</script>

<style lang="sass">
@import '~@styles/components/modals/request.sass'
</style>
