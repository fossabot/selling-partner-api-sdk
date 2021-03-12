import { FeedsApi } from '../api-models/feeds-api-model'
import { ApiClientHelpers } from '../helpers'
import { APIConfigurationParameters } from '../types/api-clients/api-configuration-parameters'

export class FeedsApiClient extends FeedsApi {
  constructor(parameters: APIConfigurationParameters) {
    const axios = ApiClientHelpers.getAxiosInstance(parameters)
    const basePath = ApiClientHelpers.getDefaultBasePath()

    super(
      {
        isJsonMime: ApiClientHelpers.isJsonMime,
        ...parameters,
      },
      basePath,
      axios,
    )
  }
}