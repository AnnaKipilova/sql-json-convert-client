// https://codesandbox.io/embed/ecstatic-waterfall-e87xz

import React from "react";
import PropTypes from "prop-types";
import { default as ReactSelect } from "react-select";
import { useTranslation } from 'react-i18next';

const MySelect = props => {

    const { t, i18n } = useTranslation();

    MySelect.propTypes = {
        options: PropTypes.array,
        value: PropTypes.any,
        onChange: PropTypes.func,
        allowSelectAll: PropTypes.bool,
        allOption: PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
      };
      
      MySelect.defaultProps = {
        allOption: {
          label: t('dropdownMultiSelectSelectAll'),
          value: "*"
        }
      };

  if (props.allowSelectAll) {
    return (
      <ReactSelect
        {...props}
        options={[props.allOption, ...props.options]}
        onChange={(selected, event) => {
          if (selected !== null && selected.length > 0) {
            if (selected[selected.length - 1].value === props.allOption.value) {
              return props.onChange([props.allOption, ...props.options]);
            }
            let result = [];
            if (selected.length === props.options.length) {
              if (selected.includes(props.allOption)) {
                result = selected.filter(
                  option => option.value !== props.allOption.value
                );
              } else if (event.action === "select-option") {
                result = [props.allOption, ...props.options];
              }
              return props.onChange(result);
            }
          }

          return props.onChange(selected);
        }}
      />
    );
  }

  return <ReactSelect {...props} disabled={true} />;
};



export default MySelect;
