import React, { useState } from 'react'
import url from "../../img/noun-url-1244044.svg";
import './index.css'

const Form = () => {
    const initialState = {
      url: '',
      descripcion: '',
      name: '',
    }
    const [values, setValues] = useState(initialState)

    const handelSubmit = (e) =>{
        e.preventDefault();
        console.log(values);
    }
    const handelChange = (e) =>{
      const {name, value} = e.target
      setValues({...values, [name]: value})
      console.log(name, value);
    }
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <label form='url' className='label'>
            <img src={url} alt="" className='image' />
        <input type="text" name='url' placeholder='Url de la imagen' onChange={handelChange}/>
        </label>
        <label form='name' className='label'>
            <img src={url} alt="" className='image' />
        <input type="text" name='name' placeholder='Nombre de la imagen' onChange={handelChange}/>
        </label>
        <label form='descripcion' className='label'>
            <img src={url} alt="" className='image' />
        <input type="text" name='descripcion' placeholder='Descripcion de la imagen' onChange={handelChange}/>
        </label>
        <button>Save</button>
      </form>
    </div>
  )
}

export default Form
