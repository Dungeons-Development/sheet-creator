import {SheetControls} from "@/types/sheetControls";
import {createContext} from "react";

export const SheetControlsContext = createContext<SheetControls>(null!);
SheetControlsContext.displayName = 'SheetControlsContext';

