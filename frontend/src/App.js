import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import './App.css';
import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        // projects.push(`Novo projeto ${Date.now()}`);
        
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'André Lusegardis'
        });

        const project = response.data;

        setProjects([... projects, project]);
    }

    return (
        <>
        <Header title="Projects" />

        <ul>
            {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </ul>

        <button type="button" onClick={handleAddProject}>Add project</button>
        </>
    );
}