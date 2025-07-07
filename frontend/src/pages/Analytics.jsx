import React from 'react';
import Sidebar from '../components/Sidebar';

const Analytics = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Analytics</h1>
                    <p style={{ fontSize: '1.5rem', color: '#888' }}>New feature Coming Soon 🚧</p>
                </div>
            </main>
        </div>
    );
};

export default Analytics;