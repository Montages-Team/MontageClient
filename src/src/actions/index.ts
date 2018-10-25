import { location } from '@hyperapp/router'
<<<<<<< HEAD:src/src/actions/index.js
=======
import { apollo } from "hyperapp-apollo"

>>>>>>> staging:src/src/actions/index.ts
export default {
  apollo: apollo.actions,
  add: (/* event (e) */) => ({ num }) => ({ num: num + 1 }),
  sub: (/* event (e) */) => ({ num }) => ({ num: num - 1 }),
  location: location.actions
};
