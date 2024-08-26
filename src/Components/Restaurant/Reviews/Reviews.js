import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, AirbnbRating, ListItem, Avatar } from "react-native-elements"
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore"
import { map } from "lodash"
import { DateTime } from "luxon"
import { db } from "../../../utils"
import { Loading } from "../../Shared"
import { style } from "./Reviews.styles"

export function Reviews({ idRestaurant }) {
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        const q = query(
            collection(db, "reviews"),
            where("idRestaurant", "==", idRestaurant),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapShot) => {
            setReviews(snapShot.docs)
        })
    }, [])

    if (!reviews) return <Loading show text="Cargando" />

    return (
        <View style={style.content}>
            {map(reviews, (review) => {
                const data = review.data();

                const createReview = DateTime.fromMillis(data.createdAt.seconds * 1000)

                return (
                    <ListItem key={data.id} bottomDivider containerStyle={style.review}>
                        <Avatar source={{ uri: data.avatar }} size={50} rounded />
                        <ListItem.Content >
                            <ListItem.Title style={style.title}>{data.title}</ListItem.Title>
                            <View style={style.subTitle}>
                                <Text style={style.comment}>{data.comment}</Text>
                                <View style={style.contentRatingDate}>
                                    <AirbnbRating
                                        defaultRating={data.rating}
                                        showRating={false}
                                        size={15}
                                        isDisabled
                                        starContainerStyle={style.starContainer}
                                    />
                                    <Text style={style.date}>
                                        {createReview.toFormat("yyyy/LL/dd - hh:mm")}
                                    </Text>
                                </View>
                            </View>
                        </ListItem.Content>
                    </ListItem>
                )
            })}
        </View>
    )
}

