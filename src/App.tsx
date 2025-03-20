import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotesIcon from '@mui/icons-material/Notes';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core/AppProvider';
import { DialogsProvider } from '@toolpad/core/useDialogs';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'notes',
    title: 'Notes',
    icon: <NotesIcon />,
  },
];

const BRANDING = {
  title: "test",
};


export default function App({ children }) {
  
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
      <DialogsProvider>{children}</DialogsProvider>;
    </ReactRouterAppProvider>
  );
}