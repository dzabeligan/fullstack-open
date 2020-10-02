import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Gender } from '../types';

const PatientIcon: React.FC<{ gender: Gender }> = ({ gender }) => {
  switch (gender) {
    case 'male':
      return <Icon man />;
    case 'female':
      return <Icon woman />;
    default:
      return <Icon other gender />;
  }
};

export default PatientIcon;
