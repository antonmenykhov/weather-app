<template>
<div id="app">
    <div v-if="user != null" class="container grid">
        <Menu :menu="menu[user.user_role]" :user="user"></Menu>
        <div class="page">
            <h3 class="page-title">{{templateTitle[currentTemplate]}} <span>{{city}}</span> </h3>
            <weather-widget :showData="showData"> </weather-widget>
        </div>
    </div>
    <pop-up />
    <notification />
</div>
</template>

<script>
import Menu from './components/Menu/Menu.vue'
import WeatherWidget from './components/WeatherWidget/WeatherWidget.vue'
import PopUp from './components/PopUp.vue'
import axios from 'axios'
import api from './api'
import Notification from './components/Notification.vue'

export default {
    name: 'App',
    components: {
        WeatherWidget,
        Menu,
        PopUp,
        Notification
    },
    data() {

        return {
            menu: {},
            user: null,
            city: '',
            weeklyData: [],
            twoDaysData: [],
            todayData: [],
            showData: {
                template: 'week',
                weatherData: []
            },
            currentTemplate: 'week',
            templateTitle: {
                week: 'Прогноз на неделю',
                now: 'Погода сейчас',
                hourly: 'Почасовой прогноз погоды',
                threedays: 'Погода на 3 дня',
                day: 'Подробный прогноз на день'
            }
        }
    },
    created() {
        this.$eventBus.$on('changeCity', data => this.changeCity(data))
        this.$eventBus.$on('showDays', data => this.showDays(data.template, (data.item) ? data.item : null))
        this.$eventBus.$on('setUser', data => this.user = data)
        this.getMenu()
        this.changeCity('тюмень')

    },
    beforeDestroy() {
        this.$eventBus.$off('changeCity')
        this.$eventBus.$off('showDays')
        this.$eventBus.$off('setUser')
    },
    methods: {
        //Метод для смены вида виджета погоды (неделя, день, почасовой, 3 дня)
        showDays(template, item = null) {
            switch (template) {
                case 'now':
                    this.showData.weatherData = this.weeklyData.slice(0, 1);
                    this.showData.template = 'day';
                    this.currentTemplate = 'day';
                    break;
                case 'hourly':
                    this.showData.weatherData = this.twoDaysData.slice();
                    this.showData.template = template;
                    this.currentTemplate = template;
                    break;
                case 'threedays':
                    this.showData.weatherData = this.weeklyData.slice(0, 3);
                    this.showData.template = template;
                    this.currentTemplate = template;
                    break;
                case 'week':
                    this.showData.weatherData = this.weeklyData.slice(0, 7);
                    this.showData.template = template;
                    this.currentTemplate = template;
                    break;
                case 'day':
                    this.showData.weatherData = [item];
                    this.showData.template = template;
                    this.currentTemplate = template;
            }
            this.$eventBus.$emit('renderChart', this.currentTemplate)
        },
        //метод получает меню из json
        getMenu() {
            axios.get('/jsons/menu.json').then(response => { this.menu = response.data }).catch(function () {
                alert('Файл menu не найден')
            })
        },
        //метод для изменения текущего города, получает данные с сервера openweathermap с помощью двух запросов.
        // Сначала по названию города получает координаты, затем по координатам запрашивает погоду
        changeCity(city) {
            axios.get(api.generateGeoResponse(city)).then(response => {
                if (response.data.length > 0) {
                    this.noItems = false
                    this.city = response.data[0].local_names.ru
                    axios.get(api.generateWeeklyResponse(response.data[0].lat, response.data[0].lon)).then(response2 => {
                        this.weeklyData = response2.data.daily
                        this.twoDaysData = response2.data.hourly
                        this.showDays(this.currentTemplate);
                    }).catch(function (error) {
                        console.log(error)
                        this.$eventBus.$emit('showError', 'Ошибка при выполнении запроса, попробуйте еще раз')
                    })
                } else {
                    this.noItems = true
                    this.$eventBus.$emit('showError', 'Город не найден')
                }
            }).catch(function (error) {
                console.log(error)
                this.$eventBus.$emit('showError', 'Ошибка при выполнении запроса, попробуйте еще раз')
            })
        },

    },

}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

* {
    font-family: Montserrat, sans-serif;
    margin: 0;
    padding: 0;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.container {
    max-width: 1170px;
    width: 100%;
    margin: 20px auto;
    display: grid;
    grid-template-columns: 25% 75%;
    min-height: 50vh;

}

.page-title {
    padding: 25px 20px;
    background: rgba(235, 235, 235, 0.356);
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

@media (max-width: 959px) {

    .container {
        grid-template-columns: 100%;
        margin: 0;
        min-height: unset;
    }
}
</style>
