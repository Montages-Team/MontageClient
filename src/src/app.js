import { app } from 'hyperapp';
import actions from './actions';
import state from './state';
import view from './components/Counter';

const { add, sub } = app(state, actions, view, document.body);

setTimeout(add, 1000);
setTimeout(sub, 2000);
