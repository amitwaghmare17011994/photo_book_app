import { Button, FlatList, HStack, Image, Row, Spinner } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import SafeArea from '../../components/atoms/SafeArea';
import TextView from '../../components/atoms/Text';
import { uploadFiles } from '../../services/upload';

const NewOrderScreen = (props: any) => {
  const { navigation } = props
  const [selectedImages, setSelectedImages] = useState([])
  const [uploadingImage, setUploadingImage] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([])

  const getPhotos = async () => {
    try {
      setSelectedImages([])
      setUploadedImages([])
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 20
      });
      if (result?.assets) {//@ts-ignore
        const images = result.assets.map((i: any, index: number) => {
          return { ...i, id: index }
        })
        //@ts-ignore
        setSelectedImages(images)
      }
    } catch (error) {

    }


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
      <Row height={120} alignItems={'center'} justifyContent={'center'}  >
        <Button onPress={getPhotos}>
          <TextView
            text={'Load Photos'}
            color={'white'}
          />
        </Button>

        <Button left={2} disabled={!selectedImages?.length} onPress={onUploadFiles}>
          <TextView
            text={'Upload Photos'}
            color={'white'}
          />
        </Button>
      </Row>

      <FlatList
        data={selectedImages}
        renderItem={renderImage}
        numColumns={3}
        columnWrapperStyle={style.row}
        style={{ marginBottom: 100, }}
      />
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


export default NewOrderScreen