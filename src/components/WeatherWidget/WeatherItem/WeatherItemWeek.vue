<template>
<div class="weather-item" @click="$eventBus.$emit('showDays', {template: 'day', item: item})">
    <div class="day" :class="{'holiday': ($moment(item.dt, 'X').day() === 6 || $moment(item.dt, 'X').day() === 0) ? true:false}">{{$moment(item.dt, 'X').format('dd')}}</div>
    <div class="date">{{$moment(item.dt, 'X').format('D MMM')}}</div>
    <div class="weather-icon-wrapper">
        <img class="weather-icon" :src="'http://openweathermap.org/img/wn/'+item.weather[0].icon+'.png'" :alt="item.weather[0].description">
        <div class="weather-icon-description">{{item.weather[0].description}}</div>
    </div>
    <div class="temps">
        <div class="day-temp">{{Math.round(item.temp.day-273.1)}}</div>
        <div class="night-temp">{{Math.round(item.temp.night-273.1)}}</div>
    </div>
    <div class="precipitation-title">Осадки, мм</div>
    <div class="precipitation">
        {{item.snow ? item.snow : 0 + item.rain ? item.rain : 0 }}
    </div>

</div>
</template>

<script>
export default {
    props: {
        item: Object
    }
}
</script>

<style lang="scss">
.date {
    font-weight: 400;
}

.holiday {
    color: rgb(254, 207, 0);
}

.week-wrapper {
    position: relative;

    .day-temp {
        font-size: 18px;
        font-weight: 500;
        color: rgb(222, 74, 40);
        z-index: 5;
    }

    .night-temp {
        font-size: 18px;
        font-weight: 500;
        margin-top: 80px;
        z-index: 5;
        color: rgb(51, 102, 204);
    }
    .temps{
        z-index: 5;
    }

    .generalChart {
        position: absolute;
        top: 100px;
        right: 20px;
        left: 20px;
    }

}

.week {
    .precipitation-title {
        top: 215px;
    }
}

.precipitation {
    margin-top: 30px;
}

@media (max-width: 550px) {
    .week-wrapper {
        .generalChart {
            display: none;
        }

        .week {
            display: flex !important;
            flex-direction: column;

            .weather-item {
                display: flex;
                flex-direction: row;
                padding: 5px 10px;
                justify-content: space-between;
                align-items: center;

                &:nth-child(even) {
                    background: rgba(238, 238, 238, 0.637);
                }

                .precipitation-title {
                    display: block !important;
                    position: static;
                    border-bottom: 0;
                    padding-top: 0;
                }
                .precipitation{
                    margin-top: 0;
                    margin-left: 10px;
                    width: 30px;
                    text-align: center;
                }
                .night-temp{
                    margin-top: 5px;
                }
                .date{
                    width: 70px;
                    margin-left: 10px;
                }
                .day{
                    width: 20px;
                }
                .weather-icon-wrapper{
                    width: 50px;
                }
                .temps{
                    margin-left: 10px;
                    width: 30px;
                }
            }

        }
    }
}
@media (max-width: 390px) {
    .week-wrapper .week .weather-item .precipitation-title, .week-wrapper .week .weather-item .precipitation{
        display: none!important;
    }
}
</style>
