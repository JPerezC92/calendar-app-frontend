import { Button } from '@chakra-ui/button';
import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface DeleteCalendarEventFabProps {
  onClick: () => void;
}

const DeleteCalendarEventFab: React.FC<DeleteCalendarEventFabProps> = ({
  onClick,
}) => {
  return (
    <>
      <>
        <Button
          position="fixed"
          bottom="1rem"
          left="1rem"
          colorScheme="red"
          onClick={onClick}
          leftIcon={<FaTrash />}
        >
          Borrar evento
        </Button>
      </>
    </>
  );
};

export default DeleteCalendarEventFab;
