import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';

const YourComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://fakestoreapi.com/products?limit=20&page=${page}`,
      );
      const newData = await response.json();

      setData(prevData => [...prevData, ...newData]);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      setPage(prevPage => prevPage + 1);
      setLoadingMore(true);
      fetchData();
    }
  };

  const renderFooter = () => {
    return loadingMore ? (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator animating size="large" />
      </View>
    ) : null;
  };

  const renderItem = ({item, index}) => (
    <View key={index} style={{padding: 16}}>
      <Text>{item.title}</Text>
      {/* Add other item details as needed */}
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id.toString() + index.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
    />
  );
};

export default YourComponent;
