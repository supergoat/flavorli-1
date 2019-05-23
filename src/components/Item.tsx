import React, {Fragment, useState} from 'react';
import {RouteComponentProps} from '@reach/router';
import styled, {css} from 'styled-components/macro';
import Button from '../ui/Button';
import Select from '../ui/Select';

import Modal from '../templates/ModalPage';
import Dietary from '../components/Dietary';

interface Props extends RouteComponentProps {
  item: any;
  restaurantId: string;
  restaurantName: string;
  addToOrder: any;
  onCancel: () => void;
}
const Item = ({
  item,
  restaurantName,
  restaurantId,
  addToOrder,
  onCancel,
}: Props) => {
  const [price, setPrice] = useState(Number(item.price));
  const [qty, setQty] = useState(1);
  const [options, setOptions] = useState<any[]>([]);
  const [optionItemIds, setOptionItemIds] = useState<string[]>([]);

  const addOptionItemId = (optionItem: any) => {
    setOptionItemIds([...optionItemIds, optionItem.id]);
  };

  const removeOptionItemId = (optionItem: any) => {
    setOptionItemIds(
      optionItemIds.filter((id: string) => id !== optionItem.id),
    );
  };

  const addOption = (option: any, optionItem: any) => {
    setOptions([
      ...options,
      {
        name: option.name,
        items: [{name: optionItem.name, price: optionItem.price}],
      },
    ]);

    addOptionItemId(optionItem);
    setPrice(Number(price) + Number(optionItem.price));
  };

  const addOptionItem = (optionIndex: number, optionItem: any) => {
    const copyOptions = [...options];
    copyOptions[optionIndex].items.push({
      name: optionItem.name,
      price: optionItem.price,
    });

    addOptionItemId(optionItem);
    setPrice(Number(price) + Number(optionItem.price));
    setOptions(copyOptions);
  };

  const removeOptionItem = (
    optionIndex: number,
    optionItemIndex: number,
    optionItem: any,
  ) => {
    const copyOptions = [...options];
    const optionItems = copyOptions[optionIndex].items;

    optionItems.splice(optionItemIndex, 1);

    if (optionItems.length === 0) removeOption(copyOptions, optionIndex);

    removeOptionItemId(optionItem);
    setPrice(Number(price) - Number(optionItem.price));
    setOptions(copyOptions);
  };

  const removeOption = (options: any, optionIndex: number) =>
    options.splice(optionIndex, 1);

  const onSelectOptionItem = (option: any, optionItem: any) => {
    const hasOneSelection = option.min === '1' && option.max === '1';
    const optionIndex = options.findIndex((o: any) => o.name === option.name);
    const isOptionSelected = optionIndex !== -1;

    if (hasOneSelection) {
      const newPrice = isOptionSelected
        ? Number(price) +
          Number(optionItem.price) -
          Number(options[optionIndex].items[0].price)
        : Number(price) + Number(optionItem.price);

      setPrice(newPrice);

      setOptions([
        {
          name: option.name,
          items: [{name: optionItem.name, price: optionItem.price}],
        },
      ]);
      setOptionItemIds([optionItem.id]);

      return;
    }

    if (!isOptionSelected) addOption(option, optionItem);

    if (isOptionSelected) {
      const optionItemIndex = options[optionIndex].items.findIndex(
        (i: any) => i.name === optionItem.name,
      );
      const isOptionItemSelected = optionItemIndex !== -1;

      isOptionItemSelected
        ? removeOptionItem(optionIndex, optionItemIndex, optionItem)
        : addOptionItem(optionIndex, optionItem);
    }
  };

  const handleAddToOrder = async () => {
    await addToOrder({
      variables: {
        restaurantId,
        restaurantName,
        orderItem: {
          name: item.name,
          price: (price * qty).toFixed(2),
          options,
          quantity: qty,
        },
      },
    });
  };

  return (
    <Modal>
      <ItemWrapper>
        {item.image && <Image src={item.image} alt={item.name} />}

        <Name>{item.name}</Name>
        <Dietary dietary={item.dietary} />
        <Description>{item.description}</Description>

        {item.options.map((option: any) => (
          <Fragment key={option.id}>
            <OptionName>{option.name}</OptionName>

            <OptionItems>
              {option.items.map((item: any) => (
                <Select
                  key={item.id}
                  onChange={() => onSelectOptionItem(option, item)}
                  checked={optionItemIds.includes(item.id)}
                  name={option.name}
                  type={
                    option.min === '1' && option.max === '1'
                      ? 'radio'
                      : 'checkbox'
                  }
                >
                  <div>
                    <OptionItemName>{item.name}</OptionItemName>
                    <Price>£{item.price}</Price>
                  </div>
                </Select>
              ))}
            </OptionItems>
          </Fragment>
        ))}

        <SelectQuantityWrapper>
          <QtyBtn onClick={() => setQty(q => q - 1)} disabled={qty <= 1}>
            -
          </QtyBtn>

          <p>{qty}</p>

          <QtyBtn onClick={() => setQty(q => q + 1)}>+</QtyBtn>
        </SelectQuantityWrapper>

        <AddToOrderWrapper>
          <CancelButton
            secondary
            onClick={onCancel}
            aria-label="Back to restaurant view"
          />

          <ConfirmButton onClick={handleAddToOrder}>
            Add for £{(price * qty).toFixed(2)}
          </ConfirmButton>
        </AddToOrderWrapper>
      </ItemWrapper>
    </Modal>
  );
};

/*  Export
============================================================================= */
export default Item;

/* Styled Components
============================================================================= */
const ItemWrapper = styled.div`
  background: var(--white);
  height: auto;
  padding: 15px;
  width: 95%;
  max-width: 450px;
  border-radius: 3px;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
`;

const Name = styled.h1`
  font-size: 25px;
  color: var(--oxfordBlue);
  font-weight: 300;
  text-transform: capitalize;
`;

const Description = styled.p`
  font-size: 18px;
  color: var(--osloGrey);
  font-weight: 300;
`;

const AddToOrderWrapper = styled.div`
  display: flex;
`;

const CancelButton = styled(Button)`
  flex: 0.3;
  margin-right: 15px;
  &:before {
    content: 'Cancel';
  }
`;

const ConfirmButton = styled(Button)`
  flex: 0.7;
`;

const OptionName = styled.h4`
  margin-top: 15px;
`;

const OptionItemName = styled.p`
  font-weight: 300;
`;

const Price = styled.p`
  margin-top: 5px;
`;

const OptionItems = styled.div`
  margin-top: 15px;
`;

const SelectQuantityWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  p {
    font-size: 25px;
    text-align: center;
    width: 70px;
  }
`;

const QtyBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 1px solid var(--oxfordBlue);
  font-size: 17px;
  color: var(--oxfordBlue);
  background: var(--white)
  touch-action: manipulation;
  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};
`;
