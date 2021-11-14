<template>
<li class="menu-item">
    <button v-if="item.type==='action'" @click="doAction(item.action, item.arg)">
        {{item.name}}
    </button>
    <a :href="item.action" target="_blank" v-if="item.type==='link'">{{item.name}}</a>
    <button class="sub-menu-wrapper" v-if="item.type==='submenu'">
        {{item.name}}
        <span class="material-icons">
            arrow_forward_ios
        </span>
        <ul class="sub-menu">
            <menu-item v-for="subItem,i in item.subMenu" :key="i" :item="subItem"></menu-item>
        </ul>
    </button>
</li>
</template>

<script>
import MenuItem from './MenuItem.vue'
export default {
    name: 'MenuItem',
    components: { MenuItem },
    props: {
        item: Object
    },
    methods: {
        doAction(action, arg) {
            this.$eventBus.$emit(action, arg)
            this.$eventBus.$emit('closeBurgerMenu')
        }
    },
}
</script>

<style lang="scss">
.menu-item {
    list-style: none;
    display: flex;
    cursor: pointer;

    &:first-child {

        button,
        a {
            border-top: 0;
        }
    }

    button,
    a {
        background: rgb(254, 207, 0);
        border: none;
        margin: 0;
        font-size: 18px;
        flex: 1;
        box-sizing: border-box;
        color: black;
        text-decoration: none;
        padding: 10px;
        border-top: 1px solid #caa500;
        text-align: left;
        transition: all .2s;
        cursor: pointer;

        &:hover {
            padding-left: 20px;
        }
    }
}

.sub-menu-wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover,
    &:focus {
        .sub-menu {
            opacity: 1;
            transform: translateX(0)scale(1);
            z-index: 50;
        }
    }

    .material-icons {
        font-size: 18px;
        color: #4e4000;
    }

    .sub-menu {
        transform: translateX(-100%)scale(0);
        opacity: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: absolute;
        left: 100%;
        top: 0;
        background: white;
        transition: all .3s ;
        width: 200px;
        padding: 10px;
        box-shadow: 0 0 2px 1px rgb(214, 214, 214);
        border-radius: 5px;

        .menu-item {
            width: 100%;

            button,
            a {
                background: white;
                border-top: 1px solid #bdbdbd;

            }

            &:first-child {

                button,
                a {
                    border-top: 0;
                }
            }
        }
    }

}

@media (max-width:969px) {
    .menu-item {

        button:hover,
        a:hover {
            padding-left: 10px;
            color: #333
        }
    }

    .sub-menu-wrapper {
        flex-direction: column;
        align-items: flex-start;

        &:hover {

            .sub-menu {
                display: flex;
            }
        }

        span {
            display: none;
        }

        .sub-menu {
            margin-top: 10px;
            display: none;
            transform: translateX(0)scaleY(1);
            position: static;
            opacity: 1;
            width: 100%;
            box-sizing: border-box;
        }

    }
}
</style>
