import React, { useState } from 'react'
import styled from 'styled-components'
import { 
  placeNameById, 
  normalizeTitle,
  normalizeName 
} from '../../helpers'
import restClient from '../../rest/client'
import products from '../../db/products'

// LIST
// bookmark golist
export default ({ list = [] }) => (
  <List>
    { list.map(item => <Item key={item._id} item={item} />) }
  </List>
)

// bookmark goliststyles
const List = styled.div`
  width: 100%;
`

// ITEM
// bookmark goitem
export const Item = ({ item }) => {
  
  const [compatibles, setCompatibles] = useState(null)

  const getCompatibles = () => {
    const query = {
      type: item.type === 'donor' ? 'receiver' : 'donor',
      placeId: item.placeId,
      $or: products
        .filter(({ id })=> !!item[id])
        .map(({ id }) => ({ [id]: { $gt: 0 } }))
    }
    
    restClient.users.get(query, (e, compatibles = null) => setCompatibles(compatibles))
  }

  return (
    <ListItem key={item.id}>
      <ITitle>
        {normalizeTitle(item.center) || normalizeTitle(item.name)} 
        <ILocation>{placeNameById(item.placeId).name.toLowerCase()}</ILocation>
      </ITitle>
      <IName>‍️{normalizeName(item.name)}</IName>
      <IEmail>‍️{(item.email || '').toLowerCase() || 'Sin email'} </IEmail>
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
      <Actions>
        <Action onClick={getCompatibles}>VER {item.type === 'receiver' ? 'DONANTES' : 'NECESITADOS'} 
        &nbsp;EN { item.placeId.toUpperCase() }&nbsp;
        <img src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-arrow-24.png" width="12" style={{ paddingTop: 7, opacity: .6 }}/></Action>
      </Actions>
      { compatibles && compatibles.length > 0 && <Donors>
        { compatibles.map(donor => (
          <Donor type={item.type}>
            <DName>{normalizeName(donor.center) || normalizeName(donor.name)}</DName>
            <DEmail>{donor.email}</DEmail>
            <DDescription>{donor.description}</DDescription>
            <DProducts>
              { products
                  .filter(p => !!donor[p.id])
                  .map(p => (
                    <DProduct key={p.id}>
                      <DPName>{p.icon}</DPName>
                      <DPQt type={item.type}>{donor[p.id].toLocaleString().replace(',', '.')}</DPQt>
                    </DProduct>
                  ))}
            </DProducts>
          </Donor>
        ))}
        { !compatibles && <div>Sin información</div> }
      </Donors> }
    </ListItem>
)}

// bookmark goitemstyles
const DProducts = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
const DProduct = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 10px;
`
const DPName = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const DPQt = styled.div`
  color:${(props) => props.type === 'donor' ? 'red' : '#007300'};
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Donors = styled.div`
  padding: 15px 10px 10px 0px;
`
const Donor = styled.div`
  font-weight: 600;
  color: #555;
  font-size: 15px;
  padding: 10px 0px;
  box-shadow: 0 1px 3px rgba(0,233,233,0.12), 0 1px 1px rgba(0,0,0,0.24);
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  background:${(props) => props.type === 'donor' ? '#fffafa' : '#F6FFF6'};

`
const DName = styled.div`
  text-transform: capitalize;
  font-weight: 600;
  color: #555;
  font-size: 15px;
`
const DEmail = styled.div`
  font-weight: 400;
  margin-bottom: 5px;
  color: #888;
`
const DDescription = styled.div`
  font-weight: 400;
  margin-bottom: 5px;
  color: #888;
  font-size: 14px;
  margin-top: 15px;
`
const Actions = styled.div`
  padding: 15px 0px 0px 0px;
`
const Action = styled.a`
  font-weight: 500;
  cursor: pointer;
  color: #555;
  font-size: 15px;
`
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
  color: #555;
`
const ILocation = styled.div`
  font-weight: 400;
  font-size: 18px;
  padding-left: 0px;
  color: #6E6E6E;
`
const IName = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin-top: 13px;
  color: #555;
  margin-top: 16px;
  text-transform: capitalize;
`
const IEmail = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 15px;
  color: #555;
  margin-top: 3px;
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
  color: #555;
  font-size: 30px;
  line-height: 5px;
`

// const HPhone = styled.div`
//   font-weight: 400;
//   font-size: 18px;
//   margin-bottom: 10px;
//   margin-top: 0px;
//   color: #555;
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
  color: #555;
  text-align: right;
`
const PQt = styled.div`
  color: ${({ type }) => type === 'donor' ? 'green' : 'red'};
  text-align: right;
`

