
import React from 'react';

const CustomCard = (props) => {
    let subComponentList = Object.keys(CustomCard);

    let subComponents = subComponentList.map((key) => {
        return React.Children.map(props.children, (child) =>
            child.type.name === key ? child : null
        );
    });
    if(props.show === true){
        return (
            <>
                <div className='card mx-auto' style={{width: "50rem"}}>
                    {subComponents.map((component) => component)}
                </div>
            </>
        );
    }
    else{
        return false;
    }
    
    
};

const Header = (props) => <div className='card-header'>{props.children}</div>;
CustomCard.Header = Header;

const Body = (props) => <div className='card-body'>{props.children}</div>;
CustomCard.Body = Body;

const Footer = (props) => <div className='card-footer'>{props.children}</div>;
CustomCard.Footer = Footer;

export default CustomCard;
