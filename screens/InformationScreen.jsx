import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ListItem } from '@rneui/themed';
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
              <Text style={{textAlign: "justify"}}>
                At TrendPeak, we believe in the power of quality products to transform spaces and enhance lives. Founded on the principles of integrity, innovation, and customer satisfaction, our journey began with a vision to provide a comprehensive solution for electronics, sanitary, and hardware needs.
                
                Driven by a passion for excellence, we have curated a diverse range of products sourced from trusted manufacturers worldwide. With a meticulous focus on quality control, we ensure that every item in our inventory meets the highest standards of durability, performance, and reliability. 
                
                But our commitment to our customers goes beyond just offering great products. We are dedicated to providing an exceptional shopping experience, characterized by personalized service, prompt assistance, and hassle-free transactions. Whether you're a homeowner, contractor, or business owner, we're here to meet your needs and exceed your expectations. 
                
                As a team, we are constantly evolving and adapting to the changing needs of our customers and the dynamic landscape of the industry. Through continuous innovation and investment in technology, we strive to stay ahead of the curve and deliver cutting-edge solutions that add value to your projects and endeavors. 
                
                Above all, we are grateful for the trust and support of our customers, without whom none of this would be possible. Thank you for choosing TrendPeak as your partner in creating spaces that inspire, function, and endure. We look forward to serving you for many years to come.
              </Text>
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
              <Text>
                At TrendPeak, we strive to ensure your complete satisfaction with every purchase. However, we understand that there may be instances where you may need to return a product. Our refund and return policy is designed to be fair and transparent, providing you with peace of mind when shopping with us.

                We offer a 7-day return policy from the date of purchase for eligible products. If 7 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange.
              </Text>
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
              <Text style={{textAlign: "justify"}}>
                TrendPeak follow the international and national guidelines in every products. TrendPeak can not give warranty by itself unless the product has any warranty.
              </Text>
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
              <Text style={{textAlign: "justify"}}>
                We deliver your products all over in Bangladesh. Courier or Delivery charge is applicable to online delivery. Delivery charge may be different depending on product delivery services. The rate can be change or more outside Dhaka. Please contact with us to know details.                 
              </Text>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>
      
      
    </ScrollView>
  )
}

export default InformationScreen

const styles = StyleSheet.create({});