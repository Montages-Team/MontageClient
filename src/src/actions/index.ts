import { location } from '@hyperapp/router'
import { apollo } from "hyperapp-apollo"

export default {
  apollo: apollo.actions,
  location: location.actions
};
