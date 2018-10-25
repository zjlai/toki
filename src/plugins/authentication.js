import Amplify, { Auth } from 'aws-amplify'
import awsmobile from '../../awsmobilejs/#current-backend-info/aws-exports'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Amplify.configure(awsmobile)
  Amplify.Logger.LOG_LEVEL = 'INFO'
  Vue.prototype.$auth = Auth
}
