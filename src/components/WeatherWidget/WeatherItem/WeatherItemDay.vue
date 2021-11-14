<template>
<div class="weather-item day-item">
    <div class="half">
        <weather-item-three-days :item="item"></weather-item-three-days>
    </div>
    <div class="half">
        <div class="prop pop">
            Вероятность осадков: <span>{{item.pop*100}}%</span>
        </div>
        <div class="prop humidity">
            Влажность: <span>{{item.humidity}}%</span>
        </div>
        <div class="prop uvi">
            Ультрафиолетовый индекс: <span>{{item.uvi}}</span>
        </div>
        <div class="prop sunrise">
            Рассвет: <span>{{$moment(item.sunrise, 'X').format('HH:mm')}}</span>
        </div>
        <div class="prop sunset">
            Закат: <span>{{$moment(item.sunset, 'X').format('HH:mm')}}</span>
        </div>
        <div class="prop moon-phase">
            Фаза луны: <span>{{ moonphase}}</span>
        </div>

    </div>
</div>
</template>

<script>
import WeatherItemThreeDays from './WeatherItemThreeDays.vue'
export default {
    components: { WeatherItemThreeDays },
    props: {
        item: Object
    },
    computed: {
        moonphase: function () {
            let phase = "";
            if (this.item.moon_phase > 0.5) {
                phase = 'Убывающая'
            } else {
                phase = 'Растущая'
            }
            if (this.item.moon_phase === 0.5) {
                phase = 'Полнолуние'
            }
            return phase
        }
    }
}
</script>

<style lang="scss">
.weather-item.day-item {
    flex-direction: row !important;
    flex-wrap: wrap;
    position: relative;

    .precipitation-title {
        right: 0 !important;
        left: 0 !important;
    }

    .half {
        flex: 1 1 300px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .weather-item {
            position: relative;
            .feel-title{
                top: 40px
            }
            .temp{
                margin-top: 0;
            }
            .temp-feel{
                margin-top: 30px;
            }
            .precipitation-title {
                top: 180px
            }
        }

        .prop {
            display: flex;
            justify-content: space-between;
            width: 80%;
            margin-bottom: 5px;
        }
    }
}
</style>
