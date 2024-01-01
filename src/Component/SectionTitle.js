import React from 'react';

const SectionTitle = ({ subHeading, heading }) => {
    return (
        <div className='text-center md:w-4/12 mx-auto my-8'>

            <h3 className='text-2xl uppercase border-y-4 py-4'>{heading}</h3>
            <p className='text-yellow-600 mb-2'>---{subHeading}---</p>
        </div>
    );
};

export default SectionTitle;