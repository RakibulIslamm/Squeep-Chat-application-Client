import React from 'react';
import ContentLoader from 'react-content-loader';

const ProfilePhotoLoader = () => {
    return (
        <ContentLoader
            height={140}
            width={600}
            viewBox="0 0 600 140"
            backgroundColor="#4c5f86"
            foregroundColor="#657eb1"
        >
            <circle cx="80" cy="70" r="50" />
            <rect x="150" y="70" rx="3" ry="3" width="70" height="15" />
            <rect x="150" y="50" rx="3" ry="3" width="300" height="15" />

        </ContentLoader>
    );
};

export default ProfilePhotoLoader;