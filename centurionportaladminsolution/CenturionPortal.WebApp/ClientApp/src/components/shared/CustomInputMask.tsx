import * as React from 'react';
import InputMask from 'react-input-mask';

interface ICustomInputMaskProps {
    mask: string;
    id?: string;
    name?: string;
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: Function;
}

class CustomInputMask extends React.PureComponent<ICustomInputMaskProps> {
    public render() {
        return (
            <InputMask
                type="text"
                mask={this.props.mask}
                id={this.props.id}
                name={this.props.name}
                className={this.props.className}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.onChange}
            />
        );
    }

    private onChange = (event: any) => {
        if (this.props.onChange)
            this.props.onChange(event);
    }
}

export default CustomInputMask;