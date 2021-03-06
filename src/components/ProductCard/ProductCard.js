import { Link } from 'gatsby';
import Img from 'gatsby-image';
import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import BagIcon, { BagIconFilled } from '../../assets/svg/BagIcon';
import { useBag } from '../../context/BagContext';
import { useBagController } from '../../context/BagDisplayContext';
import { currencyMask } from '../../services/maskService';

const ProductCard = ({ product }) => {
  const { id, name, price, image, slug } = product;
  const { addProduct, removeProduct, checkProduct, bag } = useBag();
  const { showBag } = useBagController();
  const [isAdded, setAdded] = useState(checkProduct(id));

  const toggleBag = () => {
    if (isAdded) {
      removeProduct(id);
      setAdded(false);
    } else {
      addProduct({ ...product, quantity: 1 });
      setAdded(true);
      showBag();
    }
  };

  useEffect(() => {
    setAdded(checkProduct(id));
  }, [bag, id, checkProduct]);

  return (
    <div>
      <Link to={`/products/${slug}`} className="cursor-pointer">
        {image.childImageSharp ? (
          <Img fluid={image.childImageSharp.fluid} alt={name} />
        ) : (
          <div className="relative pb-4/3">
            <img className="absolute w-full h-full object-cover" src={image} alt={name} />
          </div>
        )}
      </Link>
      <div className="flex flex-row justify-between items-start my-4">
        <div>
          <h4 className="text-md text-black">{name}</h4>
          <p className="text-sm text-gray-700">{currencyMask(price)}</p>
        </div>
        <button
          aria-label={isAdded ? 'Remove from bag' : 'Add to bag'}
          onClick={toggleBag}
          type="button"
          className="cursor-pointer text-black h-5 w-5"
        >
          {isAdded ? <BagIconFilled /> : <BagIcon />}
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    image: propTypes.oneOfType([propTypes.shape(), propTypes.string]).isRequired,
    seller: propTypes.shape.isRequired,
    slug: propTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
