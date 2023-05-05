import React, { useState } from 'react';

import useModal from '@hooks/useModal';
import { Sort, CheckBox, CheckBoxChecked } from '@components/icon';
import { useStoreDispatch } from '@store/animationStore';

import {
  DSModal,
  DSButton,
  DSContainer,
  DSTitle,
  DSOptions,
  DSOption
} from './SortAnimationsStyle';

const TEXT = {
  sort: 'مرتب سازی',
  sortBy: 'مرتب سازی بر اساس',
  rate: 'بیشترین امتیاز',
  view: 'بیشترین بازدید',
  newest: 'جدید ترین'
};

const sortOptions = ['newest', 'rate', 'view'];

export default function SortAnimations() {
  const { openModal, closeModal, isOpen, Modal } = useModal();
  const dispatch = useStoreDispatch();
  const [selected, setSelected] = useState(sortOptions[0]);

  const selectOptions = (option) => {
    setSelected(option);
    dispatch({ type: 'set-sortby', payload: option });
    closeModal();
  };

  return (
    <>
      <DSButton onClick={openModal}>
        <Sort /> {TEXT.sort}
      </DSButton>
      {isOpen && (
        <Modal>
          <DSModal>
            <DSContainer>
              <DSTitle>{TEXT.sortBy}</DSTitle>
              <DSOptions>
                {sortOptions.map((option, key) => (
                  <DSOption key={key} onClick={() => selectOptions(option)}>
                    {selected === option ? <CheckBoxChecked /> : <CheckBox />} {TEXT[option]}
                  </DSOption>
                ))}
              </DSOptions>
            </DSContainer>
          </DSModal>
        </Modal>
      )}
    </>
  );
}
