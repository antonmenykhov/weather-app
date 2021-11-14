<template>
<div v-if="showPop" class="pop-up-wrapper">
    <div v-if="showLogin" class="pop-up login">
        <h5>Введите ваше имя</h5>
        <form>
            <input v-model="username" placeholder="Имя" autofocus type="text">
            <button @click="login">Войти</button>
        </form>
    </div>
    <div v-if="showHello" class="pop-up login">
        <h5>Добро пожаловать, {{username}}!</h5>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        //Получаю список пользовтелей, проверяю наличие токна в хранилище, пробую авторизоваться, если подходит то показывает приветствие и запускает приложение, если нет - удаляет токен
        //В случае необходимости можно хранить токен и в куках, но в ТЗ указано что пользователь вводит логин только при первом посещении
        getData() {
            axios.get('/jsons/users.json').then(response => {
                this.data = response.data
                if (localStorage.getItem('jwt')) {
                    let user = this.data.find(elem => elem.jwt === localStorage.getItem('jwt'))
                    if (user) {
                        this.username = user.user_name;
                        this.hello(user)
                    } else {
                        this.logout
                    }
                } else {
                    this.showLogin = true
                }
            }).catch(function () {
                alert('Файл users не найден')
            })
        },
        //Метод для авторизации по логину
        login(e) {
            e.preventDefault();

            let user = this.data.find(elem => elem.user_name.toLowerCase() === this.username.toLowerCase());
            if (user) {
                localStorage.setItem('jwt', user.jwt)
                this.hello(user)
            } else {
                this.$eventBus.$emit('showError', 'Пользователь не найден')
            }

        },
        //Метод вывода приветствия пользователя и передача данных о нем в App 
        hello(user) {
            this.showLogin = false
            this.showHello = true
            this.$eventBus.$emit('setUser', user)

            setTimeout(() => {
                this.showPop = false;
                this.$eventBus.$emit('renderChart', 'week')
            }, 2000)
        },
        //Метод для выхода пользователя
        logout() {
            this.showLogin = true
            this.showPop = true
            this.showHello = false
            this.$eventBus.$emit('setUser', null)
            localStorage.removeItem('jwt')
        }

    },
    created() {
        this.getData();
        this.$eventBus.$on('logout', this.logout)

    },
    destroyed() {
        this.$eventBus.$off('logout')
    },
    data() {
        return {
            data: [],
            username: '',
            showLogin: false,
            showHello: false,
            showPop: true
        }
    },
}
</script>

<style lang="scss">
.close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    transform: rotate(45deg);
    font-weight: 500;
    font-size: 20px;
    cursor: pointer;
    transition: all .2s;

    &:hover {
        color: rgb(254, 207, 0);
    }
}

.pop-up-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: white;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pop-up {
    background: white;
    padding: 40px 20px;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 0 5px 2px rgb(207, 207, 207);

    form {
        display: flex;
        flex-direction: column;

        input {
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            margin-top: 20px;
            box-shadow: 0 0 2px 1px rgb(207, 207, 207);
            border: 0;
            border-radius: 5px;
            margin-bottom: 10px;

            &:active,
            &:focus {
                outline: none;
                box-shadow: 0 0 2px 2px rgb(207, 207, 207);

            }
        }

        button {
            background: rgb(254, 207, 0);
            padding: 10px;
            border: 0;
            border-radius: 5px;
            font-weight: 500;
            box-shadow: 0 0 2px 1px rgb(207, 207, 207);
            cursor: pointer;

            &:active,
            &:focus,
            &:hover {
                outline: none;
                box-shadow: 0 0 2px 2px rgb(207, 207, 207);

            }
        }
    }
}
</style>
