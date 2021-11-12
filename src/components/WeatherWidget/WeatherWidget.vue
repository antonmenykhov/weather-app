<template>
<div class="weather-widget">
    <div v-for="item in showData.weatherData" :key="item.dt" class="weather-item">
        <div class="day">{{$moment(item.dt, 'X').format('dd')}}</div>
        <div class="date">{{$moment(item.dt, 'X').format('D MMM')}}</div>
        <div class="weather-icon-wrapper">
            <img class="weather-icon" :src="'http://openweathermap.org/img/wn/'+item.weather[0].icon+'.png'" :alt="item.weather[0].description">
            <div class="weather-icon-description">{{item.weather[0].description}}</div>
        </div>
        <div class="day-temp">{{Math.round(item.temp.day-273.1)}}</div>
        <div class="night-temp">{{Math.round(item.temp.night-273.1)}}</div>

    </div>
    <div class="precipitation-title">
        Количество осадков, мм
    </div>
    <div v-for="item,i in showData.weatherData" :key="i" class="weather-item">
        <div class="precipitation">
            {{item.snow ? item.snow : 0 + item.rain ? item.rain : 0 }}
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: { showData: Object },
    methods: {

    },
    data() {
        return {}
    },
    created() {}
}
</script>

<style lang="scss">
.weather-widget {
    display: grid;
    padding: 0 20px;
    grid-template-columns: repeat(7, 1fr);
    overflow: hidden;
    grid-template-rows: 1fr 30px 1fr;

    .precipitation-title {
        grid-column-start: 1;
        grid-column-end: 8;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgb(218, 218, 218);
        border-top: 1px solid rgb(218, 218, 218);
    }

    .weather-item {
        display: flex;
        flex-direction: column;
        padding: 5px 0;
        align-items: center;
    }

    .weather-icon-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        &:hover{
            .weather-icon-description{
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
        }
    }

}
</style>
