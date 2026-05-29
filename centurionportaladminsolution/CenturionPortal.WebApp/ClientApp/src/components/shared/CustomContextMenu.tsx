import * as React from 'react';
import { Popup } from '@progress/kendo-react-popup';
import { Menu, MenuItem } from '@progress/kendo-react-layout';

interface ICustomContextMenuProps {
    offset: any;
    isOpen: boolean;
    options: string[];
    onClose: Function
    onSelect: Function;
}

class CustomContextMenu extends React.PureComponent<ICustomContextMenuProps> {
    blurTimeoutRef:any;
    menuWrapperRef:any;

    public render() {
        return (
            <Popup
                offset={this.props.offset}
                show={this.props.isOpen}
                open={this.onPopupOpen}
                popupClass={'popup-content'}
            >
                <div
                    onFocus={this.onFocusHandler}
                    onBlur={this.onBlurHandler}
                    tabIndex={-1}
                    ref={el => (this.menuWrapperRef = el)}
                >
                    <Menu vertical={true} style={{ display: 'inline-block' }} onSelect={(event: any) => this.props.onSelect(event)}>
                        {
                            this.props.options.map(
                                (option: string, index: number) => <MenuItem key={index} text={option} />
                            )
                        }
                    </Menu>
                </div>
            </Popup>
        );
    }

    private onPopupOpen = () => {
        this.menuWrapperRef.querySelector('[tabindex]').focus();
    };

    private onFocusHandler = () => {
        clearTimeout(this.blurTimeoutRef);
        this.blurTimeoutRef = undefined;
    };

    private onBlurTimeout = () => {
        this.props.onClose();
        this.blurTimeoutRef = undefined;
    };

    private onBlurHandler = (event: any) => {
        clearTimeout(this.blurTimeoutRef);
        this.blurTimeoutRef = setTimeout(this.onBlurTimeout);
    };
}

export default CustomContextMenu;
