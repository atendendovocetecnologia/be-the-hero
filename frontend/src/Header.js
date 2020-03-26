import React from 'react';

//function Header(props) {
function Header({children}) {
    // props.children

    return (
        <header>
            <h1>{children}</h1>
        </header>
    );
}

export default Header;