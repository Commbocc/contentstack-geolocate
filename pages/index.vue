<script setup lang="ts">
const { state, refreshAddress, address } = useContentstackExtension()

const { data, pending, refresh } = await useGeolocate(address)

const openDetails = ref(false)

const toggleDetails = () => {
  refreshAddress()
  openDetails.value = !openDetails.value
  if (openDetails.value) refresh()
}

const selectCandidate = async (candidate: IEsriResponseCandidate) => {
  openDetails.value = false
  state.coords = candidate.location
  await state.extensionField?.field.setData(candidate.location)
}
</script>

<template>
  <div style="height: 250px">
    <details role="list" :open="openDetails">
      <summary
        aria-haspopup="listbox"
        role="button"
        @click.prevent="toggleDetails"
      >
        Locate
      </summary>
      <ul role="listbox" style="max-height: 200px; overflow-y: scroll">
        <li v-if="pending">
          <progress></progress>
        </li>

        <li v-else-if="!data?.candidates.length">No Results</li>

        <template v-else v-for="candidate in data?.candidates">
          <li>
            <a @click.prevent="selectCandidate(candidate)" href="#">
              {{ candidate.address }}
            </a>
          </li>
        </template>
      </ul>
    </details>

    <div class="grid">
      <input
        type="text"
        placeholder="Latitude"
        readonly
        v-model="state.coords.y"
      />
      <input
        type="text"
        placeholder="Longitude"
        readonly
        v-model="state.coords.x"
      />
    </div>

    <!-- <pre>{{ state.coords }}</pre> -->
  </div>
</template>
