import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { getCategoriesSelector, selectCategoriesIsLoading } from "../../store/categories/categories.selector";
import Spinner from '../../components/spinner/spinner.component'
const CategoriesPreview = () => {
  const categories = useSelector(getCategoriesSelector);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <div className="shop-container"> 
      {isLoading && <Spinner/>}
      {Object.keys(categories).map((category, i) => (
        <CategoryPreview
          key={i}
          title={category}
          products={categories[category]}
        />
      ))}
    </div>
  );
};

export default CategoriesPreview;
