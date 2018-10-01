import { app } from 'hyperapp'

import actions from './actions'
import state from './state'
import view from './App'

const main = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)