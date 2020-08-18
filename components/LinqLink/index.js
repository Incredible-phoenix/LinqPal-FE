
import React from 'react';
import Link from 'next/link';
import { Link as MaterialUILink } from '@material-ui/core';

const MaterialUILinkComponent = React.forwardRef(({ className, href, as, children }, ref) => (
  <Link href={href} as={as} ref={ref} prefetch={false} >
    {href != null ?
      < a className={className}>
        {children}
      </a> :
      { children }
    }
  </Link >
));

const LinqLink = props => (
  <MaterialUILink component={MaterialUILinkComponent} {...props} />
);

export default LinqLink;
