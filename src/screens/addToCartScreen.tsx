// imports
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/actions/addToCartAction';

import {styles} from './style';
import colors from '../../utils/color';
import {strings} from '../../utils/strings';
import {normalize} from '../../utils/dimension';
import localImages from '../../utils/localImages';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
import React, {useCallback, useEffect, useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {findProductsWatcher} from '../../redux/actions/findProducts';
import CustomActivityIndicator from '../../components/ActivityIndicator';

const FindServices = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const navigation = useNavigation<any>();
  // const [addedItems, setAddedItems] = useState<number[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const {cartItems} = useSelector((state: any) => state.addToCartReducer);

  const {findProductsResponse, loading}: any = useSelector(
    (state: any) => state.findProductsReducer,
  );

  // set the data if exists
  useEffect(() => {
    if (!findProductsResponse) {
      setData([]);
    } else {
      setData(findProductsResponse);
    }
  }, [findProductsResponse]);

  // calling api for data
  useEffect(() => {
    if (searchText !== '') {
      dispatch(findProductsWatcher(searchText));
    } else {
      setData([]);
    }
  }, [dispatch, searchText]);

  useEffect(() => {
    return () => {
      setData([]);
    };
  }, []);

  /**
   * @onSearchText Function
   * @description setting search text
   */
  const onSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const _keyExtractor = (item: any) => item?.id?.toString();

  /**
   * @onSearchText Function
   * @description setting search text
   */
  const handleAddToCart = (item: any) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem: any) => cartItem.id === item.id,
    );
    if (existingItemIndex >= 0) {
      dispatch(increaseQuantity(item.id));
    } else {
      const itemWithQuantity = {...item, quantity: 1};
      dispatch(addToCart(itemWithQuantity));
    }
  };

  /**
   * @_renderItem Component
   * @description render the flatlist items
   */
  const _renderItem = ({item}: any) => {
    const existingCartItem = cartItems.find(
      (cartItem: any) => cartItem.id === item.id,
    );
    const isAdded = !!existingCartItem;
    return (
      <React.Fragment>
        <View style={styles.renderItemMainViewStyle}>
          <Text numberOfLines={2} style={styles.nameTextStyle}>
            {item?.name}
          </Text>
          <View style={styles.innerViewStyle}>
            <Text style={styles.priceTextStyle}>
              {strings.rupee}
              {item?.price}
            </Text>

            {isAdded ? (
              <View style={styles.mainAddToCartItemStyle}>
                {existingCartItem.quantity === 1 ? (
                  <TouchableOpacity
                    onPress={() => dispatch(removeFromCart(item.id))}
                    activeOpacity={0.7}
                    style={styles.addAndSubButtonStyle}>
                    <Text
                      style={{color: colors.white, fontSize: normalize(16)}}>
                      -
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => dispatch(decreaseQuantity(item.id))}
                    activeOpacity={0.7}
                    style={styles.addAndSubButtonStyle}>
                    <Text
                      style={{color: colors.white, fontSize: normalize(16)}}>
                      -
                    </Text>
                  </TouchableOpacity>
                )}
                <Text style={{color: colors.black, fontSize: normalize(14)}}>
                  {existingCartItem.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => handleAddToCart(item)}
                  activeOpacity={0.7}
                  style={styles.addAndSubButtonStyle}>
                  <Text style={{color: colors.white, fontSize: normalize(16)}}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => handleAddToCart(item)}
                activeOpacity={0.7}
                style={[styles.addButtonStyle]}>
                <Text style={{color: colors.white, fontSize: normalize(10)}}>
                  {strings.addText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.bottomBorderWidthStyle} />
      </React.Fragment>
    );
  };

  /**
   * @_listEmptyComponent Component
   * @descriptions returns empty ui when data length is zero
   */
  const _listEmptyComponent = () => {
    return (
      <View style={styles.listEmptyViewStyle}>
        <Text style={styles.nodataTextStyle}>{strings.pleaseSearch}</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainerStyle}>
      <CustomHeader
        rightIcon
        backButtonIcon
        addedCartItem={cartItems.length}
        headerTitle={strings.findProducts}
        onPressRightIcon={() => navigation.goBack()}
      />
      <CustomTextInput
        rightIcon={localImages.search}
        placeholder={strings.productName}
        mainViewStyle={styles.textInputStyle}
        onChangeText={onSearchText}
      />
      {data.length === 0 && loading ? (
        <CustomActivityIndicator />
      ) : (
        <FlatList
          data={data}
          windowSize={10}
          initialNumToRender={5}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={_listEmptyComponent}
          contentContainerStyle={[
            styles.flatlistContainerStyle,
            // eslint-disable-next-line react-native/no-inline-styles
            {flex: data.length === 0 ? 1 : 0},
          ]}
        />
      )}
    </View>
  );
};

export default React.memo(FindServices);
