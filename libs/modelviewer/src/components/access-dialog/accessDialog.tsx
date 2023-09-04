import { Dialog } from '@equinor/eds-core-react';
import React from 'react';

interface AccessDialogProps {
  plantName: string;
  hasAccess: boolean;
}

const AccessDialog: React.FC<AccessDialogProps> = ({ plantName, hasAccess }) => {
  return (
    <Dialog open={!hasAccess}>
      <Dialog.Header>
        <Dialog.Title>No access</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <p>
          You don't have access to any 3D Models for this plant. <br /> Search for "Echo
          {' ' + plantName}" in Access IT to apply for access.
          <br /> Access IT requires Equinor Network connection.
        </p>
      </Dialog.CustomContent>
    </Dialog>
  );
};

export default AccessDialog;
