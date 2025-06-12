import React from 'react';
import styled from './styles.module.scss';

export function Box({ children, ...props } : Readonly<React.HTMLAttributes<HTMLDivElement>>) {
    return (
        <div {...props} className={styled.box + " "+ (props.className ?? "")} >
            {children}
        </div>
    );
}

export function BoxTitle({ children, ...props } : Readonly<React.HTMLAttributes<HTMLDivElement>>) {
    return (
        <div {...props} className={styled['box-title'] + " "+ (props.className ?? "")} >
            {children}
        </div>
    );
}

export function BoxContent({ children, ...props } : Readonly<React.HTMLAttributes<HTMLDivElement>>) {
    return (
        <div {...props} className={styled['box-content'] + " "+ (props.className ?? "")} >
            {children}
        </div>
    );
}

export function BoxMessage({ children, ...props } : Readonly<React.HTMLAttributes<HTMLDivElement>>) {
    return (
        <div {...props} className={styled['box-message']+ " "+ (props.className ?? "")} >
            {children}
        </div>
    );
}
