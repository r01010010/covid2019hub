/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import _ from 'lodash'
import { useUXStore } from '../../index.js'
import restClient from '../../network/main_server/rest_api_client'
import products from '../../db/products'
import hospitals from '../../db/hospitals'
import places from '../../db/places'

// const orderedPlaces = _.chain(places).orderBy(['nm']).value()

export const Product = ({ label, qt, icon }) => <HItem>{icon} <span style={{ fontWeight: 500, width: 200, color: '#444'}}>{label}</span> {qt === 0 ? 'Cubierto' : !qt ? <span style={{ color: '#aaa' }}>N/C</span> : <span style={{ color: '#888'}}> <span style={{ color: 'red', fontWeight: 'bold' }}>{qt}</span></span>}</HItem>

const normalWithChunk = (phone = '', chunk = 0) => {

  const e = _.chain(phone)
    .replace(' ', '')
    .replace('+34', '')
    .replace('034', '')
    .split('')
    .chunk(3)
    .map(chunk => chunk.join(''))
    .join(' ')
    .value()

  return e
}

const placeNameById = (placeId) => {
  console.log(placeId)
  const place = places.find(({id}) => id === placeId)
  console.log(place)
  return place
}

const normalizeString = (str = '') => {
  return str.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase())
}

export const App = observer(() => {
  const [form, setForm] = useState({});
  const [response, setResponse] = useState(null);
  const [mainList, setMainList] = useState([]);
  const [formHospitalsSelectOptions, setFormHospitalsSelectOptions] = useState(places)

  const store = useUXStore()
  const { section } = store
  
  const activate = (section) => {
    setResponse(null)
    if (section === 'hospitals') getList({category: 'hospital',  type: 'all'})
    if (section === 'donors') getList({category: 'all', type: 'donor'})
    store.section = section;
  }

  const handleChange = (e, field) => {
    const value = e.target.value

    if (field === 'placeId') setFormHospitalsSelectOptions(hospitals.filter(({ province }) => { 
      return province === value
    }))
    if (field === 'code' && form.category === 'hospital') form.center = hospitals.find(({ code }) =>  {
      return code === parseInt(value)
    }).name

    setForm({ ...form, [field]: e.target.value})
  }

  const handleChangePlace = (e) => {
    store.placeId = e.target.value
    if (section === 'hospitals') getList({category: 'hospital',  type: 'all'})
    if (section === 'donors') getList({category: 'all', type: 'donor'})
  }

  const createUser = () => {
    restClient.users.create({
      ...form,
      placeId: form.placeId,
      lang: 'es-es',
      type: section === 'we_need_help' ? 'receiver' : 'donor'
    }, (err, data) => {
      setResponse({ err, data })
    })
  }

  const getList = (options) => {
    restClient.users.get({ ...options, placeId: store.placeId || 'all' }, (err, list = []) => {
      setMainList(list)
    })
  }

  return (
    <>
      <Title>
        {/* <div><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/pager_1f4df.png" width="120" height="120"></img></div> */}
        <div>EMERGENCIA</div>
        <div style={{ fontSize: 35 }}>COVID2019</div>
        <div style={{ fontSize: 18, color: '#999', fontWeight: 400, marginTop: 3, fontFamily: 'Helvetica' }}>Escríbenos <u style={{ color: '#999' }}>covid2019hub@gmail.com</u></div>
      </Title>

      <Welcome>
        Informe en tiempo real de lo que necesita cada hospital para que empresas y civiles puedan ayudar.
      </Welcome>

      <MenuButtons>
        <Button selected={section === 'we_need_help'} onClick={() => activate('we_need_help')} style={{ background: 'red', color: 'white', border: '1px solid #ff0000' }}>🆘 S O S !</Button>
        <Button selected={section === 'i_want_to_help'} onClick={() => activate('i_want_to_help')} color='white'><img src="https://media-edg.barcelona.cat/wp-content/uploads/2014/05/RedCross.png" width="15"/> AYUDAR</Button>
        <Button selected={section === 'hospitals'} onClick={() => activate('hospitals')} style={{ background: '#ddd', color: '#444'}}>🏥 HOSPITALES</Button>
        <Button selected={section === 'donors'} onClick={() => activate('donors')} style={{ background: '#ddd', color: '#444'}}>👋🏻 DONANTES</Button>
        { /*<Button selected={section === 'manuals'} onClick={() => activate('manuals')} style={{ background: '#ddd', color: '#444', height: 80}}>🖍 MANUALES <div style={{ color: '#aaa', fontWeight: 400, fontSize: 15, marginTop: 3}}>HAZLO TU MISM@ EN CASA</div></Button> */}
        {/* <Button selected={section === 'i_want_to_help'} onClick={() => activate('i_want_to_help')} color='white' style={{ background: '#ddd', color: '#444'}}><img src="https://cdn.onlinewebfonts.com/svg/img_564932.png" width="20"/> &nbsp;FARMACIAS</Button>
        <Button selected={section === 'i_want_to_help'} onClick={() => activate('i_want_to_help')} color='white' style={{ background: '#ddd', color: '#444'}}><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/shopping-trolley_1f6d2.png" width="20"/> &nbsp;SUPERMERCADOS</Button> */}

      </MenuButtons>

      { response && <FormResponse><div style={{ fontSize: 40 }}>GRACIAS</div>Estamos verificando tu información. Si todo es correcto aparecerá en la web en unos minutos. Gracias!</FormResponse> }

      { ((section === 'we_need_help' || section === 'i_want_to_help') && !response) && 
        <div style={{ width: '100%'}}>
          <Title3>{section === 'we_need_help' ? '🆘 SOS!' : <><img src="https://media-edg.barcelona.cat/wp-content/uploads/2014/05/RedCross.png" width="20"/> Ayudar </>}</Title3>
          {section === 'we_need_help' ? 
            <div style={{ marginTop: 8 }}>Trabajas en un Hospital u otro centro que necesita ayuda? Usa este formulario para solicitarla.</div>
          : 
            <div style={{ marginTop: 8 }}>Tienes una impresora 3D? Quizás una máquina de coser? Conocimientos? Se te ocurre algo para ayudar? Usa el formulario y registrate en nuestra base de datos. Te pondremos en contacto con centros que lo necesitan!</div> 
          }
          
          <HelpForm>
            <div style={{ marginBottom: 5, width: '100%' }}>
              { section === 'we_need_help' &&
                <Select value={form.category} onChange={(e) => handleChange(e, 'category')}>
                  <option value='null'>Destino</option>
                  <option value='hospital'>Hospital</option>
                  <option value='pharm'>Farmacia</option>
                  <option value='residency'>Residencia</option>
                  <option value='supermarket'>Supermercado</option>
                  <option value='person'>Persona</option>
                  <option value='other'>Otro</option>
                </Select>
              }
              
              { section === 'i_want_to_help' && 
                <Select value={form.category} onChange={(e) => handleChange(e, 'category')}>
                  <option value='null'>Soy/Tengo ...</option>
                  <option value='3dprinter'>Impresora 3D</option>
                  <option value='transporte'>Transporte</option>
                  <option value='costura'>Costura</option>
                  <option value='specialist'>Especialista</option>
                  <option value='other'>Otro</option>
                </Select> 
              }
            </div>
            <div style={{ marginBottom: 5 }}>
              <Select value={form.placeId} onChange={(e) => handleChange(e, 'placeId')}>
                <option>Provincia</option>
                { places.map(place => (<option value={place.id} key={place.id}>{place.name}</option>)) }
              </Select> 
              {/* <Select value={form.placeId} onChange={(e) => handleChange(e, 'placeId')}>
                <option>Provincia</option>
                { orderedPlaces.map(place => (<option value={parseInt(place.id)} key={place.id}>{place.nm}</option>)) }
              </Select> */}
            </div>
            { form.category === 'hospital' && 
              <div style={{ marginBottom: 5 }}>
                <Select value={form.code} onChange={(e) => handleChange(e, 'code')}>
                  <option>Seleccione Hospital</option>
                  { formHospitalsSelectOptions.map(hospital => (<option value={hospital.code} key={hospital.code}>{hospital.name}</option>)) }
                </Select> 
                {/* <Select value={form.placeId} onChange={(e) => handleChange(e, 'placeId')}>
                  <option>Provincia</option>
                  { orderedPlaces.map(place => (<option value={parseInt(place.id)} key={place.id}>{place.nm}</option>)) }
                </Select> */}
              </div> 
            }
            { form.category !== 'hospital' &&
              <Input type='text' placeholder='Empresa o centro (Ej. Asociación amigos de la sanidad) ' value={form.center} onChange={(e) => handleChange(e, 'center')} ></Input>
            }
            {/* <Input type='text' placeholder='Código' value={form.code} onChange={(e) => handleChange(e, 'code')} ></Input> */}
            <Input type='text' placeholder='Nombre y apellidos de contacto' value={form.name} onChange={(e) => handleChange(e, 'name')} ></Input>
            <Input type='email' placeholder='Email' value={form.email} onChange={(e) => handleChange(e, 'email')} ></Input>
            <Input type='tel' placeholder='Telefono' value={form.phone} onChange={(e) => handleChange(e, 'phone')} ></Input>
            
            <ProductList>
            { products.map(p => (
              <ProductItem>
                <ProductName>
                  {p.name}
                </ProductName>
                <ProductQuantity>
                  <Input type="Number" value={form[p.id]} onChange={(e) => handleChange(e, p.id)} placeholder="0" />
                </ProductQuantity>
              </ProductItem>
            ))}
            </ProductList>

            <Textarea 
              placeholder={ 
                section === 'we_need_help' 
                  ? 'Indica qué necesitas, cuánto necesitas, para cuando lo necesitas, quien crees que podría aportarlo?' 
                  : 'Indica en qué puedes ayudar. Cuanto puedes aportar, cuando, a quien? Gracias!'
              }
              value={form.description}
              onChange={(e) => handleChange(e, 'description')}   
              />
            { section === 'we_need_help' &&  <ButtonHelpMe onClick={createUser}>PEDIR AYUDA</ButtonHelpMe> }
            { section === 'i_want_to_help' &&  <ButtonHelpMe onClick={createUser}>AYUDAR</ButtonHelpMe> }
          </HelpForm>
        </div>
      }

      { (section === 'hospitals' || section === 'donors') && 
        <List>
          <Title2>
          { section === 'hospitals' && <>🏥 Hospitales de ...</>}
          { section === 'donors' && <>👋🏻 Donantes de ...</>}
          <Filter>
            <Select onChange={handleChangePlace}>
              <option value='all'>Toda España</option>
              { places.map(place => (<option value={place.id} key={place.id} selected={place.id === store.placeId}>{place.name}</option>)) }
            </Select>
          </Filter>
          </Title2>
          { mainList.map(item => (
            <Hospital key={item.id}>
              <HName>{normalizeString(item.center) || normalizeString(item.name)} <HLocation>📍{placeNameById(item.placeId).name}</HLocation></HName>
              <HEmail>✉️{normalizeString(item.name)} ({(item.email || '').toLowerCase() || 'Desconocido'}) </HEmail>
              <HPhone> ☎️ {normalWithChunk(item.phone, 3) || 'Desconocido'}</HPhone>
              {/* <HDescription>{item.email}</HDescription> */}
              <HDescription>{item.description || 'Sin descripción'}</HDescription>
              {/* <HDescription><a href={`https://www.google.com/maps/place/${(item.center || '').split(' ').join('+')}+${(item.address || '').split(' ').join('+')}`} target='_blank' rel='noopener noreferrer'>{item.address || ''}</a></HDescription> */}
              <Product icon='😷' label='Mascarillas' qt={item.masks} />
              <Product icon='♻️' label='Respiradores' qt={item.respirators} />
              <Product icon='🥋' label='Epis' qt={item.epis} />
              <Product icon='🥼' label='Batas' qt={item.coats} />
              <Product icon='🥽' label='Viseras' qt={item.viseras} />
              {/* <Buttons> 
                <Button><img src="https://media-edg.barcelona.cat/wp-content/uploads/2014/05/RedCross.png" width="15"></img> AYUDAR</Button>
              </Buttons> */}
              <div style={{ height: 1, background: '#888', marginTop: 20, opacity: 0.2 }}/>
            </Hospital>
          ))}
          { mainList.length === 0 && <div>No hay datos para esta provincia.</div>}
        </List>
      }

      { section === 'manuals' && <div style={{ width: '100%' }}>
          <Title3>🖍 Manuales</Title3>
          <div style={{ marginTop: 8 }}>Manuales para crear en tu casa todo lo que necesitas para protegerte.</div>

        </div>
      }

      <Footer>
        <div>Gracias por ayudar. (r) </div>
        <div>Para más información covid2019hub@gmail.com</div>
      </Footer>
    </>
  );
})

