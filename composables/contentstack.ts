import CS from '@contentstack/app-sdk'
import _get from 'lodash.get'
import type { ICustomField } from '@contentstack/app-sdk/dist/src/types'

const state = reactive<{
  invalidConfig: boolean
  extensionField?: ICustomField
  locationFields?: string[]
  coords: IEsriCoords
}>({
  invalidConfig: false,
  coords: {
    x: undefined,
    y: undefined,
  },
})

const address = ref<string | undefined>()

export const useContentstackExtension = () => {
  onMounted(async () => {
    try {
      const extension = await CS.init()
      state.extensionField = extension.location.CustomField ?? undefined
      state.extensionField?.frame.enableAutoResizing()
      state.locationFields = state.extensionField?.fieldConfig.locationFields
      state.coords = state.extensionField?.field.getData() as IEsriCoords
    } catch (error) {
      console.warn(`Unable to find ContentStack instance.`)
    }
  })

  const refreshAddress = () => {
    if (!state.locationFields?.length) return

    const data = state.extensionField?.entry._changedData

    address.value = state.locationFields
      .map((cursor) => _get(data, cursor))
      .join(' ')
  }

  return {
    state,
    refreshAddress,
    address,
  }
}
