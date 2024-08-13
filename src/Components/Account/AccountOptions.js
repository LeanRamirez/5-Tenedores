import React, { useState } from 'react'
import { View } from 'react-native'
import { ListItem, Icon, Text } from "react-native-elements"
import { Modal } from "../../Components/Shared"
import { ChangeDisplayNameForm } from "./ChangeDisplayNameForm"
import { ChangeEmailForm } from "../../Components/Account"
import { ChangePasswordForm } from "../../Components/Account"
import { map } from "lodash"

export function AccountOptions({ onReload }) {

    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const onCloseOpenModal = () => setShowModal(prevState => !prevState)

    const selectedComponent = (key) => {
        if (key === "Display name") {
            setRenderComponent(<ChangeDisplayNameForm onClose={onCloseOpenModal} onReload={onReload} />)
        }
        if (key === "Email") {
            setRenderComponent(<ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />)
        }
        if (key === "Password") {
            setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal} />)
        }
        onCloseOpenModal()
    }

    const menuOptions = getMenuOptions(selectedComponent)

    return (
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem
                    key={index}
                    bottomDivider
                    onPress={menu.onPress}
                >
                    <Icon
                        type={menu.iconType}
                        name={menu.iconNameLeft}
                        color={menu.iconColorLeft} />

                    <ListItem.Content>
                        <ListItem.Title>
                            {menu.title}
                        </ListItem.Title>
                    </ListItem.Content>
                    <Icon
                        type={menu.iconType}
                        name={menu.iconNameRight}
                        color={menu.iconColorRight} />
                </ListItem>
            ))
            }
            <Modal show={showModal} close={onCloseOpenModal}>
                {renderComponent}
            </Modal>
        </View >
    )
}

const getMenuOptions = (selectedComponent) => {
    return [
        {
            title: "Cambiar nombre y apellido",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("Display name")
        },
        {
            title: "Cambiar email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("Email")
        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("Password")
        }
    ]
}