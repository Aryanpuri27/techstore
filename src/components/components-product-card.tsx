'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: number
  name: string
  price: number | null
  image: string
  category: string
}

export function ProductCardComponent({ id, name, price, image, category }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48">
          <Image
            src={image}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl font-bold">
              {price !== null && !isNaN(price) ? `$${price.toFixed(2)}` : 'Price not available'}
            </span>
            <Badge variant="secondary">{category}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}