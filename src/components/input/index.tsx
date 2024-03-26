import ValidationError from "components/validation/error";
import React, { ForwardedRef, forwardRef } from "react";
import { Input } from "react-daisyui";
import {
  ComponentColor,
  ComponentSize,
  IComponentBaseProps,
} from "react-daisyui/dist/types";
import { FieldError } from "react-hook-form/dist/types";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> &
  IComponentBaseProps & {
    bordered?: boolean;
    borderOffset?: boolean;
    size?: ComponentSize;
    color?: ComponentColor;
    error?: FieldError;
  };

const CInputInner = (
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className="w-full">
      <Input
        {...props}
        ref={ref}
        className={`w-full ${props?.error ? "!border-red-400" : ""}`}
      />
      <ValidationError error={props?.error} />
    </div>
  );
};

const CInput = forwardRef(CInputInner) as (
  props: InputProps & { ref?: ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof CInputInner>;

export default CInput;
