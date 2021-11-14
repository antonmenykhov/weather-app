<template>
<div @click="$eventBus.$emit('showDays', {template: 'day', item: item})" class="weather-item">
    <div :class="{'holiday': ($moment(item.dt, 'X').day() === 6 || $moment(item.dt, 'X').day() === 0) ? true:false}" class="day">{{$moment(item.dt, 'X').format('dd')}}</div>
    <div class="date">{{$moment(item.dt, 'X').format('D MMMM')}}</div>
    <div class="weather-icon-wrapper">
        <img class="weather-icon" :src="'http://openweathermap.org/img/wn/'+item.weather[0].icon+'.png'" :alt="item.weather[0].description">
        <div class="weather-icon-description">{{item.weather[0].description}}</div>
    </div>
    <div class="day-times">
        <div class="day-time" v-for="dayTime in dayTimes" :key="dayTime.name">
            <div class="name">
                {{dayTime.name}}
            </div>
            <div class="temp">
                {{Math.round(item.temp[dayTime.varName] - 273.1)}}
            </div>
            <div class="feel-title">Ощущается как</div>
            <div class="temp temp-feel">
                {{Math.round(item.feels_like[dayTime.varName] - 273.1)}}
            </div>

        </div>
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
    },
    data() {
        return {
            dayTimes: [{
                    name: 'Ночь',
                    varName: 'night'
                },
                {
                    name: 'Утро',
                    varName: 'morn'
                },
                {
                    name: 'День',
                    varName: 'day'
                },
                {
                    name: 'Вечер',
                    varName: 'eve'
                },
            ]
        }
    },
}
</script>

<style lang="scss">
.threedays {
    .precipitation-title {
        top: 260px;
    }
}

.day-times {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    position: relative;
    width: 100%;

    .day-time {
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 5;

        &:first-child {
            .feel-title {
                display: flex;
            }
        }

        .temp {
            margin-top: 80px;
            z-index: 5;
        }

        .temp-feel {
            margin-top: 30px;
        }

        .feel-title {
            font-weight: normal;
            position: absolute;
            left: 0;
            display: none;
            justify-content: center;
            right: 0;
            top: 120px;
            border-bottom: 1px solid rgb(218, 218, 218);
        }
    }

}

.threedays-wrapper {
    position: relative;

    .generalChart {
        position: absolute;
        left: 20px;
        right: 20px;
        top: 100px;
    }

}

@media (max-width:650px) {
    .weather-widget {
        
        .threedays {
            display: flex!important;
            flex-direction: column;
        }

        .precipitation-title {
            grid-column-end: 1;
        }
    }
    .threedays-wrapper {
        .weather-item:nth-child(even){
            background: rgba(236, 236, 236, 0.658);
        }
        .generalChart {
            display: none;
        }

        .precipitation-title {
            display: flex !important;
            position: static!important;
        }

        .precipitation {
            margin-top: 0;
        }
    }

    .day-times {
        width: unset;

        .day-time {
            .temp {
                margin-top: 0;
            }

            .temp-feel {
                margin-top: 30px;
            }

            .feel-title {
                top: 40px;
            }
        }
    }
}
</style>
