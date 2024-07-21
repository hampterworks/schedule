"use client"
import React from "react";
import Button from "./components/Button";
import styled from "styled-components";
import CancelRoundedIcon from "./icons/CancelRoundedIcon";
import AddCircleRoundedIcon from "./icons/AddCircleRoundedIcon";

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
`
/**
 * Represents the props for the ButtonWrapper component.
 *
 * @template T - The type of the template
 *
 * @property {Function} removeItemFunction - The function to remove an item from the list.
 * @property {Function} addItemFunction - The function to add an item to the list.
 * @property {T} template - The template for the item.
 * @property {number} index - The index of the item.
 * @property {boolean} [hideAdd] - Flag to indicate whether the add button should be hidden. Defaults to false.
 * @property {boolean} [hideRemove] - Flag to indicate whether the remove button should be hidden. Defaults to false.
 */
type ButtonWrapperProps<T> = {
  removeItemFunction: (index: number) => void
  addItemFunction: (index: number, template: T) => void
  template: T
  index: number
  hideAdd?: boolean
  hideRemove?: boolean
}

/**
 * Renders a button wrapper component that can show add and remove buttons.
 *
 * @param {number} index - The index of the item associated with the button wrapper.
 * @param {ReactNode} template - The template ReactNode to be used for adding new items.
 * @param {Function} removeItemFunction - The function to be called when the remove button is clicked.
 * @param {Function} addItemFunction - The function to be called when the add button is clicked.
 * @param {boolean} [hideAdd] - Specifies whether the add button should be hidden. Defaults to false.
 * @param {boolean} [hideRemove] - Specifies whether the remove button should be hidden. Defaults to false.
 * @returns {ReactNode} - The rendered ButtonWrapper ReactNode.
 * @constructor
 */
function ButtonWrapper<T>
({
   index,
   template,
   removeItemFunction,
   addItemFunction,
   hideAdd,
   hideRemove
 }: ButtonWrapperProps<T>) {
  return <ButtonContainer>
    {
      hideRemove !== true &&
      <Button
        onClick={() => removeItemFunction(index)}
        aria-label="remove"
        icon={<CancelRoundedIcon/>}
        iconButton
      />
    }
    {
      hideAdd !== true &&
      <Button
        onClick={() => addItemFunction(index, template)}
        aria-label="add"
        icon={<AddCircleRoundedIcon/>}
        iconButton
      />
    }
  </ButtonContainer>
}

export default ButtonWrapper
