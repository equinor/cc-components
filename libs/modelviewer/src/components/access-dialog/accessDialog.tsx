import { Button, Dialog } from '@equinor/eds-core-react';
import React, { useState } from 'react';

interface AccessDialogProps {
  plantName: string;
}

const AccessDialog: React.FC<AccessDialogProps> = ({ plantName }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen}>
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
      <Dialog.Actions>
        <Button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Ok
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default AccessDialog;
