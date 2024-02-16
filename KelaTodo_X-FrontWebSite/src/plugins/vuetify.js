import {
  createVuetify
} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@/main.scss'
import '@mdi/font/css/materialdesignicons.css'
import { lightTheme } from "./themes.js"


export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
    }
  },
  icons: {
    iconfont: "mdi"
  }

})