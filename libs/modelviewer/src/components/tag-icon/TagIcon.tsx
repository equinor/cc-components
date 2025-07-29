import { ReactElement } from 'react';
import styled from 'styled-components';

interface TagIconProps {
  icon?: ReactElement;
  legendColor: string;
}
/**
 * Component that will wrap the provided icon with a background color (usually the legend color)
 *
 * @param {TagIconProps} {
 *  icon: Icon to be wrapped
 *  legendColor: background color to apply. Need to be valid css color
 * }
 * @return {*}  {ReactElement} Wrapped icon with provided color
 */
export const TagIcon: React.FC<TagIconProps> = ({
  icon,
  legendColor,
}: TagIconProps): ReactElement => {
  return <Icon style={{ background: legendColor }}>{icon}</Icon>;
};

export default TagIcon;

const Icon = styled.div`
  position: relative;
  width: 46px;
  height: 46px;
  border: 3px solid #ffffff;
  border-radius: 10rem;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;
