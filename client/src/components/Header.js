import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NotificationBell from './NotificationBell';

export default function Header({ onPressMyBooking }) {
  return (
    <View style={styles.row}>
      <Text style={styles.logo}>TourDemo</Text>
      <View style={styles.right}>
        <TouchableOpacity onPress={onPressMyBooking} style={styles.link}>
          <Text style={styles.linkText}>My Booking</Text>
        </TouchableOpacity>
        <NotificationBell />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { height: 56, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logo: { fontSize: 18, fontWeight: '800' },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  link: { padding: 8 },
  linkText: { fontWeight: '600' },
});