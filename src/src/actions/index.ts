import { location } from '@hyperapp/router'
import { apollo } from "hyperapp-apollo"

export default {
  apollo: apollo.actions,
  add: (/* event (e) */) => ({ num }) => ({ num: num + 1 }),
  sub: (/* event (e) */) => ({ num }) => ({ num: num - 1 }),
  location: location.actions
};
