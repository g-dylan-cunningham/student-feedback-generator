import React, { Fragment } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  Button,
} from '@mui/material';


// prevents console error when mui tooltip comp gets a disabled child
const TooltipSpan = ({
  title,
  disabled,
  children,
}) => (
  <Fragment>
    {
      !disabled ? (
        <Tooltip title={title}>
          {children}
        </Tooltip>
      ) : (
        <span>{children}</span>
      )

    }
  </Fragment>
);

export default TooltipSpan;
