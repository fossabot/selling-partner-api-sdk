import { Configuration, FbaInboundApi } from '../api-models/fulfillment-inbound-api-model'
import { ApiClientHelpers } from '../helpers'
import { DEFAULT_API_BASE_PATH } from '../types'
import { APIConfigurationParameters } from '../types/api-clients/api-configuration-parameters'

// TODO: duplicated API model with fba inbound
export class FulfillmentFbaInboundApiClient extends FbaInboundApi {
  constructor(parameters: APIConfigurationParameters) {
    const axios = ApiClientHelpers.getAxiosInstance(parameters)

    const configuration = new Configuration(parameters)

    super(configuration, DEFAULT_API_BASE_PATH, axios)
  }
}
