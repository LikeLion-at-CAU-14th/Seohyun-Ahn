import { createContext } from "react";
import { theme } from "../theme/theme";

export const ThemeColorContext = createContext(theme.blueTheme) //provider없는 경우 blue됨

