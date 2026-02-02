import { useState, useEffect } from "react"
import { Footer } from "./componentes/Footer"
import { Guitar } from "./componentes/Guitar"
import { Header } from "./componentes/header"
import { db } from "./data/db"


export const App = () => {

    function initialCart() {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(guitar) {
        const itemIndex = cart.findIndex((item) => guitar.id === item.id)
        console.log(itemIndex);
        if (itemIndex === -1) {
            guitar.quantity = 1;
            setCart([...cart, guitar])
        } else {
            const updatedCart = [...cart]
            updatedCart[itemIndex].quantity++;
            setCart(updatedCart);
        }
    }

    function removeFromCart(guitar) {
        const itemIndex = cart.findIndex((item) => guitar.id === item.id)
        console.log(itemIndex);
        const updatedCart = [...cart]
        updatedCart[itemIndex].quantity--;
        if (updatedCart[itemIndex].quantity === 0) {
            updatedCart.splice(itemIndex, 1);
        }
        setCart(updatedCart);
    }

    function deleteFromCart(guitar) {
        const itemIndex = cart.findIndex((item) => guitar.id === item.id)
        console.log(itemIndex);
        const updatedCart = [...cart]
        updatedCart.splice(itemIndex, 1);
        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    function calculateTotal() {
        /*let total = 0;
        for (const guiatr of cart) {
            total+=guiatr.price * guiatr.quantity;
        }*/
        let total = cart.reduce((total, item) => total += item.price * item.quantity, 0)
        return total;
    }

    return (
        <>
            <Header cart={cart} total={calculateTotal()} addToCart = {addToCart} removeFromCart = {removeFromCart} deleteFromCart = {deleteFromCart} clearCart={clearCart} />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => (
                        <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    )
}
