/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Select, Title2 } from '../styles'
import { useUXStore } from '../../index.js'
import places from '../../db/places'
import List from './List'
import MainForm from './MainForm'
import Menu from './Menu'
import Header from './Header'

export const App = observer(() => {
  const store = useUXStore()
  const { section = null, mainList = [] } = store

  // Move logic to List
  const handleChangePlace = (e) => {
    store.placeId = e.target.value
  }

  return (
    <>
      <Header />
      <Menu />

      { ((
        section === 'we_need_help' || 
        section === 'i_want_to_help')) && 
        <Page>
          <MainForm section={section} />
        </Page>
      }

      { (
          section === 'hospitals' || 
          section === 'donors' || 
          section === 'residencies' ) && 
        <Page>
          <Title2>
          { section === 'hospitals' && <>🏥 Hospitales de ...</>}
          { section === 'donors' && <>👋🏻 Donantes de ...</>}
          { section === 'residencies' && <>👋🏻 Residencias de ...</>}
          <Filter>
            <Select onChange={handleChangePlace}>
              <option value='all'>Toda España</option>
              { places.map(place => (
                <option 
                  value={place.id} 
                  key={place.id} 
                  selected={place.id === store.placeId}>
                    {place.name}
                </option>)) 
              }
            </Select>
          </Filter>
          </Title2>
          { mainList.length > 0 && <List list={mainList} /> }
          { mainList.length === 0 && <div>No hay datos para esta provincia.</div>}
        </Page>
      }

      <Footer>
        <div>Gracias por ayudar. (r) </div>
        <div>Para más información escribenos a</div>
        <div>emergenciacovid2019@gmail.com</div>
      </Footer>
    </>
  );
})

export default App;

const Page = styled.div`
  width: 100%;
`
const Filter = styled.div`
  padding: 15px 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const Footer = styled.div` 
  color: #ff0000;
  font-size: 15px;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & div {
    color: #999;
    margin-bottom: 5px;
  }
`