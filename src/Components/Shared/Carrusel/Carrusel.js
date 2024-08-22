
import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import Carousel from 'react-native-reanimated-carousel';
import { style } from './Carrusel.styles';

export function Carrusel({ images, width, height }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const renderItem = ({ item }) => (
        <Image source={{ uri: item }} style={{ width, height, resizeMode: 'cover' }} />
    );

    return (
        <View style={style.content}>
            <Carousel
                loop
                width={width}
                height={height}
                autoPlay={false}
                data={images}
                onSnapToItem={(index) => setCurrentIndex(index)}
                renderItem={renderItem}
            />
            <View style={style.paginationContainer}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            style.paginationDot,
                            currentIndex === index ? style.activeDot : style.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}
