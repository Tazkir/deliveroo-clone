import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import sanityClient, { urlFor } from '../sanity';
import Load from './Loading';

const Categories = () => {
  const [loading, isLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient.fetch(` *[_type == "category"]`).then((data) => {
      setCategories(data);
      isLoading(false);
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card*/}
      {loading ? (
        <Load />
      ) : (
        categories &&
        categories.length > 0 &&
        categories.map((category) => (
          <CategoryCard
            key={category._id}
            imgUrl={urlFor(category.image).width(200).url()}
            title={category.name}
          />
        ))
      )}
    </ScrollView>
  );
};

export default Categories;
