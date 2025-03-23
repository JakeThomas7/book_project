import { useState } from 'react'
import BookList from '../components/BookList'
import CategoryFilter from '../components/CategoryFilter'
import WelcomeTitle from '../components/WelcomeTitle'
import CartSummary from '../components/CartSummary'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import SortItems from '../components/SortItems'
import './BooksPage.css'

function BooksPage() {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [sort, setSort] = useState<string>('asc');

    return (
      <>
        <div className="container w-100">
          <div className="row">
            <WelcomeTitle />
          </div>
          <div className="row" style={{ minHeight: '80vh' }}>
            {/* Filters and Cart */}
            <div className="col-md-3" style={{ position: 'sticky', top: '20px' }}>
                <div className="card p-3 shadow-sm">
                    <h5 className="fw-bold mb-3">Sort Options</h5>
                    <SortItems 
                        sort={sort}
                        setSort={setSort}
                    />
                </div>
                
                <br />
                
                <div className="card p-3 shadow-sm">
                    <h5 className="fw-bold mb-3">Categories</h5>
                    <CategoryFilter 
                        selectedCategories={selectedCategories} 
                        setSelectedCategories={setSelectedCategories}
                    />
                </div>
            </div>
  
            {/* Scrollable Book List */}
            <div className="col-md-6" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
              <BookList 
                selectedCategories={selectedCategories}
                sort={sort}
              />
            </div>
  
            {/* Cart Summary */}
            <div className="col-md-3" style={{ position: 'sticky', top: '20px' }}>
              <CartSummary />
            </div>
          </div>
        </div>
      </>
      );
}
export default BooksPage