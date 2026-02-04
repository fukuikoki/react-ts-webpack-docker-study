import React from 'react';

type Props = { name: string; times?: number };

const Greets: React.FunctionComponent<React.PropsWithChildren<Props>> = (props) => {
    const { name, times = 1, children } = props;

    return (
        <>
            {[...Array(times)].map((_, idx) => (
                <p key={idx}>Hello, {name}! {children}</p>
            ))}
        </>
    );
};

export default Greets;