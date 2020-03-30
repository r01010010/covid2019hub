/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-multi-str */
import React, { useState } from 'react'
import styled from 'styled-components'
import { Select, Title3 } from '../styles'
import places from '../../db/places'
import products from '../../db/products'
import hospitals from '../../db/hospitals'
import restClient from '../../rest/client'

export default ({ section }) => {
  const [form, setForm] = useState({});
  const [response, setResponse] = useState(null);

  const [
    formHospitalsSelectOptions, 
    setFormHospitalsSelectOptions
  ] = useState(places)

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

  const handleChange = (e, field) => {
    const value = e.target.value

    if (field === 'placeId') 
      setFormHospitalsSelectOptions(hospitals.filter(({ province }) => { 
        return province === value
      }))

    if (field === 'code' && form.category === 'hospital') 
      form.center = hospitals.find(({ code }) =>  {
        return code === parseInt(value)
      }).name

    setForm({ ...form, [field]: value })
  }

  return (
    <>
      <Title3>
        {section === 'we_need_help' 
          ? '🆘 SOS!' 
          : <><img 
                src="https://media-edg.barcelona.cat/wp-content/uploads/2014/05/RedCross.png" 
                width="20"/> 
                &nbsp;Ayudar 
            </>
         }
      </Title3>

      {section === 'we_need_help' ? 
        <Paragraph>
          Trabajas en un Hospital 
          u otro centro que necesita ayuda? 
          Usa este formulario para solicitarla.
        </Paragraph>
      : 
        <Paragraph>
          Tienes una impresora 3D? 
          Quizás una máquina de coser? Conocimientos? 
          Se te ocurre algo para ayudar? Usa el formulario 
          y registrate en nuestra base de datos. 
          Te pondremos en contacto con centros que lo necesitan!
        </Paragraph> 
      }
      
      <HelpForm>
        <DestinySelect>
          { section === 'we_need_help' ?
            <Select 
              value={form.category} 
              onChange={(e) => handleChange(e, 'category')}>
              <option value='null'>Destino</option>
              <option value='hospital'>Hospital</option>
              <option value='pharm'>Farmacia</option>
              <option value='residency'>Residencia</option>
              <option value='supermarket'>Supermercado</option>
              <option value='person'>Persona</option>
              <option value='other'>Otro</option>
            </Select>
          :
            <Select 
              value={form.category} 
              onChange={(e) => handleChange(e, 'category')}
            >
              <option value='null'>Soy/Tengo ...</option>
              <option value='3dprinter'>Impresora 3D</option>
              <option value='transporte'>Transporte</option>
              <option value='costura'>Costura</option>
              <option value='specialist'>Especialista</option>
              <option value='other'>Otro</option>
            </Select> 
          }
        </DestinySelect>
        <div style={{ marginBottom: 5 }}>
          <Select 
            value={form.placeId} 
            onChange={(e) => handleChange(e, 'placeId')}
          >
            <option>Provincia</option>
            { places.map(place => (
              <option value={place.id} key={place.id}>
                {place.name}
              </option>)) }
          </Select> 
        </div>

        { form.category === 'hospital' && 
          <div style={{ marginBottom: 5 }}>
            <Select 
              value={form.code} 
              onChange={(e) => handleChange(e, 'code')}
            >
              <option>Seleccione Hospital</option>
              { formHospitalsSelectOptions.map(hospital => (
                <option 
                  value={hospital.code} 
                  key={hospital.code}
                >
                  {hospital.name}
                </option>)) }
            </Select> 
          </div> 
        }
        { form.category !== 'hospital' &&
          <Input 
            type='text' 
            placeholder='Empresa o centro (Ej. Amigos de la sanidad) ' 
            value={form.center} 
            onChange={(e) => handleChange(e, 'center')} />
        }

        <Input 
          type='text' 
          placeholder='Nombre y apellidos de contacto' 
          value={form.name} 
          onChange={(e) => handleChange(e, 'name')} />

        <Input 
          type='email' 
          placeholder='Email' 
          value={form.email} 
          onChange={(e) => handleChange(e, 'email')} />

        <Input 
          type='tel' 
          placeholder='Telefono' 
          value={form.phone} 
          onChange={(e) => handleChange(e, 'phone')} />
        
        <ProductList>
          { products.map(p => (
            <ProductItem>
              <ProductName>
                {p.name}
              </ProductName>
              <ProductQuantity>
                <Input 
                  type="Number" 
                  value={form[p.id]} 
                  onChange={(e) => handleChange(e, p.id)} 
                  placeholder="0" />
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

        { section === 'we_need_help' ? 
            <ButtonSubmit onClick={createUser}>
              PEDIR AYUDA
            </ButtonSubmit> 
          : 
            <ButtonSubmit onClick={createUser}>
              AYUDAR
            </ButtonSubmit> }
      </HelpForm>
    
      { response && 
        <FormResponse>
          <ResponseTitle>GRACIAS</ResponseTitle>
          Estamos verificando tu información. 
          Si todo es correcto aparecerá en la web en unos minutos. 
          Gracias!
        </FormResponse> }
    </>
  )
}

const ResponseTitle = styled.div`
  font-size: 40px;
`
const DestinySelect = styled.div`
  margin-bottom: 5px; 
  width: 100%;
`
const Paragraph = styled.div`
  margin-top: 8;
`
const ButtonSubmit = styled.button`
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