import React from 'react';
import './ListView.css'

const ListView = ({ avatarSrc, title, description, number }) => {
    return (
        <div className="custom-card">
            <div className="avatar">
                <img src={avatarSrc} alt="Avatar" />
            </div>
            <div className="card-content">
                <p className='title'>{title}</p>
                <p className='description'>{description}</p>
            </div>
            <div className="number-circle">
                <span>{number}</span>
            </div>
        </div>
    );
};

export default ListView;
