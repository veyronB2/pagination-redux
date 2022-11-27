import React from "react";
import { STButton } from "./styled-components/styledButton";

type ButtonProps = {
  btnText: string;
  disabled: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({ btnText, disabled, onClick }: ButtonProps) {
  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
  }

  return (
    <STButton disabled={disabled} onClick={clickHandler}>
      {btnText}
    </STButton>
  );
}

export default React.memo(Button);
