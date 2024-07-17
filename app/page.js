/**
 * v0 by Vercel.
 * @see https://v0.dev/t/76YF3JgUwCR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Swal from "sweetalert2"

export default function Component() {
  const [cart, setCart] = useState([])
  const [categories, setCategories] = useState([
    {
      name: "Appetizers",
      items: [
        {
          id: 1,
          name: "Garlic Bread",
          description: "Toasted bread with garlic butter",
          price: 4.99,
        },
        {
          id: 2,
          name: "Bruschetta",
          description: "Toasted bread with tomato, basil, and balsamic",
          price: 6.99,
        },
        {
          id: 3,
          name: "Mozzarella Sticks",
          description: "Breaded and fried mozzarella cheese",
          price: 7.99,
        },
      ],
    },
    {
      name: "Entrees",
      items: [
        {
          id: 4,
          name: "Spaghetti Bolognese",
          description: "Pasta with meat sauce",
          price: 12.99,
        },
        {
          id: 5,
          name: "Chicken Parmesan",
          description: "Breaded chicken breast with marinara and mozzarella",
          price: 15.99,
        },
        {
          id: 6,
          name: "Grilled Salmon",
          description: "Salmon fillet with lemon butter sauce",
          price: 18.99,
        },
      ],
    },
    {
      name: "Desserts",
      items: [
        {
          id: 7,
          name: "Tiramisu",
          description: "Classic Italian dessert with espresso and mascarpone",
          price: 6.99,
        },
        {
          id: 8,
          name: "Cheesecake",
          description: "Rich and creamy New York-style cheesecake",
          price: 7.99,
        },
        {
          id: 9,
          name: "Gelato",
          description: "Italian-style ice cream in various flavors",
          price: 4.99,
        },
      ],
    },
  ])


  const handleCheckout = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Your cart is empty",
        text: "Please add items to your order",
      })
    }
    else {
      Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: `Your order total is $${total.toFixed(2)}`,
        confirmButtonText: "OK",
        onClose: () => setCart([]),
      })
    }
    setCart([])
  }

  const handleAddToCart = (item) => {
    setCart([...cart, item])
  }
  const handleRemoveFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }
  const handleUpdateQuantity = (itemId, quantity) => {
    setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }
  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MenuIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Restaurant</h1>
          </div>

        </div>
      </header>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 p-6">
        <div className="overflow-auto">
          {categories.map((category) => (
            <div key={category.name} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <Card key={item.id} className="bg-background">
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${item.price.toFixed(2)}</div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => handleAddToCart(item)} className="w-full">
                        Add to Order
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-background rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Order</h2>
          <div className="grid gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-muted-foreground">${item.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                    disabled={(item.quantity || 1) <= 1}
                  >
                    <MinusIcon className="w-4 h-4" />
                  </Button>
                  <div>{item.quantity ? item.quantity : 1}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                  >
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveFromCart(item.id)}>
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div className="font-medium">Total:</div>
            <div className="text-2xl font-bold">${total.toFixed(2)}</div>
          </div>
          <Button className="w-full mt-4" onClick={handleCheckout}>Place Order</Button>
        </div>
      </div>
    </div>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}