import { location } from '@hyperapp/router'
export default {
  add: (/* event (e) */) => ({ num }) => ({ num: num + 1 }),
  sub: (/* event (e) */) => ({ num }) => ({ num: num - 1 }),
  location: location.actions
};
