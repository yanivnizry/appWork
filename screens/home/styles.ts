import { COLORS } from "../../services/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.WHITE,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    contentLandscape: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    clockContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    selectorContainer: {
      flex: 1,
      maxHeight: 400,
    },
  });
  
    
export default styles;