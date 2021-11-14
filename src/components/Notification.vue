<template>
<div :class="{'active':active}" class="notificitaion">
    <span class="material-icons">
        error
    </span>
    <p>{{text}}</p>
</div>
</template>

<script>
export default {
    created() {
        this.$eventBus.$on('showError', data=>{this.showError(data)})
    },
    destroyed() {
        this.$eventBus.$off('showError')
    },
    methods: {
        showError(text){
            this.text=text
            this.active=true
            setTimeout(()=>{this.active=false}, 2000)
        }
    },
    data() {
        return {
            text: '',
            active: false
        }
    },
}
</script>

<style lang="scss">
.notificitaion {
    position: fixed;
    right: 20px;
    top: 20px;
    background: white;
    z-index: 9999;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 5px 1px rgb(231, 231, 231);
    width: 150px;
    transform: translateX(500px);
    transition: all .3s;
    p{
        text-align: center;
    }
    .material-icons{
        font-size: 30px;
        color: brown;
        margin-bottom: 10px;
    }
}
.notificitaion.active{
    transform: translateX(0);
}
</style>
