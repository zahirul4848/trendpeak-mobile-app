import { StyleSheet, Text, View } from 'react-native';
import { COLORS, commonStyles } from '../constants'
import { Divider } from '@rneui/themed';
import HTMLView from 'react-native-htmlview';

const AboutItem = ({product}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={commonStyles.rowSB}>
          <View style={[commonStyles.row, {paddingVertical: 5}]}>
            <Text style={{color: COLORS.gray2}}>Brand:</Text>
            <Text style={{fontWeight: "bold"}}>{product.brand}</Text>
          </View>
          <View style={[commonStyles.row, {paddingVertical: 5}]}>
            <Text style={{color: COLORS.gray2}}>Color:</Text>
            <Text style={{fontWeight: "bold"}}>{product.color}</Text>
          </View>
        </View>
        <View style={commonStyles.rowSB}>
          <View style={[commonStyles.row, {paddingVertical: 5}]}>
            <Text style={{color: COLORS.gray2}}>Category:</Text>
            <Text style={{fontWeight: "bold"}}>{product.category.name}</Text>
          </View>
          <View style={[commonStyles.row, {paddingVertical: 5}]}>
            <Text style={{color: COLORS.gray2}}>Model:</Text>
            <Text style={{fontWeight: "bold"}}>{product.model}</Text>
          </View>
        </View>
        <View style={commonStyles.rowSB}>
          <View style={[commonStyles.row, {paddingVertical: 5}]}>
            <Text style={{color: COLORS.gray2}}>Condition:</Text>
            <Text style={{fontWeight: "bold"}}>{product.condition}</Text>
          </View>
          <View style={[commonStyles.row, {paddingVertical: 5}]}>
            <Text style={{color: COLORS.gray2}}>Size:</Text>
            <Text style={{fontWeight: "bold"}}>{product.size}</Text>
          </View>
        </View>
      </View>
      <View style={{marginVertical: 10}}>
        <Text style={{marginVertical: 10, fontSize: 18, fontWeight: "bold"}}>Description:</Text>
        <HTMLView
          value={product.description}
        />
      </View>
      <Divider/>
    </View>
  )
}

export default AboutItem

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray2,
  },
})