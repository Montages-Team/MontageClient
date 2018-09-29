import { h, app } from 'hyperapp'
import { Link, Route, location } from '@hyperapp/router'
import { apollo } from "hyperapp-apollo"

import picostyle from 'picostyle'
import actions from './actions'
import state from './state'
import view from './App'

const main = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)