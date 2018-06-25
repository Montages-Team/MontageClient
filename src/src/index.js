import { h, app } from "hyperapp"
import picostyle from "picostyle"
import actions from './actions';
import state from './state';
import view from './components/Contents';
const ps = picostyle(h)

app(state, actions, view, document.body)