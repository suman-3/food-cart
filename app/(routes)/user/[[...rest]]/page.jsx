"use client"

import { UserButton, UserProfile } from '@clerk/nextjs'
import { ShoppingBag } from 'lucide-react'
import React from 'react'
import MyOrders from '../_components/MyOrders'

const User = () => {
  return (
    <div className='flex justify-center items-center'>
        <UserProfile>
        <UserButton.UserProfilePage
        label="My Orders"
        url="my-orders"
        labelIcon={<ShoppingBag  className='h-4 w-4'/>}
      >
        <MyOrders/>
      </UserButton.UserProfilePage>

        </UserProfile>
    </div>
  )
}

export default User