import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Modal from "react-native-modal";
import { COLORS } from '../constants';
import { CheckBox, Divider } from '@rneui/themed';

const sortingMethods = ["", "newArrivals", "abcd", "dcba", "lowest", "highest", "topRated"];

const SortingModal = ({toggleModal, openModal, setOrder}) => {
  const [selectedIndex, setIndex] = useState(0);

  const handleToggle = ()=> {
    toggleModal();
    setOrder(sortingMethods[selectedIndex]);
  }

  return (
    <Modal
      onBackdropPress={handleToggle}
      onBackButtonPress={handleToggle}
      isVisible={openModal}
      swipeDirection="down"
      onSwipeComplete={handleToggle}
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      animationInTiming={900}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      style={styles.modal}
      avoidKeyboard
    >
      <View
        style={styles.modalContent}
      >
        <View style={styles.barIcon}/>
        <Text style={styles.titleTxt}>Sort By</Text>
        <Divider/>
        <View>
          <CheckBox
            checked={selectedIndex === 0}
            onPress={() => setIndex(0)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Default"
            containerStyle={{ backgroundColor: "transparent", padding: 5,}}
          />
          <CheckBox
            checked={selectedIndex === 1}
            onPress={() => setIndex(1)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="New Arrivals"
            containerStyle={{ backgroundColor: "transparent", padding: 5,}}
          />
          <CheckBox
            checked={selectedIndex === 2}
            onPress={() => setIndex(2)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Name A to Z"
            containerStyle={{ backgroundColor: "transparent", padding: 5, }}
          />
          <CheckBox
            checked={selectedIndex === 3}
            onPress={() => setIndex(3)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Name Z to A"
            containerStyle={{ backgroundColor: "transparent", padding: 5, }}
          />
          <CheckBox
            checked={selectedIndex === 4}
            onPress={() => setIndex(4)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Price Low to High"
            containerStyle={{ backgroundColor: "transparent", padding: 5, }}
          />
          <CheckBox
            checked={selectedIndex === 5}
            onPress={() => setIndex(5)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Price High to Low"
            containerStyle={{ backgroundColor: "transparent", padding: 5, }}
          />
          <CheckBox
            checked={selectedIndex === 6}
            onPress={() => setIndex(6)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Top Rated"
            containerStyle={{ backgroundColor: "transparent", padding: 5, }}
          />
        </View>
      </View>
    </Modal>
  )
}

export default SortingModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.lightWhite,
    minHeight: 430,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
  },
  barIcon: {
    backgroundColor: COLORS.secondary,
    width: 60,
    height: 5,
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  titleTxt: {
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 16
  }
});