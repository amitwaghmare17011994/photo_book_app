import { Column, Divider, HStack, Image, Row, Spinner } from 'native-base';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import SafeArea from '../../components/atoms/SafeArea';
import TextView from '../../components/atoms/Text';
import { uploadFiles } from '../../services/upload';

const HomeScreen = (props: any) => {
  const { navigation } = props
  const [selectedImages, setSelectedImages] = useState([])
  const [uploadingImage, setUploadingImage] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([])

  const getPhotos = async () => {
    setSelectedImages([])
    setUploadedImages([])
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 20
    });
    //@ts-ignore
    const images = result.assets.map((i: any, index: number) => {
      return { ...i, id: index }
    })
    //@ts-ignore
    setSelectedImages(images)


  }


  const renderImage = (params: { item: any, index: number }) => {
    const { item, index } = params
    //@ts-ignore
    const isUploaded = uploadedImages.includes(item.id)
    //@ts-ignore

    return <>
      {uploadingImage === item.id && <View style={{ position: 'relative' }}>
        <HStack justifyContent="center" alignItems="center" style={{ position: 'absolute', zIndex: 111, left: 45, top: 30 }} >
          <Spinner size="lg" color={'white'} />
        </HStack>
      </View>}
      <Image
        key={item.id}
        source={{ uri: item.uri }}
        style={{
          width: 130,
          height: 90,
          marginEnd: 10,
          ...isUploaded ? {
            borderColor: 'green',
            borderWidth: 2,
            borderRadius: 10
          } : {}
        }}
      />
    </>


  }

  const onUploadFiles = async () => {
    try {
      const upImages = []
      for (let i = 0; i < selectedImages.length; i++) {
        const currentImage = selectedImages[i]
        //@ts-ignore
        setUploadingImage(currentImage.id)
        const res = await uploadFiles(currentImage)
        //@ts-ignore
        upImages.push(currentImage.id)
        //@ts-ignore
        setUploadedImages([...upImages, currentImage.id])

      }
      setUploadingImage(null)
    } catch (error) {
      console.warn(error);
    }
  }


  return (
    <SafeArea>

      <Row height={140} paddingLeft={3} alignItems={'center'}>
        <Button title='Make Order' onPress={getPhotos} />
      </Row>
      <Divider />

      <Column alignItems={'center'} top={'40%'}>
        <Image
          source={require('../../assets/images/emptyOrders.png')}
          alt={'logo'}
        />
        <TextView
          text={`You haven't created an order yet`}
          style={{ fontSize: 16, marginTop: 20 }}
        />
        <TextView
          text={'Make a new order'}
          style={{
            fontSize: 20, 
            marginTop: 20,
            borderBottomWidth: 1,
            borderColor: "blue",
          }}
          color={'blue'}
        />
      </Column>

      {/* 
      <Button title='Load Image' onPress={getPhotos} />
      <Button title='Upload Files' onPress={onUploadFiles} />
      <Button
        title='Logout'
        onPress={async () => {
          await removeData('auth');
          navigation.replace(ROUTES.PHONE_VALIDATION_SCREEN)

        }}
      />
      <FlatList
        data={selectedImages}
        renderItem={renderImage}
        numColumns={3}
        columnWrapperStyle={style.row}  // space them out evenly
        style={{ marginBottom: 100, }}
      /> */}

    </SafeArea>
  )
}


const style = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10
  }
});


export default HomeScreen