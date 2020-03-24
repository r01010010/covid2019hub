/* eslint-disable no-unused-vars */
import { observable, action, computed } from 'mobx'
// import _ from 'lodash'
// import { Observable, of, timer } from 'rxjs'
// import { skipWhile, debounce, map, bufferCount, concatAll, groupBy, scan } from 'rxjs/operators'
// import { observer, useObservable } from 'mobx-react-lite'

export class UXStore {
  @observable
  section = null

  @observable
  place = null
}