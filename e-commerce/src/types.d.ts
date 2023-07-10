import { NavLinkProps as ReactRouterNavLinkProps } from 'react-router-dom';

declare module 'react-router-dom' {
  interface NavLinkProps extends ReactRouterNavLinkProps {
    activeClassName?: string;
    exact?: boolean;
  }
}
