import { StyleSheet } from "react-native";
import { COLORS } from "../../services/constants";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    item: {
      padding: 12,
      backgroundColor: COLORS.LIGHT_GRAY,
      marginVertical: 4,
      borderRadius: 8,
    },
    selectedItem: {
      backgroundColor: COLORS.BLUE,
    },
    itemText: {
      fontSize: 16,
      color: COLORS.DARK_GRAY,
    },
    selectedItemText: {
      color: COLORS.WHITE,
    },
    messageText: {
      textAlign: 'center',
      padding: 16,
      color: COLORS.GRAY,
      fontSize: 14,
    },
    errorText: {
      textAlign: 'center',
      padding: 16,
      color: COLORS.RED,
      fontSize: 16,
      fontWeight: '600',
    },
  });
  
  export default styles;