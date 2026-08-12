// Static content for now. In Phase 2 this can be replaced with a
// fetch() call to the Express API / MongoDB "products" collection.

export const products = [
  { id: 'tomato', name: 'Tomato', category: 'Vegetables', tag: 'Fresh, export grade' },
  { id: 'onion', name: 'Onion', category: 'Vegetables', tag: 'Bulk and retail' },
  { id: 'pepper', name: 'Pepper', category: 'Vegetables', tag: 'Seasonal' },
  { id: 'potato', name: 'Potato', category: 'Vegetables', tag: 'Year-round' },
  { id: 'cabbage', name: 'Cabbage', category: 'Vegetables', tag: 'Seasonal' },
  { id: 'green-beans', name: 'Green beans', category: 'Vegetables', tag: 'Seasonal, export' },
  { id: 'papaya', name: 'Papaya', category: 'Fruits', tag: 'Seasonal' },
  { id: 'watermelon', name: 'Watermelon', category: 'Fruits', tag: 'Seasonal' },
  { id: 'bitter-gourd', name: 'Bitter gourd', category: 'Fruits', tag: 'Newer export crop' },
  { id: 'bean-seed', name: 'Bean seed', category: 'Seeds', tag: 'Certified seed' },
  { id: 'onion-seed', name: 'Onion seed', category: 'Seeds', tag: 'Certified seed' },
  { id: 'maize-seed', name: 'Maize seed', category: 'Seeds', tag: 'Certified seed' },
]

export const categories = ['All', 'Vegetables', 'Fruits', 'Seeds']
