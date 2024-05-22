import React from 'react'
import PopUpForm from '../components/PopUpForm'
import ProductList from '../components/ProductList'

export default function Homepage() {
  return (
    <div className='bg-slate-100 rounded-3xl p-8 transition-transform'>
      <h1 className='sm:text-lg md:text-3xl uppercase font-extrabold text-blue-700 lg:text-5xl'>Product Details</h1>
      <ProductList/>
      <PopUpForm/>
    </div>
  )
}
