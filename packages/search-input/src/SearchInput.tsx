import { forwardRef, useEffect, useRef } from 'react';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useSearchFieldState } from '@react-stately/searchfield';
import { useSearchField } from '@react-aria/searchfield';
import {
  useCombinedRefs,
  castNullableStringValue,
  WithNullableValue,
} from '@jenga-ui/utils';
import { JengaTextInputBaseProps, TextInputBase } from '@jenga-ui/text-input';
import { useProviderProps } from '@jenga-ui/providers';
import { Button, ariaToJengaButtonProps } from '@jenga-ui/button';

export interface JengaSearchInputProps extends JengaTextInputBaseProps {
  /** Whether the search input is clearable using ESC keyboard button or clear button inside the input */
  isClearable?: boolean;
}

export const SearchInput = forwardRef(
  (props: WithNullableValue<JengaSearchInputProps>, ref) => {
    props = castNullableStringValue(props);
    props = useProviderProps(props);

    let { isClearable, value } = props;

    const localRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, localRef);
    let inputRef = useRef(null);

    useEffect(() => {
      const el = combinedRef && combinedRef.current;

      if (el && value != null && el.value !== value) {
        el.value = value;
      }
    }, [combinedRef, value]);

    let state = useSearchFieldState(props);
    let { inputProps, clearButtonProps } = useSearchField(
      props,
      state,
      inputRef,
    );

    return (
      <TextInputBase
        inputProps={inputProps}
        ref={ref}
        inputRef={inputRef}
        inputStyles={{ paddingRight: '4x' }}
        type="search"
        prefix={<SearchOutlined />}
        suffixPosition="after"
        suffix={
          isClearable &&
          state.value !== '' &&
          !props.isReadOnly && (
            <Button
              type="clear"
              {...ariaToJengaButtonProps(clearButtonProps)}
              color={{
                '': '#dark.50',
                'hovered | pressed': '#purple-text',
              }}
              radius="right (1r - 1bw)"
              padding=".5x 1x"
              placeSelf="stretch"
              icon={<CloseOutlined />}
            />
          )
        }
        {...props}
      />
    );
  },
);
