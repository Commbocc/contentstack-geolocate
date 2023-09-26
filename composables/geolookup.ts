export function useGeolocate(
  address: Ref<string | undefined> | ComputedRef<string | undefined>
) {
  return useAsyncData<IEsriResponse>(
    address.value ?? 'empty',
    () =>
      $fetch(
        `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates`,
        {
          query: {
            singleLine: address.value,
            forStorage: false,
            f: 'json',
          },
        }
      ),
    {
      immediate: false,
    }
  )
}
