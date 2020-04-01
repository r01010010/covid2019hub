import React from 'react'
import styled from 'styled-components'
import { 
  placeNameById, 
  normalizeTitle,
  normalizeName 
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
      <ILocation>{placeNameById(item.placeId).name.toLowerCase()}</ILocation>
    </ITitle>
    <IEmail>‍️{normalizeName(item.name)} ({(item.email || '').toLowerCase()}) </IEmail>
    {/* <HPhone>
          ☎️ <a href={`tel:${item.phone}`}>{normalPhone(item.phone, 3) 
          || 'Desconocido'}</a>
        </HPhone> 
     */}
     
    <IDescription><Quote></Quote>{item.description || 'Sin descripción'}<Quote></Quote></IDescription>
     
    <Products>
      <Product icon='😷' label='Mascarillas' qt={item.masks} type={item.type} />
      <Product icon='🥽' label='Viseras' qt={item.visors} type={item.type} />
      <Product icon='♻️' label='Respiradores' qt={item.respirators} type={item.type} />
      <Product icon='🥋' label='Epis' qt={item.epis} type={item.type} />
      <Product icon='🥼' label='Batas' qt={item.coats} />
      <Product icon='🛏' label='Camillas' qt={item.stretchers} type={item.type}  />
      <Product icon='💊' label='Hidrocloroquina' qt={item.hidrocloroquine} type={item.type} />
    </Products>
  </ListItem>
)

// bookmark goitemstyles
const ListItem = styled.div`
  padding: 15px;
  background: white;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`
const ITitle = styled.div`
  font-size: 25px;
  padding-bottom: 0px;
  font-weight: 600;
  flex-direction: column;
  display: flex;
`
const ILocation = styled.div`
  font-weight: 400;
  font-size: 18px;
  padding-left: 0px;
  color: #6E6E6E;
`
const IEmail = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 15px;
  margin-top: 13px;
  color: #444;
`
const Products = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
`
const IDescription = styled.div`
  font-size: 16px;
  padding-bottom: 10px;
  color: #999;
  padding-top: 10px;
`
const Quote = styled.span`
  color: #444;
  font-size: 30px;
  line-height: 5px;
`

// const HPhone = styled.div`
//   font-weight: 400;
//   font-size: 18px;
//   margin-bottom: 10px;
//   margin-top: 0px;
//   color: #444;
// `


// PRODUCT
// bookmark goproduct
export const Product = ({ label, qt, icon }) => {
  if (!qt) return <></>
  
  return (
    <PItem>
      <Icon>{icon}</Icon>
      <PLabel>{label}</PLabel>
      <PQt>{
        qt.toLocaleString(
          undefined, 
          { minimumFractionDigits: 0 })
        .replace(',', '.')}
      </PQt>
    </PItem>
  )
}

// bookmark goproductstyles
const PItem = styled.div`
  font-size: 16px;
  padding-bottom: 4px;
  margin-right: 20px;
`
const Icon = styled.div`
  text-align: right;
`
const PLabel = styled.div`
  font-weight: 500;
  color: #444;
  text-align: right;
`
const PQt = styled.div`
  color: ${({ type }) => type === 'donor' ? 'green' : 'red'};
  text-align: right;
`

