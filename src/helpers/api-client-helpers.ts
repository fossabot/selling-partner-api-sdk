import { amazonMarketplaces } from '@scaleleap/amazon-marketplaces'
import { aws4Interceptor } from 'aws4-axios'
import globalAxios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

import { APIConfigurationParameters } from '../types'
import { apiErrorFactory } from './api-error-factory'

export class ApiClientHelpers {
  static getAxiosInstance(parameters: APIConfigurationParameters): AxiosInstance {
    let axiosInstance: AxiosInstance
    const { axios } = parameters

    if (axios) {
      axiosInstance = axios
    } else {
      const { apiModelProperties, accessToken } = parameters

      axiosInstance = globalAxios.create({
        headers: {
          // TODO: automate version number
          'user-agent': '@scaleleap/selling-partner-api-sdk (Language=TypeScript/0.0.0)',
          'x-amz-access-token': accessToken,
        },
      })

      axiosInstance.interceptors.request.use(
        aws4Interceptor(
          {
            region: apiModelProperties.region,
            service: 'execute-api',
          },
          apiModelProperties.credentials,
        ),
      )
    }

    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        throw apiErrorFactory(error)
      },
    )

    return axiosInstance
  }

  static getDefaultBasePath(): string {
    const { sellingPartner } = amazonMarketplaces.US
    return sellingPartner ? sellingPartner.region.endpoint : ''
  }

  static isJsonMime(mime: string): boolean {
    /* eslint-disable-next-line no-control-regex */
    const jsonMime = new RegExp('^(application/json|[^;/ \t]+/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i')
    return (
      mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json')
    )
  }
}