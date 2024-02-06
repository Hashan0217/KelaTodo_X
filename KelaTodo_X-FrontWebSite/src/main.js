import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import './assets/ali_icons/iconfont.css' 
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives
  })
  
createApp(App).use(vuetify).mount('#app')
