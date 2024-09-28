import { useMemo } from 'react'
import '../index.css'
import type { CartItem, Guitar } from '../types/type'

type HeaderProps = {
    cart: CartItem[]
    increaseQuantity: (id: Guitar["id"]) => void
    decreaseQuantity: (id: Guitar["id"]) => void
    removeFromCart: (id: Guitar["id"]) => void
    resetCart: () => void
}

function Header ({
        cart, 
        increaseQuantity, 
        decreaseQuantity, 
        removeFromCart, 
        resetCart
    } : HeaderProps){
        
    const isEmpty = useMemo( () => cart.length === 0, [cart] )
    const totalPrice = useMemo( () => cart.reduce((total : number, item : CartItem) => total + (item.price * item.quantity), 0), [cart])

    return(
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {isEmpty ? 
                            <p className="text-center">El carrito esta vacio</p>
                            :
                            
                            <>
                            <table className="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item: CartItem) => (
                                    <tr key={item.id}>
                                        <td>
                                            <img className="img-fluid" src={`/img/${item.image}.jpg`} alt="imagen guitarra" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td className="fw-bold">
                                                ${item.price}
                                        </td>
                                        <td className="flex align-items-start gap-4">
                                            <button
                                                onClick={() => decreaseQuantity(item.id)}
                                                type="button"
                                                className="btn btn-dark"
                                            >
                                                -
                                            </button>
                                                {item.quantity}
                                            <button
                                                onClick={() => increaseQuantity(item.id)}
                                                type="button"
                                                className="btn btn-dark"
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="btn btn-danger"
                                                type="button"
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                    
                                </tbody>
                                </table>
                                

                                <p className="text-end">Total pagar: <span className="fw-bold">${totalPrice}</span></p>
                                <button onClick={resetCart} className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                            </>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        </header>
    )
}

export default Header