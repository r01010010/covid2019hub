import React from 'react'
import styled from 'styled-components'
import { 
  placeNameById, 
  normalizeTitle 
} from '../../helpers'

// LIST
// bookmark golist
export default ({ list = [] }) => (
  <List>
    { list.map(item => <Item item={item} />) }
  </List>
)

// bookmark goliststyles
const List = styled.div`
  width: 100%;
`

// ITEM
// bookmark goitem
export const Item = ({ item }) => (
  <ListItem key={item.id}>
    <ITitle>
      {normalizeTitle(item.center) || normalizeTitle(item.name)} 
      <ILocation>📍{placeNameById(item.placeId).name}</ILocation>
    </ITitle>
    <IEmail>‍️📇 {normalizeTitle(item.name)} </IEmail>
    <IEmail>✉️ {(item.email || '').toLowerCase() || 'Desconocido'} </IEmail>
    {/* <HPhone>
          ☎️ <a href={`tel:${item.phone}`}>{normalPhone(item.phone, 3) 
          || 'Desconocido'}</a>
        </HPhone> 
     */}
    <IDescription>{item.description || 'Sin descripción'}</IDescription>
    <Product icon='😷' label='Mascarillas' qt={item.masks} />
    <Product icon='🥽' label='Viseras' qt={item.visors} />
    <Product icon='♻️' label='Respiradores' qt={item.respirators} />
    <Product icon='🥋' label='Epis' qt={item.epis} />
    <Product icon='🥼' label='Batas' qt={item.coats} />
    <Product icon='🛏' label='Camillas' qt={item.stretchers} />
    <Product icon='💊' label='Hidrocloroquina' qt={item.hidrocloroquine} />
    <HR/>
  </ListItem>
)

// bookmark goitemstyles
const ListItem = styled.div`
  padding: 15px 0;
`
const ITitle = styled.div`
  font-size: 25px;
  padding-bottom: 10px;
  font-weight: 600;
  flex-direction: column;
  display: flex;
`
const IEmail = styled.div`
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 7px;
  margin-top: 0px;
  color: #444;
`
// const HPhone = styled.div`
//   font-weight: 400;
//   font-size: 18px;
//   margin-bottom: 10px;
//   margin-top: 0px;
//   color: #444;
// `
const ILocation = styled.div`
  font-weight: 400;
  font-size: 18px;
  padding-left: 0px;
  padding-top: 10px;
  color: #444;
`
const IDescription = styled.div`
  font-size: 16px;
  padding-bottom: 10px;
  color: #999;
`

// PRODUCT
// bookmark goproduct
export const Product = ({ label, qt, icon }) => {
  if (!qt) return <></>
  
  return <PItem>
    {icon} <PLabel>{label}</PLabel> 
    <PQt>{
      qt.toLocaleString(
        undefined, 
        { minimumFractionDigits: 0 })
      .replace(',', '.')}
    </PQt>
  </PItem>
}

// bookmark goproductstyles
const PItem = styled.div`
  font-size: 17px;
  padding-bottom: 4px;
`
const PLabel = styled.span`
  font-weight: 500;
  width: 200px;
  color: #444;
  padding-right: 5px;
`
const PQt = styled.span`
  color: red;
  font-weight: bold;
`
const HR = styled.div`
  height: 1px; 
  background: #888; 
  margin-top: 20px;
  opacity: 0.2;
`