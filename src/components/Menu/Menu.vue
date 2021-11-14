<template>
<div class="menu">
    <search-form />

    <div class="user-sect">
        <p>{{user.user_name}}</p>
        <button @click="$eventBus.$emit('logout')">Выйти</button>
    </div>
    <ul class="main-menu">
        <menu-item v-for="item,i in menu" :key="i" :item="item"></menu-item>
    </ul>
    <button @click="active=!active" class="burger-button"><span class="material-icons">
            menu
        </span>
    </button>
    <div :class="{'active':active}" class="mobile-menu">
        <div class="user-sect">
            <p>{{user.user_name}}</p>
            <button @click="$eventBus.$emit('logout')">Выйти</button>
        </div>
        <ul class="main-menu">
            <menu-item v-for="item,i in menu" :key="i" :item="item"></menu-item>
        </ul>
    </div>
</div>
</template>

<script>
import MenuItem from './General/MenuItem.vue'
import SearchForm from './General/SearchForm.vue'
export default {
    props: {
        menu: Array,
        user: Object
    },
    components: { SearchForm, MenuItem },
    created() {
        this.$eventBus.$on('closeBurgerMenu', () => { this.active = false })
    },
    data() {
        return {
            active: false
        }
    },
}
</script>

<style lang="scss">
.menu {
    display: flex;
    flex-direction: column;
    background: rgb(254, 207, 0);
    padding: 0 20px;

    .burger-button,
    .mobile-menu {
        display: none;
    }

    p {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    ul {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 0;
    }

    .user-sect {
        margin: 10px 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        font-weight: 500;
        font-size: 18px;
        color: black;

        button {
            background: rgba(255, 255, 255, 0.712);
            border: 0;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;

            &:active,
            &:focus,
            &:hover {
                background: rgba(255, 255, 255, 0.912);
                outline: none;
            }
        }
    }
}

@media (max-width: 959px) {
    .menu {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;

        .main-menu,
        .user-sect {
            display: none;
        }

        .burger-button {
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            height: 40px;
            width: 40px;
            border-radius: 5px;
            border: 0;
            transition: all .2s;
            cursor: pointer;
            z-index: 998;

            &:hover,
            &:active,
            &:focus {
                background: rgba(255, 255, 255, 0.411);
            }
        }

        .mobile-menu {
            display: block;
            background: rgb(254, 207, 0);
            padding: 70px 20px;
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            z-index: 997;
            transition: all .3s;
            transform: translateY(-200vh);

            .main-menu,
            .user-sect {
                display: flex;
            }
        }

        .active {
            transform: translateY(0);
        }
    }
}
</style>
