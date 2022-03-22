import Vue from "vue";
import App from "./App.vue";
import Keycloak from "keycloak-js";
import moment from "moment";
import "moment/locale/ru";
import VueLogger from "vuejs-logger";
moment.locale("ru");
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;
Vue.use(VueLogger);

let initOptions = {
  url: "https://test.menukhov.ru/",
  realm: "node",
  clientId: "app-vue",
  onLoad: "login-required",
};

let keycloak = Keycloak(initOptions);
Vue.prototype.$keycloak = keycloak;
keycloak
  .init({ onLoad: initOptions.onLoad })
  .then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      Vue.$log.info("Authenticated");
      new Vue({
        render: (h) => h(App),
      }).$mount("#app");
    }
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            Vue.$log.info("Token refreshed" + refreshed);
          } else {
            Vue.$log.warn(
              "Token not refreshed, valid for " +
                Math.round(
                  keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .catch(() => {
          Vue.$log.error("Failed to refresh token");
        });
    }, 6000);
  })
  .catch(() => {
    Vue.$log.error("Authenticated Failed");
  });
