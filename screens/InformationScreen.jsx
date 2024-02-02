import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Divider, Icon, ListItem } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';

const InformationScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  return (
    <ScrollView 
      style={{margin: 10}}
      showsVerticalScrollIndicator= {false}
    >
      <View style={{marginBottom: 10}}>
        <ListItem.Accordion
          content={
            <>
              <Ionicons name="information-circle-sharp" size={24} color={COLORS.primary} />
              <ListItem.Content>
                <ListItem.Title style={{color: COLORS.primary, marginLeft: 10}}>About Us</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <ListItem bottomDivider>
            <ListItem.Content>
              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia laudantium ipsum nihil modi, illo enim necessitatibus, repellat quidem, tempore temporibus incidunt iusto deleniti perspiciatis placeat fugiat accusamus cupiditate. Ratione, hic? Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia laudantium ipsum nihil modi, illo enim necessitatibus, repellat quidem, tempore temporibus incidunt iusto deleniti perspiciatis placeat fugiat accusamus cupiditate. Ratione, hic?</Text>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>
      <View style={{marginBottom: 10}}>
        <ListItem.Accordion
          content={
            <>
              <Ionicons name="information-circle-sharp" size={24} color={COLORS.primary} />
              <ListItem.Content>
                <ListItem.Title style={{color: COLORS.primary, marginLeft: 10}}>Refund and Return Policy</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded2}
          onPress={() => {
            setExpanded2(!expanded2);
          }}
        >
          <ListItem bottomDivider>
            <ListItem.Content>
              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia laudantium ipsum nihil modi, illo enim necessitatibus, repellat quidem, tempore temporibus incidunt iusto deleniti perspiciatis placeat fugiat accusamus cupiditate. Ratione, hic?</Text>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>
      <View style={{marginBottom: 10}}>
        <ListItem.Accordion
          content={
            <>
              <Ionicons name="information-circle-sharp" size={24} color={COLORS.primary} />
              <ListItem.Content>
                <ListItem.Title style={{color: COLORS.primary, marginLeft: 10}}>Terms and Condition</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded3}
          onPress={() => {
            setExpanded3(!expanded3);
          }}
        >
          <ListItem bottomDivider>
            <ListItem.Content>
              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia laudantium ipsum nihil modi, illo enim necessitatibus, repellat quidem, tempore temporibus incidunt iusto deleniti perspiciatis placeat fugiat accusamus cupiditate. Ratione, hic?</Text>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>
      <View style={{marginBottom: 10}}>
        <ListItem.Accordion
          content={
            <>
              <Ionicons name="information-circle-sharp" size={24} color={COLORS.primary} />
              <ListItem.Content>
                <ListItem.Title style={{color: COLORS.primary, marginLeft: 10}}>Online Delivery</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded4}
          onPress={() => {
            setExpanded4(!expanded4);
          }}
        >
          <ListItem bottomDivider>
            <ListItem.Content>
              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia laudantium ipsum nihil modi, illo enim necessitatibus, repellat quidem, tempore temporibus incidunt iusto deleniti perspiciatis placeat fugiat accusamus cupiditate. Ratione, hic?</Text>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>
      
      
    </ScrollView>
  )
}

export default InformationScreen

const styles = StyleSheet.create({});