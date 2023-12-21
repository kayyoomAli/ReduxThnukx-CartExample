import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  productListAddToCart,
  productListRemoveFromCart,
  productListDecreaseQuantity,
  productListIncreaseQuantity,
} from '../../redux/actions/productListAction';

import colors from '../../utils/color';
import {vh, vw} from '../../utils/dimension';
import FastImage from 'react-native-fast-image';
import localImages from '../../utils/localImages';
import MainProductHeader from './mainProductHeader';
import {routesNames} from '../../utils/routesNames';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
import React, {useEffect, useRef, useState} from 'react';
import CustomActivityIndicator from '../../components/ActivityIndicator';
import {productCategoryWatcher} from '../../redux/actions/productCategoryAction';
// import SubProduct from './subProduct';

const Products = () => {
  const dispatch = useDispatch();
  const flatListRef = useRef<any>(null);
  const navigation = useNavigation<any>();
  const [myData, setMyData] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState(null);
  // const [selectedSubTab, setSelectedSubTab] = useState(null);

  //
  const {productListItems} = useSelector(
    (state: any) => state.productListAddToCartReducer,
  );

  const {productCategoryResponse, loading}: any = useSelector(
    (state: any) => state.productCategoryReducer,
  );

  /**
   *
   * @_renderItem component
   * @description return item when its exits
   */

  const handleProductTab = (id: any) => {
    setSelectedTab(id);

    const selectedProductIndex =
      myData?.categories?.[0]?.children_data.findIndex(
        (item: any) => item.id === id,
      );

    if (selectedProductIndex !== -1) {
      const itemWidth = 90; // Calculate the width of each item (based on your design)
      const containerWidth = Dimensions.get('window').width; // Calculate the width of the container or the screen

      // Calculate the offset to center the selected product
      const offset = (containerWidth - itemWidth) / 2;

      // Calculate the scroll position
      const scrollPosition = selectedProductIndex * itemWidth - offset;

      flatListRef.current.scrollToOffset({
        offset: scrollPosition,
        animated: true,
      });
    }
  };

  // const handleSubProductTab = React.useCallback((id: any) => {
  //   setSelectedSubTab(id);
  // }, []);

  useEffect(() => {
    if (!loading && productCategoryResponse) {
      setMyData(productCategoryResponse.data);
    }
  }, [productCategoryResponse, loading]);

  useEffect(() => {
    if (myData?.categories?.[0]?.children_data?.length > 0) {
      setSelectedTab(myData.categories[0].children_data[0].id);
    }
  }, [myData]);

  useEffect(() => {
    let categoryData = JSON.stringify({
      categoryId: 23,
    });
    dispatch(productCategoryWatcher(categoryData));
  }, [dispatch]);

  //filter out specific data
  const selectedCategory = myData?.categories?.[0]?.children_data?.find(
    (item: any) => item.id === selectedTab,
  );

  /**
   *
   * @handleProductTab Function
   * @description handling add to cart through redux
   */
  const handleAddToCart = (item: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(productListAddToCart(item));
  };

  const handleRemoveFromCart = (productId: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    dispatch(productListRemoveFromCart(productId));
  };

  const handleDecreaseQuantity = (productId: any) => {
    dispatch(productListDecreaseQuantity(productId));
  };

  const handleIncreaseQuantity = (productId: any) => {
    dispatch(productListIncreaseQuantity(productId));
  };

  /**
   *
   * @_renderItem component
   * @description return item when its exits
   */
  const _renderItem = ({item}: any) => {
    const productCartItem = productListItems.find(
      (myItem: any) => myItem.product_id === item.product_id,
    );
    const cartQuantity = productCartItem ? productCartItem.quantity : 0;

    return (
      <Pressable style={styles.mainRenderItemStyle}>
        <FastImage
          source={{uri: item?.image, priority: 'high'}}
          style={styles.renderImageStyle}
        />
        <View style={{marginHorizontal: vw(22)}}>
          <Text style={styles.productTextNameStyle}>{item?.name}</Text>
          <Text style={styles.productDetailsStyle}>{item?.savings}</Text>
          <View style={styles.innerViewStyle}>
            <Text style={styles.priceTextStyle}>
              {'₹ '}
              {item?.final_price}
            </Text>
            <View style={styles.incNdecStyle}>
              {cartQuantity === 0 ? (
                <Pressable onPress={() => handleAddToCart(item)}>
                  <Text style={styles.addButtonStyle}>{'ADD TO CART'}</Text>
                </Pressable>
              ) : (
                <>
                  {cartQuantity === 1 ? (
                    <Pressable
                      onPress={() => handleRemoveFromCart(item.product_id)}>
                      <Text style={styles.addButtonStyle}>–</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => handleDecreaseQuantity(item.product_id)}>
                      <Text style={styles.addButtonStyle}>–</Text>
                    </Pressable>
                  )}
                  <Text style={{color: colors.buttonColor, marginLeft: vw(20)}}>
                    {cartQuantity}
                  </Text>
                  <Pressable
                    onPress={() => handleIncreaseQuantity(item.product_id)}>
                    <Text style={styles.addButtonStyle}>+</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  /**
   *
   * @_listEmptyComponent component
   * @description return when data not exits
   */
  const _listEmptyComponent = () => {
    return (
      <View style={styles.listEmptyStyle}>
        <Text style={styles.emptyTextStyle}>
          {'Please add others products first.'}
        </Text>
      </View>
    );
  };

  const navigateToCart = () => navigation.navigate(routesNames.myCart);

  return (
    <View style={styles.mainContainerStyles}>
      <CustomHeader
        rightIcon
        backButtonIcon
        headerTitle="Products"
        addedCartItem={productListItems.length}
        onPressRightIcon={navigateToCart}
      />
      <View>
        <FlatList
          horizontal
          ref={flatListRef}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          data={myData?.categories?.[0]?.children_data}
          renderItem={({item}) => (
            <MainProductHeader
              id={item.id}
              name={item.name}
              subProducts={item.children_data}
              selectedProductId={selectedTab}
              onSelectProduct={handleProductTab}
            />
          )}
        />
      </View>

      {/* <SubProduct
        subProducts={selectedCategory?.children_data || []}
        selectedProductId={selectedSubTab}
        onSelectProduct={handleSubProductTab}
      /> */}
      {!selectedCategory?.products?.items.length && loading ? (
        <CustomActivityIndicator />
      ) : (
        <FlatList
          renderItem={_renderItem}
          ListEmptyComponent={_listEmptyComponent}
          data={selectedCategory?.products?.items || []}
          keyExtractor={item => item?.product_id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.contentStyle,
            {
              flex:
                selectedCategory?.products?.items.length === 0 ? vh(1) : vh(0),
            },
          ]}
        />
      )}
      {productListItems.length ? (
        <View style={styles.modalContent}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={navigateToCart}
            style={styles.continueButtonStyle}>
            <Image
              source={localImages.cart}
              style={{height: vw(20), width: vw(20)}}
            />
            <Text style={styles.checkCartTextStyle}>{'GO TO CART'}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default React.memo(Products);

const styles = StyleSheet.create({
  mainContainerStyles: {
    backgroundColor: colors.primaryColor,
    flex: 1,
  },
  contentStyle: {
    marginHorizontal: vw(10),
    flex: 1,
  },
  mainRenderItemStyle: {
    backgroundColor: colors.white,
    marginVertical: vh(10),
    padding: vw(10),
    borderRadius: vw(10),
    flexDirection: 'row',
  },
  renderImageStyle: {
    height: vh(113),
    width: vh(113),
    resizeMode: 'contain',
  },
  productTextNameStyle: {
    color: colors.black,
    fontWeight: '700',
    fontSize: vw(16),
    maxWidth: vw(190),
  },
  productDetailsStyle: {
    maxWidth: vw(240),
    fontWeight: '400',
    marginVertical: vh(6),
    color: colors.dark_grey,
  },
  innerViewStyle: {
    flexDirection: 'row',
    marginVertical: vh(12),
    alignItems: 'center',
  },

  priceTextStyle: {
    color: colors.black,
    fontWeight: '700',
    fontSize: vw(16),
  },
  addButtonStyle: {
    color: colors.white,
    backgroundColor: colors.buttonColor,
    fontWeight: '500',
    fontSize: vw(10),
    paddingVertical: vh(4),
    paddingHorizontal: vw(10),
    marginLeft: vw(16),
    borderRadius: vw(5),
    borderColor: colors.buttonColor,
  },
  listEmptyStyle: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTextStyle: {
    color: colors.black,
    fontSize: vh(20),
    fontWeight: 'bold',
  },
  incNdecStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: '10%',
    width: '100%',
    backgroundColor: colors.buttonColor,
    padding: vh(20),
    borderTopLeftRadius: vh(20),
    borderTopRightRadius: vh(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 15,
  },
  continueButtonStyle: {
    backgroundColor: colors.white,
    borderRadius: vh(8),
    alignItems: 'center',
    justifyContent: 'center',
    height: vh(50),
    flexDirection: 'row',
  },
  checkCartTextStyle: {
    color: colors.buttonColor,
    fontSize: vh(18),
    fontWeight: '700',
    marginLeft: vw(10),
  },
});
