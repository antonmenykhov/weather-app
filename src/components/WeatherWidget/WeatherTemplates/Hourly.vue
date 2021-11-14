<template>
<div class="slider">
    <div id="slider" class="hourly">
        <weather-item-hourly v-for="item in showData.weatherData" :key="item.dt" :item="item"></weather-item-hourly>
        <weather-chart id="hourChart" class="hourChart" :showData="showData"></weather-chart>
    </div>
    <button :disabled="sliderPosition==0" @click="prevHour" class="prevHour">
        <span class="material-icons">
            arrow_forward_ios
        </span>
    </button>
    <button :disabled="disableNext" @click="nextHour" class="nextHour">
        <span class="material-icons">
            arrow_forward_ios
        </span>
    </button>
    <div class="precipitation-title feel-title">Ощущается как</div>
    <div class="precipitation-title wind-title">Скорость ветра, м/c</div>
    <div class="precipitation-title humidity-title">Влажность, %</div>
</div>
</template>

<script>
import WeatherChart from '../WeatherItem/WeatherChart.vue'
import WeatherItemHourly from '../WeatherItem/WeatherItemHourly.vue'
export default {
    components: { WeatherChart, WeatherItemHourly },
    props: {
        showData: Object
    },
    methods: {
        //методы, позволяют листать почасовой прогноз погоды и отключают в нужные моменты кнопки
        nextHour() {
            this.sliderPosition -= 70;
            let slider = document.getElementById('slider')
            slider.style.transform = `translateX(${this.sliderPosition}px)`
            if ((slider.clientWidth - slider.scrollWidth) > this.sliderPosition) {
                this.disableNext = true
            }

        },
        prevHour() {
            this.disableNext = false
            this.sliderPosition += 70;
            let slider = document.getElementById('slider')
            slider.style.transform = `translateX(${this.sliderPosition}px)`
        },
    },
    data() {
        return {
            sliderPosition: 0,
            disableNext: false,
        }
    },
}
</script>

<style lang="scss">
.slider {
    overflow: hidden;
    position: relative;

    .precipitation-title {
        left: 40px !important;
        right: 40px !important;
        display: flex !important;
    }
}

.hourly {
    display: flex;
    transition: all .2s;
    position: relative !important;
    padding: 0 0px;
    margin: 0 30px;

    .weather-item {
        box-sizing: border-box;
        margin: 0 10px;
    }
    .hourChart {
        position: absolute;
        left: 0px;
        right: 0;
        top: 85px;
        width: 100%;
    }
}

.prevHour,
.nextHour {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 30px;
    border: none;
    background: rgb(248, 248, 248);
    cursor: pointer;
    transition: all .2s;
    border-radius: 4px;
    z-index: 6;

    &:hover {
        background: rgb(228, 228, 228);
    }

    .material-icons {
        text-align: center;
    }
}

.prevHour {
    left: 0;

    span {
        transform: rotate(180deg);
    }
}

.nextHour {
    right: 0;
}
</style>
