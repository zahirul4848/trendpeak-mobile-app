import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants'
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from "react-native-confirmation-code-field";
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const CELL_COUNT = 6;

const ResetPasswordScreen = ({navigation}) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({value, setValue});
  return (
    <LinearGradient colors={[COLORS.lightWhite, COLORS.primary]} style={styles.container}>
      <KeyboardAvoidingWrapper>
        <SafeAreaView >
          <View style={styles.iconContainer}>
            <MaterialIcons name="mark-email-unread" size={150} color={COLORS.secondary} />
          </View>
          <Text style={styles.titleTxt}>Enter the code bellow to reset password</Text>
          <Text style={styles.description}>A six digit code has sent to your email</Text>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <TouchableOpacity style={styles.submitBtn} onPress={()=> navigation.navigate("HomeScreen")}>
            <Text style={styles.btnText}>Verify</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingWrapper>
    </LinearGradient>
  )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  iconContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  titleTxt: {
    color: COLORS.secondary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    width: 300,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    width: 300,
  },
  input: {
    width: 300,
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    backgroundColor: COLORS.lightGray,
  },
  submitBtn: {
    backgroundColor: COLORS.secondary,
    margin: 20,
    width: 300,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: COLORS.lightWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
// style for react-native-confirmation-code-field

  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});