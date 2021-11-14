<template>
<GChart type="SteppedAreaChart" :data="chartData" :options="chartOptions" />
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
    components: {
        GChart
    },
    props: {
        showData: Object
    },
    created() {
        this.$eventBus.$on('renderChart', data => this.generateChartData(data))
    },
    destroyed() {
        this.$eventBus.$off('renderChart')
    },
    methods: {
        //метод генерирует массив для построения графиков, вызывается при изменении шаблона отображения и изменении города
        generateChartData(template) {
            let arr = [];
            if (template === 'week') {
                arr.push(['День', 'Ночью', 'Днем'])
                this.showData.weatherData.forEach(item => {
                    arr.push([this.$moment(item.dt, 'X').format('DD'), Math.round(item.temp.night - 273.1), Math.round(item.temp.day - 273.1)])
                });
            }
            if (template === 'threedays') {
                arr.push(['Время', 'Температура'])
                this.showData.weatherData.forEach(item => {
                    arr.push([this.$moment(item.dt, 'X').format('DD'), Math.round(item.temp.night - 273.1)])
                    arr.push([this.$moment(item.dt, 'X').format('DD'), Math.round(item.temp.morn - 273.1)])
                    arr.push([this.$moment(item.dt, 'X').format('DD'), Math.round(item.temp.day - 273.1)])
                    arr.push([this.$moment(item.dt, 'X').format('DD'), Math.round(item.temp.eve - 273.1)])
                });
            }
            if (template === 'hourly') {
                arr.push(['Время', 'Температура'])
                this.showData.weatherData.forEach(item => {
                    arr.push([this.$moment(item.dt, 'X').format('HH:mm'), Math.round(item.temp - 273.1)])
                });
            }
            this.chartData = arr;
        },
    },
    data() {
        return {
            chartData: [],
            chartOptions: {
                hAxis: {
                    textPosition: 'none',
                    gridlines: {
                        count: 0,
                        color: 'transparent'
                    },
                    baselineColor: 'transparent'
                },
                vAxis: {
                    textPosition: 'none',
                    gridlines: {
                        color: 'transparent'
                    },
                    viewWindowMode: 'maximized'
                },
                height: 100,
                legend: 'none',
                tooltip: {
                    trigger: 'none'
                },
                chartArea: { left: 0, right: 0 },
                areaOpacity: 0.1,

            }
        }
    }
}
</script>

<style>

</style>
