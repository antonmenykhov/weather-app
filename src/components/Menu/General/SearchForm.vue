<template>
<form class="search-form">
    <button @click="changeCity"></button>
    <input v-model="query" type="text" placeholder="Введите название города">
</form>
</template>

<script>
export default {
    data() {
        return {
            query: '',
        }
    },
    methods: {
        changeCity(e) {
            e.preventDefault()
            this.$eventBus.$emit('changeCity', this.query)
            this.query = ''
        },

    },
}
</script>

<style lang="scss">
.search-form {
    button {
        display: none;
    }

    input {
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        margin-top: 20px;
        background: rgba(255, 255, 255, 0.712);
        border: 0;
        border-radius: 5px;
        transition: all .2s;

        &:active,
        &:focus {
            background: rgba(255, 255, 255, 0.912);
            outline: none;
        }
    }

}
@media (max-width: 959px) {
    .search-form input{
        width: 200px;
        margin-top: 0;
    }
}
</style>
