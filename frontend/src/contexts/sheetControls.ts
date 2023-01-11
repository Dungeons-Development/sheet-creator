import {SheetControls} from '@/types/sheetControls';
import {createContext} from 'react';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const SheetControlsContext = createContext<SheetControls>(null!);
SheetControlsContext.displayName = 'SheetControlsContext';

