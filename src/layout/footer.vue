<template>
<div v-if="$route.name != 'authorization' && $route.name != 'recovery' & $route.name != 'changePassword'" class="footer hide-before-route">
   <div class="footer__content container hide-before-route">
       <div class="footer__left">
            <div class="footer__nav">
                <div v-link href="/about" class="footer__nav-item" :class="{'inactive-route': $route.name == 'about'}">
                    О проекте
                </div>
                <div v-link href="/catalog" class="footer__nav-item" :class="{'inactive-route': $route.name == 'catalog'}">
                    Каталог
                </div>
                <div v-link href="/tariffs" class="footer__nav-item" :class="{'inactive-route': $route.name == 'tariffs'}">
                    Тарифы
                </div>
                <div v-link href="/contacts" class="footer__nav-item" :class="{'inactive-route': $route.name == 'contacts'}">
                    Контакты
                </div>
            </div>
           <div class="footer__contacts footer__contacts_mb">
                <a href="tel:88007001191" class="footer__phone">
                    8 800 700 11 91
                </a>
                <a href="mailto:market@bubuka.info" class="footer__mail">
                    market@bubuka.info
                </a>
            </div>
            <div class="footer__files">
                <a class="footer__file" href="/src/assets/documents/Personal_data_using.pdf" target="_blank">Политика безопасности</a>
                <a class="footer__file" href="/src/assets/documents/Using_cookies.pdf" target="_blank">Использование файлов «Cookies»</a>
           </div>
        </div>
        <div class="footer__right">
           <div class="footer__socials">
               <a href="https://vk.com/bubukasound" target="_blank" class="footer__social">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9157 12.9913C19.5277 12.5188 19.6387 12.3086 19.9157 11.8862C19.9207 11.8814 23.1238 7.61346 23.4538 6.16607L23.4558 6.16511C23.6198 5.63764 23.4558 5.25 22.6628 5.25H20.0387C19.3707 5.25 19.0627 5.58268 18.8977 5.95489C18.8977 5.95489 17.5616 9.03868 15.6715 11.0376C15.0615 11.6153 14.7795 11.8004 14.4465 11.8004C14.2825 11.8004 14.0275 11.6153 14.0275 11.0878V6.16511C14.0275 5.53254 13.8405 5.25 13.2875 5.25H9.16132C8.7423 5.25 8.49329 5.54507 8.49329 5.81989C8.49329 6.41968 9.43833 6.55757 9.53633 8.24507V11.9065C9.53633 12.7088 9.38533 12.8563 9.05031 12.8563C8.15828 12.8563 5.99321 9.75996 4.71016 6.21621C4.45115 5.52868 4.19815 5.25096 3.52512 5.25096H0.900031C0.151005 5.25096 0 5.58364 0 5.95586C0 6.6135 0.892031 9.88339 4.14814 14.2034C6.31822 17.1522 9.37433 18.75 12.1544 18.75C13.8255 18.75 14.0295 18.3951 14.0295 17.7848C14.0295 14.9671 13.8785 14.701 14.7155 14.701C15.1035 14.701 15.7715 14.8861 17.3316 16.3084C19.1147 17.995 19.4077 18.75 20.4057 18.75H23.0298C23.7778 18.75 24.1568 18.3951 23.9388 17.6951C23.4398 16.2226 20.0677 13.1938 19.9157 12.9913Z" fill="white"/>
                    </svg>
               </a>
               <a href="https://www.youtube.com/user/BubukaSoundSystem" target="_blank" class="footer__social">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                    <path d="M0.523784 17.8741C1.08328 19.8586 3.63745 20.2198 5.6958 20.34C10.6713 20.6305 19.4648 20.5152 21.4118 19.9911C23.3874 19.4197 23.741 16.8437 23.9071 14.7938C24.1324 12.0134 24.0243 8.96758 23.5008 6.1251C22.9413 4.14067 20.3871 3.78159 18.3288 3.66147C13.3569 3.37134 4.55577 3.47516 2.61278 4.0081C0.637284 4.58059 0.277666 7.15384 0.103233 9.20322C-0.137484 12.0313 -0.0108238 15.027 0.523784 17.8741ZM9.60979 15.6511V8.3581L15.8758 12.0101L9.60979 15.6511Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
               </a>
               <a href="https://zen.yandex.ru/id/5b07b6b57ddde8a27738384f" target="_blank" class="footer__social">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 11.7875C5.81933 11.7378 8.23685 11.4551 9.84596 9.84596C11.4551 8.23685 11.7378 5.81933 11.7875 1.5C6.15609 1.61179 1.61179 6.15609 1.5 11.7875Z" fill="white"/>
                    <path d="M12.4146 1.50593C12.4645 5.82154 12.7476 8.23758 14.356 9.84596C15.9399 11.4298 18.307 11.7286 22.5 11.7849C22.3882 6.22222 17.9514 1.72086 12.4146 1.50593Z" fill="white"/>
                    <path d="M22.494 12.4171C18.3047 12.4737 15.9391 12.7729 14.356 14.356C12.7729 15.9391 12.4737 18.3047 12.4171 22.494C17.8856 22.2804 22.2804 17.8856 22.494 12.4171Z" fill="white"/>
                    <path d="M11.785 22.5C11.7286 18.307 11.4298 15.9399 9.84596 14.356C8.23758 12.7476 5.82154 12.4645 1.50593 12.4146C1.72087 17.9514 6.22224 22.3883 11.785 22.5Z" fill="white"/>
                    </svg>
               </a>
               <a href="https://www.facebook.com/bubukasound/" target="_blank" class="footer__social">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12C24 5.37188 18.6281 0 12 0C5.37188 0 0 5.37188 0 12C0 18.6281 5.37188 24 12 24C12.0703 24 12.1406 24 12.2109 23.9953V14.6578H9.63281V11.6531H12.2109V9.44062C12.2109 6.87656 13.7766 5.47969 16.0641 5.47969C17.1609 5.47969 18.1031 5.55938 18.375 5.59688V8.27813H16.8C15.5578 8.27813 15.3141 8.86875 15.3141 9.73594V11.6484H18.2906L17.9016 14.6531H15.3141V23.5359C20.3297 22.0969 24 17.4797 24 12Z" fill="white"/>
                    </svg>
               </a>
               <a href="https://www.instagram.com/bubukasound/" target="_blank" class="footer__social">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9949 0.0115676C7.0797 0.0115676 2.41766 -0.425322 0.634874 4.14647C-0.101523 6.0347 0.00541729 8.48696 0.00541729 11.9983C0.00541729 15.0795 -0.0934008 17.9755 0.634874 19.8488C2.4136 24.4233 7.11896 23.9851 11.9976 23.9851C16.7043 23.9851 21.5572 24.4747 23.3617 19.8488C24.0994 17.9416 23.9911 15.5259 23.9911 11.9983C23.9911 7.31561 24.2497 4.29255 21.9769 2.02288C19.6756 -0.276536 16.5635 0.0115676 11.9949 0.0115676ZM10.9255 2.17167C21.1782 2.15544 22.4831 1.01655 21.763 16.8379C21.5071 22.4336 17.2431 21.8195 12.0016 21.8195C2.44473 21.8195 2.16994 21.5463 2.16994 11.9929C2.16994 2.32857 2.92799 2.17979 10.9255 2.17167ZM18.4032 4.16135C17.6086 4.16135 16.9642 4.80518 16.9642 5.59916C16.9642 6.39314 17.6086 7.03697 18.4032 7.03697C19.1978 7.03697 19.8421 6.39314 19.8421 5.59916C19.8421 4.80518 19.1978 4.16135 18.4032 4.16135ZM12.0003 5.84263C8.59852 5.84263 5.84109 8.59923 5.84109 11.9983C5.84109 15.3974 8.59852 18.1526 12.0003 18.1526C15.4021 18.1526 18.1581 15.3974 18.1581 11.9983C18.1581 8.59923 15.4021 5.84263 12.0003 5.84263ZM12.0003 8.00273C17.2864 8.00273 17.2932 15.9939 12.0003 15.9939C6.71557 15.9939 6.70744 8.00273 12.0003 8.00273Z" fill="white"/>
                    </svg>
               </a>
            </div>
            <div class="footer__contacts footer__contacts_dt">
                <a href="tel:88007001191" class="footer__phone">
                    8 800 700 11 91
                </a>
                <a href="mailto:market@bubuka.info" class="footer__mail">
                    market@bubuka.info
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// import Header from '@layout/header'
export default {
  name: 'bottom',
  components: {
    // Header
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~@styles/layout/footer.sass'
</style>
