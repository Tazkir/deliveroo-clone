import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import SafeViewAndroid from '../components/SafeViewAndroid';
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRows';
import sanityClient from '../sanity';
import Load from '../components/Loading';

function HomeScreen() {
  const navigation = useNavigation();

  const [loading, isLoading] = useState(true);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->
    
      }
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
        isLoading(false);
      });
  }, []);

  // console.log(featuredCategories);

  return (
    <SafeAreaView
      style={SafeViewAndroid.AndroidSafeArea}
      className="bg-white pt-5"
    >
      {/* HEADER */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        {/* MENU NAV */}
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#d84300" />
          </Text>
        </View>

        <UserIcon size={31} color="#d84300" />
      </View>
      {/* SEARCH */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurant and cuisines"
            keyboardType="default"
          />
        </View>

        <AdjustmentsVerticalIcon color="#d84300" />
      </View>

      {/* BODY */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* CATEGORIES */}
        <Categories />

        {/* FEATURED */}

        {loading ? (
          <Load />
        ) : (
          featuredCategories?.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))
        )}

        {/* {featuredCategories &&
          featuredCategories.length > 0 &&
          featuredCategories.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))} */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
