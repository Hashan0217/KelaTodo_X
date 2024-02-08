import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


export default createVuetify({
    components,
    directives,
  defaults: {
    theme: {
        dark : false,
        light: {
            primary: '#fabb18',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
      },
  },
})