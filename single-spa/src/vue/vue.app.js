import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import Hello from './main.vue'

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vue',
    render: r => r(Hello)
  } 
});

export const bootstrap = () => {
    return vueLifecycles.bootstrap
}

export const mount = () => {
  return vueLifecycles.mount
}

export const unmount = () => {
  vueLifecycles.unmount
}