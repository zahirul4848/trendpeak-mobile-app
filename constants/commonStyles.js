import { StyleSheet } from "react-native";
import { COLORS } from "./theme";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rowSB: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  columnCenter: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  boldTxt: {
    fontWeight: "bold",
  },
  boldTxtPrimary: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
  titleTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTxt: {
    fontSize: 12,
    color: COLORS.secondary,
  }
});
