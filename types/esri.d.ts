interface IEsriResponse {
  spatialReference: {
    wkid: number
    latestWkid: number
  }
  candidates: IEsriResponseCandidate[]
}

interface IEsriResponseCandidate {
  address: string
  location: IEsriCoords
  score: number
  extent: {
    xmin: number
    ymin: number
    xmax: number
    ymax: number
  }
  //   attributes: {},
}

interface IEsriCoords {
  x?: number // longitude
  y?: number // latitude
}
