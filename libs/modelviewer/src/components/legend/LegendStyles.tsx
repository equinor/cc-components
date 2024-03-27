import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

export const Style = {
  Overlay: styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    background: rgba(0, 0, 0, 0.65);
    top: 1rem;
    left: 1rem;
    min-width: 200px;
    border-radius: 4px;
    overflow: hidden;
  `,

  Header: styled.button`
    display: flex;
    flex-direction: row;
    color: ${tokens.colors.text.static_icons__primary_white.hex};
    padding: 0.5rem;
    justify-content: space-between;
    background: none;
    border: none;
    border-radius: 4px;
    width: 100%;
    align-items: center;
    cursor: pointer;
    height: 2rem;
    :hover {
      background: rgba(0, 0, 0, 0.8);
    }
  `,

  MissingWrapper: styled.div`
    border-width: 1px;
    border-color: #e2e2e2;
    border-top-style: solid;
  `,

  Item: styled.button`
    display: flex;
    color: ${tokens.colors.text.static_icons__primary_white.hex};
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    align-items: center;
    background: none;
    border: none;
    width: 100%;
    cursor: pointer;
    height: 2rem;
    padding: 0.5rem;
    :hover {
      background: rgba(0, 0, 0, 0.8);
    }
  `,

  Label: styled.span`
    display: flex;
    flex-direction: row;
  `,

  ColorIcon: styled.span<{ color: string }>`
    background: ${({ color }) => color};
    height: 1rem;
    width: 1rem;
    display: block;
    border-radius: 500%;
    margin-right: 0.5rem;
  `,
};
