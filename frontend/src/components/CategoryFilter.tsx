import { useState, useEffect } from "react";
import './CategoryFilter.css'

function CategoryFilter ({
    selectedCategories,
    setSelectedCategories
}:{
    selectedCategories: string[]
    setSelectedCategories: (categories: string[]) => void
}) {

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`https://bookprojectjacobbackend.azurewebsites.net/Books/Categories`)
                const data = await response.json();
                setCategories(data);
            } catch (e) {
                console.error('Error fetching categories: ' + e)
            }
        }
        fetchCategories();
    }, []);

    function handleCheckboxChange({target}: {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(x => x != target.value) : [...selectedCategories, target.value]
        console.log(updatedCategories)
        setSelectedCategories(updatedCategories)
    }

    return (
        <div>
            <h5>Project Types</h5>
            {
                categories.map((c) => (
                    <div key={c} className="category-item mb-3">
                        <div className="form-check form-switch">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id={c} 
                                value={c} 
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor={c}>
                                {c}
                            </label>
                        </div>
                    </div>
                ))
            }
        </div> 
    );
}

export default CategoryFilter;