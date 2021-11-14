<template>
<div class="weather-item">
    <div class="date">{{$moment(item.dt, 'X').format('D.M')}}</div>
    <div class="time">{{$moment(item.dt, 'X').format('HH:mm')}}</div>
    <div class="weather-icon-wrapper">
        <img class="weather-icon" :src="'http://openweathermap.org/img/wn/'+item.weather[0].icon+'.png'" :alt="item.weather[0].description">
        <div class="weather-icon-description">{{item.weather[0].description}}</div>
    </div>
    <div class="temp">{{Math.round(item.temp-273.1)}}</div>
    <div class="temp-feel">{{Math.round(item.feels_like-273.1)}}</div>
    <div class="windSpeed">{{item.wind_speed}}</div>

    <div class="humidity">{{item.humidity}}</div>
</div>
</template>

<script>
export default {
    props: {
        item: { Object }
    },
    mounted() {
        //расширяет  график на всю ширину слайдера
        document.getElementById('hourChart').style.width = `${document.getElementById('slider').scrollWidth}px`
    },
}
</script>

<style lang="scss">
.slider {

    .windSpeed,
    .humidity {
        margin-top: 30px;
    }

    .temp {
        margin-top: 80px;
        z-index: 5;
    }

    .feel-title {
        top: 190px;
    }

    .wind-title {
        top: 240px;
    }

    .humidity-title {
        top: 290px
    }

    .temp-feel {
        margin-top: 30px;
    }
}
</style>
