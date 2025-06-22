import { forwardRef, useEffect, useRef } from "react";
import IMask from "imask";
import {Input} from "./ui"
const TimeInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const mask = IMask(inputRef.current, {
        mask: "HH:MM",
        blocks: {
          HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23,
            placeholderChar: "_",
          },
          MM: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
            placeholderChar: "_",
          },
        },
      });

      return () => mask.destroy();
    }
  }, []);

  return (
    <Input
      ref={(el) => {
        inputRef.current = el;
        if (typeof ref === "function") {
          ref(el);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
        }
      }}
      {...props}
      type="text"
      placeholder="__:__"
      className={props.className}
    />
  );
});

TimeInput.displayName = "TimeInput";

export { TimeInput };
