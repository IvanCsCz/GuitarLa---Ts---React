import { useEffect, useState } from "react"
import { db } from "../data/db"
import type { CartItem, Guitar } from "../types/type"

const MAX_ITEMS = 5
const MIN_ITEMS = 1

const initialCart = () => {
  const localStorageCart = localStorage.getItem('cart')
  return localStorageCart ? JSON.parse(localStorageCart) : []
}

function useCart() {
  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  
  const addToCart = (item : Guitar) => {
    const itemExists = cart.findIndex((guitar : Guitar)  => guitar.id === item.id)
    
    if( itemExists >= 0){
      
      if(cart[itemExists].quantity < 5){
        const updatedCart = [...cart]
        updatedCart[itemExists].quantity++
        setCart(updatedCart)
      }

    } else {
      const newItem: CartItem = {...item, quantity: 1}
      setCart([...cart, newItem])
    }
  }
  
  const increaseQuantity = (id: Guitar['id']) =>  {
    const updatedCart = cart.map((item : CartItem) => {
      if(id === item.id && item.quantity < MAX_ITEMS){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  const decreaseQuantity = (id: Guitar['id']) =>  {
    const updatedCart = cart.map((item : CartItem) => {
      if(id === item.id && item.quantity > MIN_ITEMS){
        
          return {
            ...item,
            quantity: item.quantity - 1
          }
        
      }
      return item
    })
    setCart(updatedCart)
  }

  const removeFromCart = (id: Guitar['id']) => {
    const updatedCart = cart.filter( (item : CartItem) => item.id !== id)
    setCart(updatedCart)
  }

  const resetCart = () => setCart([])

  return {
    data,
    cart,
    setCart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    resetCart
  }
}

export default useCart