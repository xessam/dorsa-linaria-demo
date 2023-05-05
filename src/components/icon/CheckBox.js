import React from 'react';
import Image from 'next/image';
import CheckBox from '/public/icons/checkBox.svg';

export default function CheckBoxIcon() {
  return <Image src={CheckBox} alt="checkbox"/>;
}
