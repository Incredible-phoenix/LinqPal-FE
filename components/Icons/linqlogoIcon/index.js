
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(theme => ({
    root: {
        width: 86,
        height: 100,
        color: theme.palette.text.primary
    }
}));

const linqlogoIcon = ({ className, viewBox, color, ...rest }) => {
    const classes = useStyles();
    return (
        <SvgIcon viewBox={viewBox || "0 0 86 100"} {...rest} className={clsx(classes.root, className)}>
         
        </SvgIcon >
    )
};

export default linqlogoIcon;