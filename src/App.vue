<template>
<div id="app">
    <div class="container grid">
        <Menu :menu="menu" :role="role"></Menu>
        <div class="page">
            <h3 class="page-title">{{templateTitle[currentTemplate]}} <span>{{city}}</span> </h3>
            <weather-widget :showData="showData"> </weather-widget>
        </div>
    </div>
</div>
</template>

<script>
const menuJson = require('../public/jsons/menu.json')
import Menu from './components/Menu/Menu.vue'
import WeatherWidget from './components/WeatherWidget/WeatherWidget.vue'
import axios from 'axios'
import api from './api'

export default {
    name: 'App',
    components: {
        WeatherWidget,
        Menu
    },
    data() {
        return {
            menu: menuJson,
            role: 'user',
            city: '',
            weeklyData: [],
            twoDaysData: [],
            todayData: [],
            error: false,
            errorText: '',
            showData: {
                template: '',
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
        this.$eventBus.$on('showDays', data => this.showDays(data))
        this.changeCity('тюмень')
    },
    beforeDestroy() {
        this.$eventBus.$off('changeCity')
        this.$eventBus.$off('showDays')
    },
    methods: {
        showDays(template, i = 0) {

            switch (template) {
                case 'now':
                    this.showData.weatherData = this.todayData.slice();
                    this.showData.template = template;
                    this.currentTemplate = template;
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
                    this.showData.weatherData = this.weeklyData.slice(i, i + 1);
                    this.showData.template = template;
                    this.currentTemplate = template;
            }
        },
        showError(text) {
            this.error = true
            this.errorText = text
            setTimeout(() => { this.error = false }, 3000)
        },
        changeCity(city) {
            axios.get(api.generateGeoResponse(city)).then(response => {
                if (response.data.length > 0) {
                    this.noItems = false
                    this.city = response.data[0].local_names.ru
                    axios.get(api.generateWeeklyResponse(response.data[0].lat, response.data[0].lon)).then(response2 => {
                        this.weeklyData = response2.data.daily
                        this.twoDaysData = response2.data.hourly
                        this.todayData.push(response2.data.current)
                        this.showDays(this.currentTemplate);
                        console.log(response2.data)
                    }).catch(function (error) {
                        console.log(error)
                        this.showError('Ошибка при выполнении запроса, попробуйте еще раз')
                    })
                } else {
                    this.noItems = true
                    this.showError('Город не найден')
                }
            }).catch(function (error) {
                console.log(error)
                this.showError('Ошибка при выполнении запроса, попробуйте еще раз')
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
    grid-template-columns: 1fr 3fr;

}

.page-title {
    padding: 25px 20px;
    background: rgba(235, 235, 235, 0.356);
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
</style>
