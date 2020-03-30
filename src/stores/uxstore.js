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
      let filter = {}

      if (!section) return

      if (section === 'hospitals') 
        filter = { category: 'hospital',  type: 'all' }
      if (section === 'residencies') 
        filter = { category: 'residency', type: 'all' }
      if (section === 'donors') 
        filter = { category: 'all', type: 'donor' }

      const response = await restClient.users.getPromise({ 
          ...filter, 
          placeId: placeId || 'all' 
        })
      const data = await response.json()

      return data
    }
  );

  @computed get mainList() {
    return this.observableMainList.value
  }
}