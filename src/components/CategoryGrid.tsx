import Link from 'next/link'
import Image from 'next/image'

interface Category {
  name: string
  href: string
  imageSrc?: string
}

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="group relative h-96 overflow-hidden rounded-lg bg-gray-900"
        >
          {category.imageSrc && (
            <Image
              src={category.imageSrc}
              alt={category.name}
              fill
              className="absolute inset-0 h-full w-full object-cover object-center transition-opacity group-hover:opacity-75"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-4xl font-bold text-white">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
} 