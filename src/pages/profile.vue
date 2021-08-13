<template>
    <div class="profile page">
        <div class="profile__top">
            <div class="profile__left">
                <p class="profile__hello">Здравствуйте,</p>
                <h1 class="profile__name">Александр С.</h1>
            </div>
            <div v-link href="/change-password" class="profile__password unselect">
                Сменить пароль
            </div>
        </div>
        <div class="profile__info">
            <p class="profile__info-title">Информация об аккаунте</p>
            <div class="profile__row">
                <div class="profile__column">
                    <p class="profile__label">E-mail</p>
                    <p class="profile__value profile__value_email">Alexsander@rambler.ru</p>
                </div>
                <div class="profile__column">
                    <p class="profile__label">Номер телефона</p>
                    <p class="profile__value profile__value_phone">+7 900 000 00 00</p>
                </div>
                <div class="profile__column">
                    <p class="profile__label">Город</p>
                    <p class="profile__value profile__value_location">Томск, Россия</p>
                </div>
                <div class="profile__column">
                    <p class="profile__label">Тариф</p>
                    <p class="profile__value profile__value_tariff">Премиум</p>
                </div>
            </div>
        </div>
        <div class="profile__controls">
            <p class="profile__history">История скачиваний</p>
            <div class="profile__row">
                <!-- <div class="profile__file">
                    <div class="profile__file-icon"></div>
                    <span class="profile__file-text">Загрузка одним архивом</span>
                </div> -->
                <div class="profile__filter">селектор</div>
            </div>
        </div>
        <div class="profile__list"></div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="sass">
@import '~@styles/pages/profile.sass'
</style>