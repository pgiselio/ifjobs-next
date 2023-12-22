import React from 'react';
import styled from './styles.module.scss';

export function Box({ children, ...props } : React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={styled.box + " "+ (props.className ? props.className : "")} >
            {children}
        </div>
    );
}

export function BoxTitle({ children, ...props } : React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={styled['box-title'] + " "+ (props.className ? props.className : "")} >
            {children}
        </div>
    );
}

export function BoxContent({ children, ...props } : React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={styled['box-content'] + " "+ (props.className ? props.className : "")} >
            {children}
        </div>
    );
}

export function BoxMessage({ children, ...props } : React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={styled['box-message']+ " "+ (props.className ? props.className : "")} >
            {children}
        </div>
    );
}
