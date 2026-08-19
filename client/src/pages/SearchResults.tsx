import { useEffect, useState } from "react"
import type { Product } from "../types"
import { Link, useSearchParams } from "react-router-dom"
import { dummyProducts } from "../assets/assets"
import { Home } from "lucide-react"

const SearchResults = () => {
  const [products , setProducts] = useState<Product[]>([])
  const [loading , setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || " ";

  useEffect(() => {
    if(!query) return;
    setLoading(true)
    setProducts(dummyProducts.filter((p: any) => p.name.toLowerCase().includes(query.toLowerCase())))
    setLoading(false)

  },[query])
  return (
    <div>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
            <Link to='/' className="hover:text-app-green transition-colors">
              <Home className="size-4"/>
            </Link>
              <span>/</span>
              <span className="text-app-green font-medium">Search Results</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1>Results for "{query}"</h1>
          </div>
      </div>
    </div>
  )
}

export default SearchResults