<template>
<li class="menu-item">
    <button v-if="item.type==='action'" @click="doAction(item.action, item.arg)">
        {{item.name}}
    </button>
    <a :href="item.action" target="_blank" v-if="item.type==='link'">{{item.name}}</a>
    <button class="sub-menu-wrapper" v-if="item.type==='submenu'">
        {{item.name}}
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
        doAction(action) {
            alert(action)
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

    &:hover, &:focus {
        .sub-menu {
            opacity: 1;
            transform: translateX(0)scale(1);
            z-index: 2;
        }
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
        transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
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
</style>
