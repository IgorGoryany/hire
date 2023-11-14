import styled from 'styled-components';
import { FC, ReactNode } from 'react';
import { Button, KeyCode, KeyMod, useKeyboard } from '@taskany/bricks';

import { KeyboardSubmitHint } from './KeyboardSubmitHint/KeyboardSubmitHint';

const OuterContainer = styled.div`
    max-width: 80vw;
`;

const InnerContainer = styled.div`
    opacity: 0.8;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-sizing: border-box;
    border-radius: 6px;
    padding: 6px 12px;
    margin-bottom: 30px;
    width: 570px;
`;

const BottomContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const StyledButton = styled(Button)`
    display: inline-block;
    float: right;
    margin-left: 8px;
    margin-top: 8px;
`;

export interface FormContainerProps {
    submitButtonText: string;
    onSubmitButton: () => void;
    submitButtonDisabled?: boolean;
    onDeleteButton?: () => void;
    deleteButtonText?: string;
    notToShowHint?: boolean;
    children?: ReactNode;
    onCancelButton?: () => void;
    cancelButtonText?: string;
}

export const FormContainer: FC<FormContainerProps> = (props) => {
    const {
        children,
        onSubmitButton,
        submitButtonDisabled,
        submitButtonText,
        onDeleteButton,
        deleteButtonText,
        notToShowHint,
        cancelButtonText,
        onCancelButton,
    } = props;

    const [keyboard] = useKeyboard([KeyCode.Enter, KeyMod.CtrlCmd], () => onSubmitButton(), {
        disableGlobalEvent: false,
        capture: true,
    });

    return (
        <OuterContainer {...keyboard}>
            <InnerContainer>{children}</InnerContainer>
            <BottomContainer>
                {!notToShowHint && <KeyboardSubmitHint actionTitle={submitButtonText} />}
                <ButtonContainer>
                    <StyledButton
                        type="submit"
                        view="primary"
                        outline
                        onClick={onSubmitButton}
                        disabled={submitButtonDisabled}
                        text={submitButtonText}
                    />
                    {cancelButtonText && (
                        <StyledButton type="button" onClick={onCancelButton} text={cancelButtonText} />
                    )}
                    {deleteButtonText && (
                        <StyledButton view="danger" onClick={onDeleteButton} text={deleteButtonText} />
                    )}
                </ButtonContainer>
            </BottomContainer>
        </OuterContainer>
    );
};