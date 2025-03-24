import { TextInput, useColorScheme, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useState } from "react";

interface ThemedInputProps {
  style?: object;
  onClick?: () => void;
  [key: string]: any;
}

const ThemedInput: React.FC<ThemedInputProps> = ({
  style,
  onChangeText,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [isFocused, setIsFocused] = useState(false);

  const dynamicStyles = StyleSheet.create({
    input: {
      color: isDarkMode ? Colors.backgroundLight : Colors.backgroundDark,
      backgroundColor: isDarkMode
        ? Colors.secondaryDark
        : Colors.secondaryLight,
      padding: 8,
      borderWidth: 1,
      borderColor: isFocused ? Colors.gray : "transparent",
    },
  });

  return (
    <TextInput
      style={[dynamicStyles.input, style]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChangeText={onChangeText}
      placeholderTextColor={Colors.gray}
      {...props}
    />
  );
};

export default ThemedInput;
