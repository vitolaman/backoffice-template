import { optionsWAvatar } from "_interfaces/article.interfaces";
import ReactSelect, {
  InputActionMeta,
  MultiValue,
  components,
} from "react-select";

interface Option {
  key: number;
  label: string;
  value: string;
}

interface Props {
  options: MultiValue<optionsWAvatar>;
  value?: MultiValue<optionsWAvatar>;
  disabled?: boolean;
  onChange: (e: MultiValue<optionsWAvatar>) => void;
  onInputChange: (newValue: string, actionMeta: InputActionMeta) => void;
  rounded?: boolean;
  isLoading: boolean;
}

const MultiSelectWithImage = ({
  options,
  value,
  disabled = false,
  onChange,
  rounded = false,
  onInputChange,
  isLoading,
}: Props) => {
  return (
    <ReactSelect
      styles={{
        control: (baseStyle) => ({
          ...baseStyle,
          padding: 5,
          borderColor: "#BDBDBD",
          borderRadius: "0.5rem",
        }),
      }}
      isMulti
      isSearchable={true}
      options={options}
      onInputChange={onInputChange}
      isLoading={isLoading}
      value={value}
      onChange={onChange}
      components={{
        Option: (props) => (
          <components.Option {...props}>
            <div className="flex flex-row gap-2 items-center">
              <img
                className="w-8 h-8 rounded-full"
                src={props.data.avatar}
                alt={props.data.label}
              />
              <div>{props.data.label}</div>
            </div>
          </components.Option>
        ),
        MultiValue: (props) => (
          <components.MultiValue {...props}>
            <div className="flex flex-row gap-2 items-center">
              <img
                className="w-6 h-6 rounded-full"
                src={props.data.avatar}
                alt={props.data.label}
              />
              <div className="text-xs">{props.data.label}</div>
            </div>
          </components.MultiValue>
        ),
      }}
    />
  );
};

export default MultiSelectWithImage;
