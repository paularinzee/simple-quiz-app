import React from 'react';

class ClassComponent extends React.Component {
    render() {
        return (
            <div>
                <p>Hello from class</p>
            </div>
        );
    }
}

const FunctionalComponent = (props) =>{
    return(
        <p>Hello {props.name}</p>
    );
};

export { FunctionalComponent, ClassComponent };