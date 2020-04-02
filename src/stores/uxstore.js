/* eslint-disable no-unused-vars */
import { observable, action, computed } from 'mobx'
import { computedAsync } from 'computed-async-mobx'
import restClient from '../rest/client'

export default class UXStore {
  @observable
  section = null

  @observable
  placeId = null

  observableMainList = computedAsync(
    0,
    async () => {
      const { section, placeId } = this

      if (!section) return

      const filter = 
          section === 'hospitals' ? 
          { category: 'hospital' }
        : section === 'residencies' ?
          { category: 'residency'}
        : section === 'donors' ?
          { type: 'donor' }
        : {}

      const response = await restClient.users.getPromise({ 
          ...filter, 
          placeId: placeId || undefined
        })
      const data = await response.json()

      return data
    }
  );

  @computed get mainList() {
    return this.observableMainList.value
  }
}