export default App;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`
const ProductItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`
const ProductName = styled.div`
  flex: 1;
`
const ProductQuantity = styled.div`
  flex: 1;
`

const List = styled.div`
  width: 100%;
`
const FormResponse = styled.div`
  padding: 40px 0 0 0;
  text-align: center;
`
const HelpForm = styled.div`
  padding: 20px 0;
  width: 100%;
`
const Input = styled.input`
  height: 40px;
  border-radius: 5px;
  width: 100%;
  padding-left: 10px;
  font-size: 16px;
  border: none;
  margin-bottom: 5px;
  color: black;
`
const Textarea = styled.textarea`  
  height: 40px;
  border-radius: 5px;
  width: 100%;
  padding-left: 10px;
  font-size: 16px;
  border: none;
  margin-bottom: 5px;
  color: black;
  padding: 10px;
  height: 100px;
`
const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const Welcome = styled.div`
  font-size: 16px;
  padding: 10px 0;
`
const MenuButtons = styled.div`
  flex-direction: column;
  padding: 10px 0 0 0;
  width: 100%;

  & button {
    color: #FB0000;
    font-size: 18px;
    font-weight: 800;
    border: none;
    padding: 10px;
    margin-bottom: 10px;
    background-color: white;
    width: 100%;
  }
`
const Title2 = styled.div`
  font-size: 30px;
  padding: 30px 0 10px 0;
  font-weight: 600;
`
const Title3 = styled.div`
  font-size: 30px;
  padding: 25px 0 5px 0;
  font-weight: 600;
`
const Hospital = styled.div`
  padding: 15px 0;
`
const HName = styled.div`
  font-size: 25px;
  padding-bottom: 10px;
  font-weight: 600;
  flex-direction: column;
  display: flex;
`
const HContact = styled.div`

`
const HLocation = styled.div`
  font-weight: 400;
  font-size: 18px;
  padding-left: 0px;
  padding-top: 10px;
  color: #444;
`
const HEmail = styled.div`
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 7px;
  margin-top: 0px;
  color: #444;
`
const HPhone = styled.div`
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 0px;
  color: #444;
`
const HDescription = styled.div`
  font-size: 16px;
  padding-bottom: 10px;
  color: #999;
`
const HItem = styled.div`
  font-size: 17px;
  padding-bottom: 4px;
`
const HNCLabel = styled.span``
const HNQtInNeed = styled.span``

const Buttons = styled.div`
  padding: 10px 0;
`
const Button = styled.button`
  border-radius: 5px;
  height: 50px;
  font-weight: 600;
  font-size: 15px;
  color: #ff0000;
  cursor: pointer;
  background-color: #fff;
  width: 100%;
  border: 1px solid #d1d1d1;
`
const ButtonHelpMe = styled.button`
  border-radius: 5px;
  height: 50px;
  font-weight: 600;
  font-size: 15px;
  color: white;
  cursor: pointer;
  padding: 10px;
  background-color: red;
  width: 100%;
  border: none;
`
const Filter = styled.div`
  padding: 15px 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const Select = styled.select`
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 600;
  color: #444;
  line-height: 1.3;
  padding: .6em 1.4em .5em .8em;
  width: 100%;
  max-width: 100%; 
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
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