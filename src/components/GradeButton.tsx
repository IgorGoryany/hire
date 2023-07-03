import styled from 'styled-components';

type GradeButtonProps = {
    onClick?: (e: React.MouseEvent) => void;
    matching?: boolean;
    selected?: boolean;
};

export const GradeButton = styled.button<GradeButtonProps>`
    all: unset;
    height: 30px;
    width: max-content;
    min-width: 30px;
    border: 1px solid;
    padding: 5px 3px 3px;
    border-color: ${(props) => (props.matching ? '#F162D5' : 'rgba(255, 255, 255, 0.4)')};
    box-sizing: border-box;
    border-radius: 6px;
    font-weight: bold;
    font-size: 16;
    color: ${(props) => (props.matching ? '#F162D5' : 'rgba(255, 255, 255, 0.54)')};
    text-align: center;
    cursor: ${(props) => (props.onClick ? 'pointer' : 'unset')};
    transform: ${(props) => (props.selected ? 'scale(1.1)' : 'scale(1)')};

    ${({ onClick }) =>
        onClick &&
        `
        :hover, :focus  {
        border: 1px solid #f162d5;
        backgroundcolor: rgba(241, 98, 213, 0.2);
        color: #f162d5;
        }
    `}
`;