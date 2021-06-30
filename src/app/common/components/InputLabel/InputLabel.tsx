import React from 'react';
import styled from 'styled-components';
import Tooltip from '~app/common/components/Tooltip/Tooltip';

const InputLabelWrapper = styled.div`
  font-size: 14px;
`;

const InputHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Header = styled.p`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: bold;
  white-space: nowrap;
  display: inline-flex;
  font-size: 12px;
  color: #A1ACBE;
  margin: 0;
  text-transform: uppercase;
`;
const SubHeader = styled.p`
  margin: 0 0 0 5px;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: bold;
  white-space: nowrap;
  text-transform: none;
  display: inline-flex;
  font-size: 12px;
  color: #AAAAAA;
`;

type InputLabelProps = {
  children: any,
  title?: string,
  subTitle?: string,
  withHint?: boolean,
  toolTipText?: string,
  toolTipLink?: string
};

const InputLabel = ({ children, title, subTitle, withHint, toolTipText, toolTipLink }: InputLabelProps) => {
  return (
    <InputLabelWrapper>
      <InputHeader>
        <Header>{title}</Header>
        <SubHeader>{subTitle}</SubHeader>
        {withHint && <Tooltip text={toolTipText} link={toolTipLink} />}
      </InputHeader>
      {children}
    </InputLabelWrapper>
  );
};

export default InputLabel;
