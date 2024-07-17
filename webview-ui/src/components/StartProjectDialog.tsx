import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button, Input } from '@fluentui/react-components';
import { DrawImageRegular, TextAddRegular, Camera24Regular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { vscode } from '../utilities/vscode';
import path from 'path';
import * as fs from 'fs';

const projectDir = path.join(vscode.getState()?.workspace?.uri.fsPath, "projects");

const createNewProject = (projectName: string, template: string) => {
    const projectPath = path.join(projectDir, projectName);
    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
        const emptyJsonPath = path.join(projectPath, "empty.json");
        const initialJson = getInitialJson(template); // function to get the initial JSON based on template
        fs.writeFileSync(emptyJsonPath, JSON.stringify(initialJson, null, 2));
        vscode.window.showInformationMessage(`Project ${projectName} created successfully!`);
    } else {
        vscode.window.showErrorMessage(`Project ${projectName} already exists!`);
    }
};

const getInitialJson = (template: string) => {
    switch (template) {
        case 'scratch':
            return {
                "ROOT": {
                    "type": { "resolvedName": "Container" },
                    "isCanvas": true,
                    "props": { "id": "root" },
                    "displayName": "Container",
                    "custom": {},
                    "hidden": false,
                    "nodes": [],
                    "linkedNodes": {}
                }
            };
        // Add other templates here if needed
        default:
            return {
                "ROOT": {
                    "type": { "resolvedName": "Container" },
                    "isCanvas": true,
                    "props": { "id": "root" },
                    "displayName": "Container",
                    "custom": {},
                    "hidden": false,
                    "nodes": [],
                    "linkedNodes": {}
                }
            };
    }
};

export const StartProjectDialog: React.FC = () => {
    const [projectName, setProjectName] = useState("");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(event.target.value);
    };

    const handleCreateProject = (template: string) => {
        createNewProject(projectName, template);
        vscode.commands.executeCommand('extension.openProject', projectName);
        navigate("/editing-interface", { state: { projectName } }); 
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
            <DialogTrigger disableButtonEnhancement>
                <Button appearance='subtle'>+ Start New Project</Button>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>New Project</DialogTitle>
                    <DialogContent>
                        <Input 
                            placeholder="Enter project name" 
                            value={projectName} 
                            onChange={handleProjectNameChange} 
                        />
                        Choose how you would like to begin your project
                    </DialogContent>
                    <DialogActions fluid>
                        <Button 
                            onClick={() => handleCreateProject('scratch')} 
                            appearance="secondary" 
                            icon={<DrawImageRegular />}
                        >
                            Scratch
                        </Button>
                        <Button 
                            onClick={() => handleCreateProject('prompt')} 
                            appearance="secondary" 
                            icon={<TextAddRegular />}
                        >
                            Prompt
                        </Button>
                        <Button 
                            onClick={() => handleCreateProject('sketch')} 
                            appearance="secondary" 
                            icon={<Camera24Regular />}
                        >
                            Sketch
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
