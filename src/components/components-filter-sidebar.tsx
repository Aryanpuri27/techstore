'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export function FilterSidebarComponent() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [categories, setCategories] = useState({
    electronics: false,
    clothing: false,
    books: false,
    home: false,
  })

  const handleCategoryChange = (category: string) => {
    setCategories(prev => ({ ...prev, [category]: !prev[category] }))
  }

  return (
    <div className="bg-background p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Categories</h3>
        {Object.entries(categories).map(([category, checked]) => (
          <div key={category} className="flex items-center mb-2">
            <Checkbox
              id={category}
              checked={checked}
              onCheckedChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={category} className="ml-2 text-sm font-medium capitalize">
              {category}
            </label>
          </div>
        ))}
      </div>
      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}