import sdk from '../sdk'

import { setup as setupCoinMetrics } from './coinmetrics'
import { setup as setupMintableTokens } from './mintable-tokens'

const feesList = sdk.getList('issuance')

feesList.addAdaptersWithSetupFunction(setupCoinMetrics)
feesList.addAdaptersWithSetupFunction(setupMintableTokens)