import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyLoading = ({ src, alt }) => (
  <div>
    <LazyLoadImage height={200} width={200} alt={alt} effect="blur" src={src} />
  </div>
);

export default LazyLoading;
