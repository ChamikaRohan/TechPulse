import React from 'react'
import CreateButton from '../components/CreateButton'
import ProductList from '../components/ProductList'

export default function Homepage() {
  return (
    <div className='m-1'>
      <ProductList/>
      <CreateButton/>
    </div>
  )
}
