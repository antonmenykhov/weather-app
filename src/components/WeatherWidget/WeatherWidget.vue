<template>
<div class="weather-widget" :class="`${showData.template}-wrapper`">
    <div :class="showData.template" v-if="showData.template==='week'">
        <weather-item-week v-for="item in showData.weatherData" :key="item.dt" :item="item"></weather-item-week>
    </div>
    <div :class="showData.template" v-if="showData.template==='threedays'">
        <weather-item-three-days v-for="item in showData.weatherData" :key="item.dt" :item="item"></weather-item-three-days>
    </div>
    <hourly :showData="showData" v-show="showData.template==='hourly'" />
    <div :class="showData.template" v-if="showData.template==='day'">
        <weather-item-day v-for="item in showData.weatherData" :key="item.dt" :item="item"></weather-item-day>
    </div>
    <weather-chart :showData="showData" class="generalChart" v-show="showData.template !== 'hourly' && showData.template !=='day'"></weather-chart>

</div>
</template>

<script>
import WeatherChart from './WeatherItem/WeatherChart.vue'
import WeatherItemDay from './WeatherItem/WeatherItemDay.vue'
import WeatherItemThreeDays from './WeatherItem/WeatherItemThreeDays.vue'
import WeatherItemWeek from './WeatherItem/WeatherItemWeek.vue'
import Hourly from './WeatherTemplates/Hourly.vue'
export default {
    components: { WeatherItemWeek, WeatherItemThreeDays, WeatherItemDay, WeatherChart, Hourly },
    props: { showData: Object },
    methods: {
        //шуточные методы, которые позволяют администратору что-нибудь администрировать, в частности прибавляют и убавляют температуру
        tempPlus() {
            if (this.showData.template != 'hourly') {
                for (let i = 0; i < this.showData.weatherData.length; i++) {
                    this.showData.weatherData[i].temp.day += 5;
                    this.showData.weatherData[i].temp.night += 5;
                    this.showData.weatherData[i].temp.eve += 5;
                    this.showData.weatherData[i].temp.morn += 5;
                    this.showData.weatherData[i].feels_like.day += 5;
                    this.showData.weatherData[i].feels_like.night += 5;
                    this.showData.weatherData[i].feels_like.eve += 5;
                    this.showData.weatherData[i].feels_like.morn += 5;
                }
            } else {
                for (let i = 0; i < this.showData.weatherData.length; i++) {
                    this.showData.weatherData[i].temp += 5;
                    this.showData.weatherData[i].feels_like += 5;
                }
            }
            this.$eventBus.$emit('renderChart', this.showData.template)

        },
        tempMinus() {
            if (this.showData.template != 'hourly') {
                for (let i = 0; i < this.showData.weatherData.length; i++) {
                    this.showData.weatherData[i].temp.day -= 5;
                    this.showData.weatherData[i].temp.night -= 5;
                    this.showData.weatherData[i].temp.eve -= 5;
                    this.showData.weatherData[i].temp.morn -= 5;
                    this.showData.weatherData[i].feels_like.day -= 5;
                    this.showData.weatherData[i].feels_like.night -= 5;
                    this.showData.weatherData[i].feels_like.eve -= 5;
                    this.showData.weatherData[i].feels_like.morn -= 5;
                }
            } else {
                for (let i = 0; i < this.showData.weatherData.length; i++) {
                    this.showData.weatherData[i].temp -= 5;
                    this.showData.weatherData[i].feels_like -= 5;
                }
            }
            this.$eventBus.$emit('renderChart', this.showData.template)
        }
    },

    beforeCreate() {
        this.$eventBus.$on('tempPlus', data => this.tempPlus(data))
        this.$eventBus.$on('tempMinus', data => this.tempMinus(data))
    },
    destroyed() {
        this.$eventBus.$on('tempPlus')
        this.$eventBus.$on('tempMinus')
    },

}
</script>

<style lang="scss">
.weather-widget {
    padding: 0 20px;
    position: relative;
    overflow: hidden;

    .week {
        display: grid;
        grid-template-columns: repeat(7, 1fr);

        .weather-item {
            cursor: pointer;
        }
    }

    .threedays {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        .weather-item {
            cursor: pointer;
        }
    }

    .precipitation-title {
        font-weight: normal;
        position: absolute;
        left: 20px;
        right: 20px;
        padding-top: 5px;
        display: none;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgb(218, 218, 218);

    }

    .weather-item {
        display: flex;
        flex-direction: column;
        padding: 5px 0;
        align-items: center;
        font-weight: 500;

        &:first-child .precipitation-title {
            display: flex;
        }

    }

    .weather-icon-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;

        &:hover {
            .weather-icon-description {
                display: flex;
            }
        }

        .weather-icon-description {
            display: none;
            position: absolute;
            justify-content: center;
            top: 100%;
            background: rgba(0, 0, 0, 0.689);
            color: white;
            font-size: 12px;
            text-align: center;
            padding: 3px 4px;
            border-radius: 5px;
            z-index: 10;
        }
    }

}

.threedays {
    grid-template-columns: repeat(3, 1fr);

    .precipitation-title {
        grid-column-end: 4;
    }
}
</style>
