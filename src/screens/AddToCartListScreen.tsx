import {
  Text,
  View,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  productListRemoveFromCart,
  productListDecreaseQuantity,
  productListIncreaseQuantity,
} from '../../redux/actions/productListAction';

import {styles} from './style';
import React, {useState} from 'react';
import colors from '../../utils/color';
import {vh} from '../../utils/dimension';
import {strings} from '../../utils/strings';
import {routesNames} from '../../utils/routesNames';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';

const MyCart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [data, setData] = useState<any>([]);
  const {productListItems} = useSelector(
    (state: any) => state.productListAddToCartReducer,
  );

  console.log('data', data);

  React.useEffect(() => {
    if (!productListItems) {
      setData([]);
    } else {
      setData(productListItems);
    }
  }, [productListItems]);

  /**
   * @handlePress Function
   * @description handling decrease button
   */
  const handleRemoveFromCart = (productId: any) => {
    dispatch(productListRemoveFromCart(productId));
  };

  const handleDecreaseQuantity = (productId: any) => {
    dispatch(productListDecreaseQuantity(productId));
  };

  const handleIncreaseQuantity = (productId: any) => {
    dispatch(productListIncreaseQuantity(productId));
  };

  /**
   * @calculatePrice Function
   * @description calculating total price of cart
   */

  const calculatePrice = () => {
    let total = 0;
    data.forEach((item: any) => {
      total += item.quantity * item.final_price;
    });
    return total;
  };

  const totalPrice = calculatePrice();

  /**
   * @_renderItem Component
   * @description render ui component for screen
   */

  const _renderItem = ({item}: any) => {
    console.log('item>>>>>', item);

    return (
      <View style={styles.renderItemMainViewStyle}>
        <Image style={styles.productImageStyle} source={{uri: item?.image}} />
        <View style={styles.innerMainViewStyle}>
          <Text style={styles.titleTextStyle}>{item?.name}</Text>
          <Text style={{fontSize: vh(12)}}>{item?.sku}</Text>
          <View style={styles.innerDetailsViewStyle}>
            <View style={styles.increaseDecreaseViewStyle}>
              <>
                {item?.quantity === 1 ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      // Show the confirmation dialog
                      Alert.alert(
                        'Confirmation',
                        'Are you sure you want to remove this item?',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => {
                              // User canceled the action, do nothing
                            },
                            style: 'cancel',
                          },
                          {
                            text: 'confirm',
                            onPress: () => {
                              handleRemoveFromCart(item?.product_id);
                            },
                          },
                        ],
                        {cancelable: false},
                      )
                    } // handleAddToCart for Product List items
                    style={styles.incNdecButtonStyle}>
                    <Text style={{fontSize: vh(19), color: colors.black}}>
                      {'-'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleDecreaseQuantity(item?.product_id)} // handleAddToCart for Product List items
                    style={styles.incNdecButtonStyle}>
                    <Text style={{fontSize: vh(19), color: colors.black}}>
                      {'-'}
                    </Text>
                  </TouchableOpacity>
                )}
                <Text style={{color: colors.black}}>{item?.quantity}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleIncreaseQuantity(item.product_id)} // handleAddToCart for Product List items
                  style={styles.incNdecButtonStyle}>
                  <Text style={{color: colors.black}}>{'+'}</Text>
                </TouchableOpacity>
              </>
            </View>
            <Text style={styles.pricePerItemTextStyle}>
              {'₹ '}
              {item?.final_price}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  /**
   * @_listFooterComponent component
   * @description flatlist footer component
   */

  const _listFooterComponent = () => {
    return (
      <View style={styles.listFooterViewStyle}>
        {/* <Text style={styles.applyCodeTextStyle}>{strings.applyCoupon}</Text>
        <View style={styles.applyCodeViewStyle}>
          <CustomTextInput
            placeholder={strings.enterCode}
            mainViewStyle={styles.textInputStyle}
          />
          <CustomButton
            buttonText={strings.apply}
            customButtonStyle={styles.applyButtonStyle}
          />
        </View> */}
        <Text style={styles.priceDetailsTextStyle}>{strings.priceDetails}</Text>
        <View style={styles.innerDetailsViewOfTotalStyle}>
          <Text
            style={{
              color: colors.black,
            }}>{`Items Prices ( ${productListItems.length} items )`}</Text>
          <Text style={{color: colors.black}}>
            {'₹ '}
            {totalPrice}
          </Text>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.innerDetailsViewOfTotalStyle}>
          <Text style={styles.totalPriceTextStyle}>
            {'Grand '}
            {strings.total}
          </Text>
          <Text style={styles.totalPriceTextStyle}>
            {'₹ '}
            {totalPrice}
          </Text>
        </View>
        <CustomButton
          customButtonStyle={styles.paymentButtonStyle}
          buttonText={strings.continueToPay}
          onPress={() =>
            navigation.navigate(routesNames.getUserAddress, {
              data,
              grandTotal: totalPrice,
            })
          }
        />
      </View>
    );
  };

  /**
   * @increaseQuantity Function
   * @description returning when list is empty
   */

  const _listEmptyComponent = () => {
    return (
      <View style={styles.listEmptyViewStyle}>
        <Text style={styles.listEmptyTextstyle}>{'Cart is Empty'}</Text>
        <CustomButton
          onPress={() => navigation.navigate(routesNames.rewardsFine)}
          buttonText={'Go to product listing'}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainerStyle}>
      <CustomHeader backButtonIcon headerTitle={strings.myCart} />
      <FlatList
        data={data}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={_listEmptyComponent}
        keyExtractor={item =>
          item?.id?.toString() + item?.product_id?.toString()
        }
        contentContainerStyle={[
          styles.flatlistContainerStyle,
          // eslint-disable-next-line react-native/no-inline-styles
          {flex: data.length > 0 ? 0 : 1},
        ]}
        ListFooterComponent={data.length > 0 ? _listFooterComponent : null}
      />
    </View>
  );
};

export default React.memo(MyCart);
