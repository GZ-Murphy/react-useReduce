import {cloneElement} from'react';

export const ContextProviderComposer = ({contextProviders, children}) => {
    return contextProviders.reduceRight((children, parent) => cloneElement(parent, { children }), children);
};
  
