<template>
<div class="menu">
    <search-form  />
    <ul>
        <menu-item v-for="item,i in menu[role]" :key="i" :item="item"></menu-item>
    </ul>
</div>
</template>

<script>
import MenuItem from './General/MenuItem.vue'
import SearchForm from './General/SearchForm.vue'
export default {
    props: {
        menu: Object,
        role: String,
    },
    components: { SearchForm, MenuItem },

}
</script>

<style lang="scss">
.menu {
    display: flex;
    flex-direction: column;
    background: rgb(254, 207, 0);
    padding: 0 20px;

    ul {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 0;
    }
}
</style>
