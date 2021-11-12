import { Button } from '@chakra-ui/button';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

interface CreateCalendarEventFABProps {
  onClick: () => void;
}

const CreateCalendarEventFAB: React.FC<CreateCalendarEventFABProps> = ({
  onClick,
}) => {
  return (
    <>
      <Button
        position="fixed"
        bottom="1rem"
        right="1rem"
        variant="outline"
        colorScheme="blue"
        opacity="0.3"
        _hover={{ opacity: '1' }}
        onClick={onClick}
      >
        <FaPlus />
      </Button>
    </>
  );
};

export default CreateCalendarEventFAB;
